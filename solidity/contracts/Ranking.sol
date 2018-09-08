pragma solidity ^0.4.23;

import './IVoting.sol';


contract Ranking {
    enum ItemState { None, Voting }
    enum VotingState { Commiting, Revealing, Finished }
    enum VoterState { None, Win, Lose }

    struct VoterInfo {
        uint direction;
        uint stake;
        uint unstaked;
        VoterState state;
    }

    struct Voting {
        uint fixedFee;
        uint dynamicFeeRate;
        uint unstakeSpeed;
        uint commitTtl;
        uint revealTtl;
        uint startTime;
        uint commissions;
        uint pollId;

        address[] votersAddresses;
        mapping (address => VoterInfo) voters;
    }

    struct Moving {
        uint startTime;
        uint speed;
        uint distance;
        uint direction;
        uint votingId;
    }

    struct Item {
        string name;
        address owner;
        uint lastRank;
        uint balance;
        uint votingId;
        uint[] movingsIds;
    }


    uint ItemsLastId = 1;
    mapping (uint => Item) Items;
    uint[] ItemsIds;

    uint VotingsLastId = 1;
    mapping (uint => Voting) Votings;

    uint MovingsLastId = 1;
    mapping (uint => Moving) Movings;

    uint avgStake;
    uint stakesCounter;
    uint dynamicFeeRate;
    uint systemBank;
    uint unstakeSpeed;
    uint commitTtl;
    uint revealTtl;

    IVoting votingContract;


    constructor(address votingContractAddress) public {
        votingContract = IVoting(votingContractAddress);
    }


    /* MODIFIERS */
    modifier onlyExistItem(uint itemId) {
        require(Items[itemId].owner != address(0));
        _;
    }

    modifier onlyExistVoting(uint votingId) {
        require(Votings[votingId].startTime != 0);
        _;
    }


    /* VIEW FUNCTIONS */
    function getItemState(uint itemId)
        public
        view
        onlyExistItem(itemId)
        returns (ItemState)
    {
        Item storage item = Items[itemId];

        if (item.votingId == 0)
            return ItemState.None;
        else
            return ItemState.Voting;
    }

    function getVotingState(uint votingId)
        public
        view
        onlyExistVoting(votingId)
        returns (VotingState)
    {
        Voting storage voting = Votings[votingId];

        if (voting.startTime + voting.commitTtl + voting.revealTtl > now)
            return VotingState.Finished;
        if (voting.startTime + voting.commitTtl > now)
            return VotingState.Revealing;

        return VotingState.Commiting;
    }

    function getFixedCommission(uint itemId)
        public
        view
        onlyExistItem(itemId)
        returns (uint)
    {
        //TODO calc fixed commission
        return 1;
    }

    function getDynamicCommission(uint votingId, uint stake)
        public
        view
        onlyExistVoting(votingId)
        returns (uint)
    {
        //TODO calc dynamic commission
        return 1;
    }

    function getItems()
        public
        view
        returns (uint[])
    {
        return ItemsIds;
    }

    function getItem(uint itemId)
        public
        view
        onlyExistItem(itemId)
        returns (
            string name,
            address owner,
            uint lastRank,
            uint balance,
            uint votingId,
            uint[] movingsIds
        )
    {
        Item storage item = Items[itemId];
        return (
            item.name,
            item.owner,
            item.lastRank,
            item.balance,
            item.votingId,
            item.movingsIds
        );
    }

    function getVoting(uint votingId)
        public
        view
        onlyExistVoting(votingId)
        returns (
            uint fixedFee,
            uint dynamicFeeRate,
            uint unstakeSpeed,
            uint commitTtl,
            uint revealTtl,
            uint startTime,
            uint commissions,
            address[] votersAddresses
        )
    {
        Voting storage voting = Votings[votingId];
        return (
            voting.fixedFee,
            voting.dynamicFeeRate,
            voting.unstakeSpeed,
            voting.commitTtl,
            voting.revealTtl,
            voting.startTime,
            voting.commissions,
            voting.votersAddresses
        );
    }

    function getVoterInfo(uint votingId, address voter)
        public
        view
        onlyExistVoting(votingId)
        returns (
            uint direction,
            uint stake,
            uint unstaked
        )
    {
        VoterInfo storage info = Votings[votingId].voters[voter];
        return (
            info.direction,
            info.stake,
            info.unstaked
        );
    }


    /* LISTING FUNCTIONS */
    function newItem(string name)
        public
    {
        Item storage item = Items[ItemsLastId];
        ItemsIds.push(ItemsLastId++);

        item.name = name;
        item.owner = msg.sender;
    }


    /* VOTING FUNCTIONS */
    function voteCommit(uint itemId, bytes32 commitment)
        public
        onlyExistItem(itemId)
    {
        Item storage item = Items[itemId];

        if (item.votingId == 0)
            item.votingId = newVoting(itemId);

        require(getVotingState(item.votingId) == VotingState.Commiting);

        Voting storage voting = Votings[item.votingId];
        voting.commissions += getFixedCommission(itemId);

        uint pollId = votingContract.startPoll(
            itemId,
            voting.commitTtl,
            voting.revealTtl,
            voting.fixedFee,
            voting.dynamicFeeRate
        );

        voting.pollId = pollId;
    }

    function voteReveal(uint itemId, uint8 direction, uint stake, uint salt)
        public
        onlyExistItem(itemId)
    {
        Item storage item = Items[itemId];
        require(getItemState(itemId) == ItemState.Voting);
        require(getVotingState(item.votingId) == VotingState.Revealing);

        Voting storage voting = Votings[item.votingId];
        voting.commissions += getDynamicCommission(item.votingId, stake);

        voting.votersAddresses.push(msg.sender);
        VoterInfo storage voterInfo = voting.voters[msg.sender];
        voterInfo.stake = stake;
        voterInfo.direction = direction;

        votingContract.revealVote(voting.pollId, direction, stake, salt);
    }

    function finishVoting(uint itemId)
        public
        onlyExistItem(itemId)
    {
        Item storage item = Items[itemId];
        require(getItemState(itemId) == ItemState.Voting);
        require(getVotingState(item.votingId) == VotingState.Finished);

        Voting storage voting = Votings[item.votingId];

        var (votesUp, votesDown) = votingContract.getPollResult(voting.pollId);

        uint direction = votesUp > votesDown ? 1 : 0;
        uint distance = votesUp > votesDown ? votesUp - votesDown : votesDown - votesUp;

        for (uint i = 0; i < voting.votersAddresses.length; i++) {
            address voter = voting.votersAddresses[i];
            uint voteOption = votingContract.getVoteOption(voting.pollId, voter);
            voting.voters[voter].state = voteOption == direction ? VoterState.Win : VoterState.Lose;
        }

        item.movingsIds.push(newMoving(now, unstakeSpeed, distance, direction, item.votingId));
        item.votingId = 0;
    }

    function unstake()
        public
    {
        // TODO try to claim all unstaked tokens
    }


    /* INTERNAL FUNCTIONS */
    function newVoting(uint itemId)
        internal
        returns (uint)
    {
        uint votingId = VotingsLastId++;
        Voting storage voting = Votings[votingId];

        voting.startTime = now;
        voting.fixedFee = getFixedCommission(itemId);
        voting.unstakeSpeed = unstakeSpeed;
        voting.commitTtl = commitTtl;
        voting.revealTtl = revealTtl;
        voting.dynamicFeeRate = dynamicFeeRate;

        return votingId;
    }

    function newMoving(uint startTime, uint speed, uint distance, uint direction, uint votingId)
        internal
        returns (uint)
    {
        uint movingId = MovingsLastId++;
        Moving storage moving = Movings[movingId];

        moving.startTime = startTime;
        moving.speed = speed;
        moving.distance = distance;
        moving.direction = direction;
        moving.votingId = votingId;

        return movingId;
    }
}
