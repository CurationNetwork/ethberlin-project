pragma solidity ^0.4.24;


contract IVoting {
    struct Vote {
        address voter;
        uint stake;
    }

    struct PollResult {
        Vote[] winners;
        Vote[] losers;
        uint direction;
    }

    /**
    @dev Initiates a poll with canonical configured parameters at pollID emitted by PollCreated event
    @param _itemId - item for voting 
    @param _commitDuration Length of desired commit period in seconds
    @param _revealDuration Length of desired reveal period in seconds
    @param _voteFee - static fee for voting
    @param _revealFeeRate - reveal fee parameter
    */
    function startPoll(uint _itemId, uint _commitDuration, uint _revealDuration, uint _voteFee, uint _revealFeeRate) public returns (uint pollID);

    /**
    @notice Commits vote using hash of choice and secret salt to conceal vote until reveal
    @param _pollID Integer identifier associated with target poll
    @param _secretHash Commit keccak256 hash of voter's choice and salt (tightly packed in this order)
    */
    function commitVote(uint _pollID, bytes32 _secretHash) public;


     /**
    @notice Reveals vote with choice and secret salt used in generating commitHash to attribute committed tokens
    @param _pollID Integer identifier associated with target poll
    @param _voteOption Vote choice used to generate commitHash for associated poll
    @param _salt Secret number used to generate commitHash for associated poll
    */
    function revealVote(uint _pollID, uint _voteOption, uint _voteStake, uint _salt) public;
     

    /**
    @notice 
     */
    /**
    @notice Determines if proposal has passed
    @dev Check if votesFor out of totalVotes exceeds votesQuorum (requires pollEnded)
    @param _pollID Integer identifier associated with target poll
    */
    function isPassed(uint _pollID) view public returns (bool passed);
       
}