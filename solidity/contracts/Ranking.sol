pragma solidity ^0.4.23;

contract Ranking {

    struct VoterInfo {
        uint stake;
        uint unstaked;
    }

    struct Voting {
        uint fixedFee;
        uint avgStake;
        uint commitTtl;
        uint revealTtl;
        uint startTime;
        uint commissions;

        mapping (address => VoterInfo) voters;

        address[] winners;
        address[] losers;
    }

    struct Moving {
        uint startTime;
        uint speed;
        uint distance;
        uint8 direction;
    }

    struct Item {
        string name;
        uint lastRank;
        uint balance;
        address owner;
        uint votingId;
        mapping (uint => Moving) Movings;
    }

    uint ItemsLastId = 1;
    mapping (uint => Item) Items;
    uint[] ItemsIds;


    uint VotingsLastId = 1;
    mapping (uint => Voting) Votings;
    uint[] VotingsIds;


    uint avgStake;
    uint stakesCounter;
    uint systemBank;
    uint unstakeSpeed;
    uint votingTtl;


    constructor() public {
    }

    function newItem(string name) public {
        var item = Items[ItemsLastId];
        ItemsIds.push(ItemsLastId++);

        item.name = name;
        item.owner = msg.sender;
        item.state = ItemState.None;
    }

    function getFixedCommission(uint itemId) returns (uint) {
        //TODO calc fixed commission
    }

    function getDynamicCommission(uint votingId, address voter) returns (uint) {
        //TODO calc dynamic commission
    }

    function newVoting(uint itemId) internal returns (uint){
        var item = Items[itemId];
        require(item.owner != address(0));
        require(item.votingId == 0);

        var votingId = VotingsLastId++;
        var voting = Votings[votingId];
        VotingsIds.push(votingId);

        voting.startTime = now;
        voting.avgStake = avgStake;
        voting.fixedFee = getFixedCommission(itemId);

        item.votingId = votingId;
        return votingId;
    }

    function vote(uint itemId, bytes32 commitment) public payable {
        var item = Items[itemId];
        require(item.owner != address(0));
        require(msg.value == getFixedCommission(itemId));

        uint votingId = item.votingId;
        if (votingId == 0)
            votingId = newVoting(itemId);

        var voting = Votings[votingId];
        voting.commissions += msg.value;

        var voterInfo = voting.voters[msg.sender];

        //TODO call Voting contract
    }

    function finishVoting(uint itemId) public {
        var item = Items[itemId];
        require(item.owner != address(0));
        require(item.votingId != 0);

        var voting = Voting[item.votingId];
        require(voting.startTime + voting.commitTtl + voting.revealTtl <= now);

        //TODO call finish function of Voting contract & obtain results => init new moving

        item.votingId = 0;
    }

    function unstake() {
        // TODO try to unstake all unstaked tokens
    }

    function claimBenefit() {
        // TODO
    }

    function getItems() returns (uint[]){
    }

    function getItem(uint itemId) returns (Item){
    }

    function getVoting(uint votingId) returns (Item){
    }
}
