pragma solidity ^0.4.24;


contract IVoting {
    constructor() public {}


    function getPollResult(uint _pollId) public view returns (uint votesFor, uint votesAgainst);

    function isWinner(uint _pollId, address voter) public returns (bool);

    function getOverallStake(uint _pollId) public returns (uint);

    /**
    @dev Initiates a poll with canonical configured parameters at pollID emitted by PollCreated event
    @param _itemId - item for voting
    @param _commitDuration Length of desired commit period in seconds
    @param _revealDuration Length of desired reveal period in seconds
    */
    function startPoll(uint _itemId, uint _commitDuration, uint _revealDuration) public returns (uint pollID);

    /**
    @notice Commits vote using hash of choice and secret salt to conceal vote until reveal
    @param _pollID Integer identifier associated with target poll
    @param _secretHash Commit keccak256 hash of voter's choice and salt (tightly packed in this order)
    */
    function commitVote(uint _pollID, bytes32 _secretHash, address voter) public;

    /**
    @notice Reveals vote with choice and secret salt used in generating commitHash to attribute committed tokens
    @param _pollID Integer identifier associated with target poll
    @param _voteOption Vote choice used to generate commitHash for associated poll. 0 - down, 1 - up
    @param _salt Secret number used to generate commitHash for associated poll
    */
    function revealVote(uint _pollID, uint _voteOption, uint _voteStake, uint _salt, address _voter) public;

}
