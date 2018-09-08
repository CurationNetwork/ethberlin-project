pragma solidity ^0.4.24;


contract IVoting {

    mapping(uint => Poll) public pollMap; // maps pollID to Poll struct

    struct Poll {
        uint itemId;
        uint commitEndDate;     /// expiration date of commit period for poll
        uint revealEndDate;     /// expiration date of reveal period for poll
        uint votesFor;		    /// tally of votes supporting proposal
        uint votesAgainst;      /// tally of votes countering proposal
        uint voteFee;
        uint revealRateFee;
        uint prize;
        mapping(address => bool) didCommit;   /// indicates whether an address committed a vote for this poll
        mapping(address => bool) didReveal;   /// indicates whether an address revealed a vote for this poll
        mapping(address => uint) voteOptions; /// stores the voteOption of an address that revealed
        mapping(address => uint) lockedStakes; ///
        mapping(address => bool) prizePayed; ///
    }

    function getPollResult(uint _pollId) public view returns (uint votesFor, uint votesAgainst);

    function getVoteOption(uint _pollId, address voter) public view returns (uint);

    function getWinnerPrize(uint _pollId, address voter) public returns (uint);

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
    @param _voteOption Vote choice used to generate commitHash for associated poll. 0 - down, 1 - up
    @param _salt Secret number used to generate commitHash for associated poll
    */
    function revealVote(uint _pollID, uint _voteOption, uint _voteStake, uint _salt) public;

    function withdrawStake(address voter, uint _numTokens) public;

}