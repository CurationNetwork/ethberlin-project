pragma solidity ^0.4.24;
import "tokens/eip20/EIP20Interface.sol";
import "dll/DLL.sol";
import "attrstore/AttributeStore.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./IVoting.sol";

/**
@title Partial-Lock-Commit-Reveal Voting scheme with ERC20 tokens
@author Team: Aspyn Palatnick, Cem Ozer, Yorke Rhodes
*/
contract Voting is IVoting {

    // ============
    // EVENTS:
    // ============

    event _VoteCommitted(uint indexed pollID, address indexed voter);
    event _VoteRevealed(uint indexed pollID, uint numTokens, uint votesFor, uint votesAgainst, uint indexed choice, address indexed voter, uint salt);
    event _PollCreated(uint itemId, uint commitEndDate, uint revealEndDate, uint indexed pollID, address indexed creator);
    event _VotingRightsGranted(uint numTokens, address indexed voter);
    event _VotingRightsWithdrawn(uint numTokens, address indexed voter);
    event _TokensRescued(uint indexed pollID, address indexed voter);

    // ============
    // DATA STRUCTURES:
    // ============

    using AttributeStore for AttributeStore.Data;
    using DLL for DLL.Data;
    using SafeMath for uint;

  
 

    // ============
    // STATE VARIABLES:
    // ============

    uint constant public INITIAL_POLL_NONCE = 0;
    uint constant public PRECISION = 10000;
    uint public pollNonce;

    mapping(address => uint) public voteTokenBalance; // maps user's address to voteToken balance
    mapping(address => DLL.Data) dllMap;
    AttributeStore.Data store;

    EIP20Interface public token;
    address public fund;

    /**
    @dev Initializer. Can only be called once.
    @param _token The address where the ERC20 token contract is deployed
    */
    function init(address _token, address _fund) public {
        require(_token != address(0) && address(token) == address(0));
        require(_fund != address(0) && address(_fund) == address(0));

        token = EIP20Interface(_token);
        fund = _fund;
        pollNonce = INITIAL_POLL_NONCE;
    }

    // ================
    // TOKEN INTERFACE:
    // ================

    /**
    @notice Loads _numTokens ERC20 tokens into the voting contract for one-to-one voting rights
    @dev Assumes that msg.sender has approved voting contract to spend on their behalf
    @param _numTokens The number of votingTokens desired in exchange for ERC20 tokens
    */
    function requestVotingRights(uint _pollId, uint _numTokens) public {
        
        require(token.balanceOf(msg.sender) >= _numTokens);
        pollMap[_pollId].lockedStakes[msg.sender] += _numTokens;
        require(token.transferFrom(msg.sender, this, _numTokens));
        emit _VotingRightsGranted(_numTokens, msg.sender);
    }

    /**
    @notice Withdraw _numTokens ERC20 tokens from the voting contract, revoking these voting rights
    @param _numTokens The number of ERC20 tokens desired in exchange for voting rights
    */
    function withdrawVotingRights(uint _pollId, uint _numTokens) external {
        uint availableTokens = pollMap[_pollId].lockedStakes[msg.sender];

        require(availableTokens >= _numTokens, "not enought tokens to withdraw rights");
        pollMap[_pollId].lockedStakes[msg.sender] -= _numTokens;
        uint fee = calculateRevealFee(_pollId, _numTokens);
        require(token.transfer(msg.sender, fee));
        emit _VotingRightsWithdrawn(_numTokens, msg.sender);
    }

    /**
    // @dev Unlocks tokens locked in unrevealed vote where poll has ended
    // @param _pollID Integer identifier associated with the target poll
    // */
    // function rescueTokens(uint _pollID) public {
    //     require(isExpired(pollMap[_pollID].revealEndDate));
    //     require(lockedTokens[_pollId][msg.sender] != 0);
        
    //     emit _TokensRescued(_pollID, msg.sender);
    // }

    // /**
    // @dev Unlocks tokens locked in unrevealed votes where polls have ended
    // @param _pollIDs Array of integer identifiers associated with the target polls
    // */
    // function rescueTokensInMultiplePolls(uint[] _pollIDs) public {
    //     // loop through arrays, rescuing tokens from all
    //     for (uint i = 0; i < _pollIDs.length; i++) {
    //         rescueTokens(_pollIDs[i]);
    //     }
    // }

    // =================
    // VOTING INTERFACE:
    // =================

    /**
    @notice Commits vote using hash of choice and secret salt to conceal vote until reveal
    @param _pollID Integer identifier associated with target poll
    @param _secretHash Commit keccak256 hash of voter's choice and salt (tightly packed in this order)
    @param _prevPollID The ID of the poll that the user has voted the maximum number of tokens in which is still less than or equal to numTokens
    */
    function commitVote(uint _pollID, bytes32 _secretHash, uint _prevPollID) public {
        require(commitPeriodActive(_pollID));

        // prevent user from committing to zero node placeholder
        require(_pollID != 0);
        // prevent user from committing a secretHash of 0
        require(_secretHash != 0);


        //  require(validPosition(_prevPollID, nextPollID, msg.sender, _numTokens));

        bytes32 UUID = attrUUID(msg.sender, _pollID);

        store.setAttribute(UUID, "commitHash", uint(_secretHash));

        pollMap[_pollID].didCommit[msg.sender] = true;
        payFee(_pollID, calculateCommitFee(_pollID));

        emit _VoteCommitted(_pollID, msg.sender);
    }

    /**
    @notice Reveals vote with choice and secret salt used in generating commitHash to attribute committed tokens
    @param _pollID Integer identifier associated with target poll
    @param _voteOption Vote choice used to generate commitHash for associated poll
    @param _salt Secret number used to generate commitHash for associated poll
    */
    function revealVote(uint _pollID, uint _voteOption, uint _voteStake, uint _salt) public {
        // make sure msg.sender has enough voting rights
        
        // Make sure the reveal period is active
        require(revealPeriodActive(_pollID));
        require(pollMap[_pollID].didCommit[msg.sender]);                         // make sure user has committed a vote for this poll
        require(!pollMap[_pollID].didReveal[msg.sender]);                        // prevent user from revealing multiple times
        require(keccak256(abi.encodePacked(_voteOption, _voteStake, _salt)) == getCommitHash(msg.sender, _pollID)); // compare resultant hash from inputs to original commitHash

        uint fee = calculateRevealFee(_pollID, _voteStake);
        payFee(_pollID, fee);

        requestVotingRights(_pollID, _voteStake);
        
        //  uint numTokens = getNumTokens(msg.sender, _pollID);
        bytes32 UUID = attrUUID(msg.sender, _pollID);

        store.setAttribute(UUID, "numTokens", _voteStake);

        if (_voteOption == 1) {// apply numTokens to appropriate poll choice
            pollMap[_pollID].votesFor += _voteStake;
        } else {
            pollMap[_pollID].votesAgainst += _voteStake;
        }

        pollMap[_pollID].didReveal[msg.sender] = true;
        pollMap[_pollID].voteOptions[msg.sender] = _voteOption;

        emit _VoteRevealed(_pollID, _voteStake, pollMap[_pollID].votesFor, pollMap[_pollID].votesAgainst, _voteOption, msg.sender, _salt);
    }

    function getPollResult(uint _pollId) public view returns (uint votesFor, uint votesAgainst) {
        return (pollMap[_pollId].votesFor, pollMap[_pollId].votesAgainst);
    }

    function getVoteOption(uint _pollId, address voter) public view returns (uint) {
        return pollMap[_pollId].voteOptions[voter];
    }

    function withdrawStake(uint _pollID, address _voter, uint _numTokens) public {
        require(pollEnded(_pollID));
        require(pollMap[_pollID].lockedStakes[_voter] > _numTokens, "not enough token to withdraw");
        address voter = _voter;
        Poll  poll = pollMap[_pollID];

        uint vote = poll.voteOptions[voter] == 1? 1: 0; 
        uint votingResult = result(_pollID);

        if (vote == votingResult) {
            // winner
            if(! poll.prizePayed[voter]) {
                sendWinnerPrize(_pollID, voter);
                poll.prizePayed[voter] = true;
            } 
        } 
        
        uint stake = poll.lockedStakes[voter];
        require(token.transfer(voter, stake));

    }

    function sendWinnerPrize(uint _pollID, address voter) private view {
        Poll poll = pollMap[_pollID];
        uint overallStakes = poll.votesFor + poll.votesAgainst;
        uint winnerPrize = poll.prize.mul(poll.lockedStakes[voter]).div(overallStakes);
        require(token.transfer(voter, winnerPrize));
        
    }






    // ==================
    // POLLING INTERFACE:
    // ==================

    /**
    @dev Initiates a poll with canonical configured parameters at pollID emitted by PollCreated event
    @param _commitDuration Length of desired commit period in seconds
    @param _revealDuration Length of desired reveal period in seconds
    */
    function startPoll(uint _itemId, uint _commitDuration, uint _revealDuration, uint _voteFee, uint _revealFeeRate) public returns (uint pollID) {
        require(_revealFeeRate > 0);
        pollNonce = pollNonce + 1;

        uint commitEndDate = block.timestamp.add(_commitDuration);
        uint revealEndDate = commitEndDate.add(_revealDuration);

        pollMap[pollNonce] = Poll({
            itemId: _itemId,
            commitEndDate: commitEndDate,
            revealEndDate: revealEndDate,
            votesFor: 0,
            votesAgainst: 0,
            voteFee: _voteFee,
            revealRateFee: _revealFeeRate,
            prize: 0
        });

        emit _PollCreated(_itemId, commitEndDate, revealEndDate, pollNonce, msg.sender);
        return pollNonce;
    }

    /**
    @notice Determines if proposal has passed
    @dev Check if votesFor out of totalVotes exceeds votesQuorum (requires pollEnded)
    @param _pollID Integer identifier associated with target poll
    */
    function result(uint _pollID) constant public returns (uint passed) {
        require(pollEnded(_pollID));

        Poll memory poll = pollMap[_pollID];
        if (poll.votesFor > poll.votesAgainst) {
            return 1;
        } 
        if (poll.votesFor <= poll.votesAgainst) {
            return 0;
        }

    }

    // ----------------
    // POLLING HELPERS:
    // ----------------


    /**
    @notice Determines if poll is over
    @dev Checks isExpired for specified poll's revealEndDate
    @return Boolean indication of whether polling period is over
    */
    function pollEnded(uint _pollID) constant public returns (bool ended) {
        require(pollExists(_pollID));

        return isExpired(pollMap[_pollID].revealEndDate);
    }

    /**
    @notice Checks if the commit period is still active for the specified poll
    @dev Checks isExpired for the specified poll's commitEndDate
    @param _pollID Integer identifier associated with target poll
    @return Boolean indication of isCommitPeriodActive for target poll
    */
    function commitPeriodActive(uint _pollID) constant public returns (bool active) {
        require(pollExists(_pollID));

        return !isExpired(pollMap[_pollID].commitEndDate);
    }

    /**
    @notice Checks if the reveal period is still active for the specified poll
    @dev Checks isExpired for the specified poll's revealEndDate
    @param _pollID Integer identifier associated with target poll
    */
    function revealPeriodActive(uint _pollID) constant public returns (bool active) {
        require(pollExists(_pollID));

        return !isExpired(pollMap[_pollID].revealEndDate) && !commitPeriodActive(_pollID);
    }

    /**
    @dev Checks if user has committed for specified poll
    @param _voter Address of user to check against
    @param _pollID Integer identifier associated with target poll
    @return Boolean indication of whether user has committed
    */
    function didCommit(address _voter, uint _pollID) constant public returns (bool committed) {
        require(pollExists(_pollID));

        return pollMap[_pollID].didCommit[_voter];
    }

    /**
    @dev Checks if user has revealed for specified poll
    @param _voter Address of user to check against
    @param _pollID Integer identifier associated with target poll
    @return Boolean indication of whether user has revealed
    */
    function didReveal(address _voter, uint _pollID) constant public returns (bool revealed) {
        require(pollExists(_pollID));

        return pollMap[_pollID].didReveal[_voter];
    }

    /**
    @dev Checks if a poll exists
    @param _pollID The pollID whose existance is to be evaluated.
    @return Boolean Indicates whether a poll exists for the provided pollID
    */
    function pollExists(uint _pollID) constant public returns (bool exists) {
        return (_pollID != 0 && _pollID <= pollNonce);
    }

    function calculateCommitFee(uint _pollID) view public returns (uint fee) {
        require(pollExists(_pollID));
        return pollMap[_pollID].voteFee;
    }

    function calculateRevealFee(uint _pollID, uint _stake) view public returns (uint fee) {
        require(pollExists(_pollID));
        return _stake.mul(pollMap[_pollID].revealRateFee).div(PRECISION);
    }

    // ---------------------------
    // DOUBLE-LINKED-LIST HELPERS:
    // ---------------------------

    /**
    @dev Gets the bytes32 commitHash property of target poll
    @param _voter Address of user to check against
    @param _pollID Integer identifier associated with target poll
    @return Bytes32 hash property attached to target poll
    */
    function getCommitHash(address _voter, uint _pollID) constant public returns (bytes32 commitHash) {
        return bytes32(store.getAttribute(attrUUID(_voter, _pollID), "commitHash"));
    }

    /**
    @dev Wrapper for getAttribute with attrName="numTokens"
    @param _voter Address of user to check against
    @param _pollID Integer identifier associated with target poll
    @return Number of tokens committed to poll in sorted poll-linked-list
    */
    function getNumTokens(address _voter, uint _pollID) constant public returns (uint numTokens) {
        return store.getAttribute(attrUUID(_voter, _pollID), "numTokens");
    }

    /**
    @dev Gets top element of sorted poll-linked-list
    @param _voter Address of user to check against
    @return Integer identifier to poll with maximum number of tokens committed to it
    */
    function getLastNode(address _voter) constant public returns (uint pollID) {
        return dllMap[_voter].getPrev(0);
    }

   

    // ----------------
    // GENERAL HELPERS:
    // ----------------

    /**
    @dev Checks if an expiration date has been reached
    @param _terminationDate Integer timestamp of date to compare current timestamp with
    @return expired Boolean indication of whether the terminationDate has passed
    */
    function isExpired(uint _terminationDate) constant public returns (bool expired) {
        return (block.timestamp > _terminationDate);
    }

    /**
    @dev Generates an identifier which associates a user and a poll together
    @param _pollID Integer identifier associated with target poll
    @return UUID Hash which is deterministic from _user and _pollID
    */
    function attrUUID(address _user, uint _pollID) public pure returns (bytes32 UUID) {
        return keccak256(abi.encodePacked(_user, _pollID));
    }

    

    // ===============
    // PRIVATE METHODS:
    // ===============
    /**
     */
    function payFee(uint _pollID, uint _fee) private {
        require(pollExists(_pollID));
        require(token.balanceOf(msg.sender) >= _fee);
        require(token.transferFrom(msg.sender, this, _fee));
        pollMap[_pollID].prize += _fee;
    }

}