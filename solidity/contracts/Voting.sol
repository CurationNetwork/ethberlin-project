pragma solidity ^0.4.24;
import "tokens/eip20/EIP20Interface.sol";
import "dll/DLL.sol";
import "attrstore/AttributeStore.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./IVoting.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
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
    event _StakeWithdrawed(uint indexed pollID, address indexed voter, uint numTokens);

    // ============
    // DATA STRUCTURES:
    // ============

    using AttributeStore for AttributeStore.Data;
    using SafeMath for uint;

    mapping(uint => Poll) public pollMap; // maps pollID to Poll struct

    struct Poll {
        uint itemId;
        uint commitEndDate;     /// expiration date of commit period for poll
        uint revealEndDate;     /// expiration date of reveal period for poll
        uint votesFor;          /// tally of votes supporting proposal
        uint votesAgainst;      /// tally of votes countering proposal
        mapping(address => bool) didCommit;   /// indicates whether an address committed a vote for this poll
        mapping(address => bool) didReveal;   /// indicates whether an address revealed a vote for this poll
        mapping(address => uint) voteOptions; /// stores the voteOption of an address that revealed
        mapping(address => uint) lockedStakes; ///
        mapping(address => uint) withdrawedStakes;
    }

    // ============
    // STATE VARIABLES:
    // ============

    uint constant public INITIAL_POLL_NONCE = 0;
    uint public pollNonce;

    AttributeStore.Data store;

    constructor() public  {}


    /**
    @dev Initializer. Can only be called once.
    */
    function init() public {
        pollNonce = INITIAL_POLL_NONCE;
    }

    // =================
    // VOTING INTERFACE:
    // =================
    /**
    @notice Commits vote using hash of choice and secret salt to conceal vote until reveal
    @param _pollID Integer identifier associated with target poll
    @param _secretHash Commit keccak256 hash of voter's choice and salt (tightly packed in this order)
    */
    function commitVote(uint _pollID, bytes32 _secretHash, address voter) public {
        require(commitPeriodActive(_pollID));

        // prevent user from committing to zero node placeholder
        require(_pollID != 0);
        // prevent user from committing a secretHash of 0
        require(_secretHash != 0);

        bytes32 UUID = attrUUID(voter, _pollID);

        store.setAttribute(UUID, "commitHash", uint(_secretHash));

        pollMap[_pollID].didCommit[voter] = true;

        emit _VoteCommitted(_pollID, voter);
    }


    /**
    @notice Reveals vote with choice and secret salt used in generating commitHash to attribute committed tokens
    @param _pollID Integer identifier associated with target poll
    @param _voteOption Vote choice used to generate commitHash for associated poll
    @param _salt Secret number used to generate commitHash for associated poll
    */

    function revealVote(uint _pollID, uint _voteOption, uint _voteStake, uint _salt, address _voter) public {
        // make sure msg.sender has enough voting rights

        // Make sure the reveal period is active
        require(revealPeriodActive(_pollID));
        require(pollMap[_pollID].didCommit[_voter]);                         // make sure user has committed a vote for this poll
        require(!pollMap[_pollID].didReveal[_voter]);                        // prevent user from revealing multiple times
        require(keccak256(abi.encodePacked(_voteOption, _voteStake, _salt)) == getCommitHash(_voter, _pollID)); // compare resultant hash from inputs to original commitHash

        pollMap[_pollID].lockedStakes[_voter] += _voteStake;

        //  uint numTokens = getNumTokens(msg.sender, _pollID);
        bytes32 UUID = attrUUID(_voter, _pollID);

        store.setAttribute(UUID, "numTokens", _voteStake);

        if (_voteOption == 1) {// apply numTokens to appropriate poll choice
            pollMap[_pollID].votesFor += _voteStake;
        } else {
            pollMap[_pollID].votesAgainst += _voteStake;
        }

        pollMap[_pollID].didReveal[_voter] = true;
        pollMap[_pollID].voteOptions[_voter] = _voteOption;

        emit _VoteRevealed(_pollID, _voteStake, pollMap[_pollID].votesFor, pollMap[_pollID].votesAgainst, _voteOption, _voter, _salt);
    }


    // ==================
    // POLLING INTERFACE:
    // ==================

    /**
    @dev Initiates a poll with canonical configured parameters at pollID emitted by PollCreated event
    @param _commitDuration Length of desired commit period in seconds
    @param _revealDuration Length of desired reveal period in seconds
    */
    function startPoll(uint _itemId, uint _commitDuration, uint _revealDuration) public returns (uint pollID) {
        pollNonce = pollNonce + 1;

        uint commitEndDate = block.timestamp.add(_commitDuration);
        uint revealEndDate = commitEndDate.add(_revealDuration);

        pollMap[pollNonce] = Poll({
            itemId: _itemId,
            commitEndDate: commitEndDate,
            revealEndDate: revealEndDate,
            votesFor: 0,
            votesAgainst: 0
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

    function getPollResult(uint _pollId) public view returns (uint votesFor, uint votesAgainst) {
        return (pollMap[_pollId].votesFor, pollMap[_pollId].votesAgainst);
    }

    function getOverallStake(uint _pollId) public returns (uint) {
        Poll storage poll = pollMap[_pollId];
        return poll.votesFor + poll.votesAgainst;
    }

    function isWinner(uint _pollId, address voter) public returns (bool) {
        Poll storage poll = pollMap[_pollId];
        uint vote = poll.voteOptions[voter] == 1? 1: 0;

        if (vote == result(_pollId)) {
            return true;
        }
        else {
            return false;
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


}
