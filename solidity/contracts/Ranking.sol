pragma solidity ^0.4.23;

import 'tokens/eip20/EIP20Interface.sol';
import './IVoting.sol';


contract Ranking {
    enum ItemState { None, Voting }
    enum VotingState { Commiting, Revealing, Finished }

    struct VoterInfo {
        uint direction;
        uint stake;
        uint unstaked;
        uint prize;
        bool isWinner;
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
        string description;
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


    uint stakesCounter;
    uint maxRank;
    uint deployTime;
    uint votingCount;
    uint avgStake;

    IVoting votingContract;
    EIP20Interface token;


    /* constants */
    uint currentDynamicFeeRate;
    uint dynamicFeePrecision;
    uint fixedFeeMax;

    uint tMin;
    uint unstakeSpeed0;
    uint unstakeSpeedCoef;

    uint currentCommitTtl;
    uint currentRevealTtl;


    constructor() public {}

    function init(address votingContractAddress, address tokenAddress,
                uint currentDynamicFeeRate_, uint dynamicFeePrecision_, uint fixedFeeMax_,
                uint tMin_, uint unstakeSpeed0_, uint unstakeSpeedCoef_,
                uint currentCommitTtl_, uint currentRevealTtl_, uint avgStake_
    )
        public
    {
        votingContract = IVoting(votingContractAddress);
        token = EIP20Interface(tokenAddress);
        deployTime = now;

        currentDynamicFeeRate = currentDynamicFeeRate_;
        dynamicFeePrecision = dynamicFeePrecision_;
        fixedFeeMax = fixedFeeMax_;
        tMin = tMin_;
        unstakeSpeed0 = unstakeSpeed0_;
        unstakeSpeedCoef = unstakeSpeedCoef_;
        currentCommitTtl = currentCommitTtl_;
        currentRevealTtl = currentRevealTtl_;
        avgStake = avgStake_;
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

    modifier onlyExistMoving(uint movingId) {
        require(Movings[movingId].startTime != 0);
        _;
    }

    modifier onlyItemOwner(uint itemId) {
        require(Items[itemId].owner == msg.sender);
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

        if (voting.startTime + voting.commitTtl + voting.revealTtl < now)
            return VotingState.Finished;
        if (voting.startTime + voting.commitTtl < now)
            return VotingState.Revealing;

        return VotingState.Commiting;
    }

    function getFixedCommission(uint itemId)
        public
        view
        onlyExistItem(itemId)
        returns (uint)
    {
        uint dRank = 1;
        uint totalRank = getTotalRank(itemId);

        if (totalRank < maxRank)
            dRank = maxRank - totalRank;

        return fixedFeeMax / dRank;
    }

    function getDynamicCommission(uint votingId, uint stake)
        public
        view
        onlyExistVoting(votingId)
        returns (uint)
    {
        return stake * currentDynamicFeeRate / dynamicFeePrecision;
    }

    function getTotalRank(uint itemId)
        public
        view
        onlyExistItem(itemId)
        returns (uint)
    {
        Item storage item = Items[itemId];

        uint rank = item.lastRank;

        for (uint i = 0; i < item.movingsIds.length; ++i) {
            Moving storage moving = Movings[item.movingsIds[i]];

            if ((now - moving.startTime) * moving.speed >= moving.distance) {
                if (moving.direction != 0)
                    rank += moving.distance;
                else
                    rank -= moving.distance;
            }
            else {
                if (moving.direction != 0)
                    rank += (now - moving.startTime) * moving.speed;
                else
                    rank -= (now - moving.startTime) * moving.speed;
            }
        }

        return rank;
    }

    function getUnstakeSpeed()
        public
        view
        returns (uint)
    {
        return unstakeSpeed0 + tMin * votingCount * unstakeSpeedCoef / avgStake;
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
            string description,
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
            item.description,
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
            uint unstaked,
            uint prize,
            bool isWinner
        )
    {
        VoterInfo storage info = Votings[votingId].voters[voter];
        return (
            info.direction,
            info.stake,
            info.unstaked,
            info.prize,
            info.isWinner
        );
    }

    function getMoving(uint movingId)
        public
        view
        onlyExistMoving(movingId)
        returns (
            uint startTime,
            uint speed,
            uint distance,
            uint direction,
            uint votingId
        )
    {
        Moving storage moving = Movings[movingId];
        return (
            moving.startTime,
            moving.speed,
            moving.distance,
            moving.direction,
            moving.votingId
        );
    }


    /* LISTING FUNCTIONS */
    function newItem(string name, string desc)
        public
    {
        Item storage item = Items[ItemsLastId];
        ItemsIds.push(ItemsLastId++);

        item.name = name;
        item.description = desc;
        item.owner = msg.sender;
    }

    function chargeBalance(uint itemId, uint numTokens)
        public
        onlyItemOwner(itemId)
    {
        require(getItemState(itemId) == ItemState.None);

        Items[itemId].balance += numTokens;
        require(token.transferFrom(msg.sender, this, numTokens));
    }


    /* VOTING FUNCTIONS */
    function voteCommit(uint itemId, bytes32 commitment)
        public
        onlyExistItem(itemId)
    {
        Item storage item = Items[itemId];

        if (item.votingId == 0) {
            item.votingId = newVoting(itemId);

            Votings[item.votingId].pollId = votingContract.startPoll(
                itemId,
                Votings[item.votingId].commitTtl,
                Votings[item.votingId].revealTtl,
                Votings[item.votingId].fixedFee,
                Votings[item.votingId].dynamicFeeRate,
                item.balance
            );
        }

        require(getVotingState(item.votingId) == VotingState.Commiting);

        Voting storage voting = Votings[item.votingId];
        voting.votersAddresses.push(msg.sender);

        voting.commissions += getFixedCommission(itemId);

        votingContract.commitVote(voting.pollId, commitment, msg.sender);
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

       VoterInfo storage voterInfo = voting.voters[msg.sender];
        voterInfo.stake = stake;
        voterInfo.direction = direction;

        votingContract.revealVote(voting.pollId, direction, stake, salt, msg.sender);

        stakesCounter++;

        avgStake = avgStake + (stake - 1) / stakesCounter;
    }

    function finishVoting(uint itemId)
        public
        onlyExistItem(itemId)
    {
        require(getItemState(itemId) == ItemState.Voting);
        require(getVotingState(Items[itemId].votingId) == VotingState.Finished);

        Voting storage voting = Votings[Items[itemId].votingId];

        uint votesUp;
        uint votesDown;
        (votesUp, votesDown) = votingContract.getPollResult(voting.pollId);

        uint direction = votesUp > votesDown ? 1 : 0;
        uint distance = votesUp > votesDown ? votesUp - votesDown : votesDown - votesUp;

        uint256 tmp;

        for (uint i = 0; i < voting.votersAddresses.length; i++) {
            (voting.voters[voting.votersAddresses[i]].prize, tmp, voting.voters[voting.votersAddresses[i]].isWinner) =
                votingContract.getWinnerPrize(voting.pollId, voting.votersAddresses[i]);

            voting.voters[voting.votersAddresses[i]].prize += tmp;

            if (!voting.voters[voting.votersAddresses[i]].isWinner)
                votingContract.withdrawStake(voting.pollId, voting.votersAddresses[i], voting.voters[voting.votersAddresses[i]].stake);
            else
                votingContract.withdrawStake(voting.pollId, voting.votersAddresses[i], 0);
        }

        tmp = newMoving(now, getUnstakeSpeed(), distance, direction, Items[itemId].votingId);

        Items[itemId].movingsIds.push(tmp);
        Items[itemId].votingId = 0;

        removeOldMovings(itemId);
    }

    function unstake(uint itemId)
        public
    {
        Item storage item = Items[itemId];

        for (uint i = 0; i < item.movingsIds.length; ++i) {
            Moving storage moving = Movings[item.movingsIds[i]];

            Voting storage voting = Votings[moving.votingId];

            if (voting.voters[msg.sender].stake != 0) {
                VoterInfo storage voterInfo = voting.voters[msg.sender];
                if (voterInfo.stake > voterInfo.unstaked) {
                    if ((now - moving.startTime) * moving.speed >= moving.distance) {
                        uint forTransfer = votingContract.withdrawStake(moving.votingId, msg.sender, voterInfo.stake - voterInfo.unstaked);
                        require(token.transfer(msg.sender, forTransfer));
                        item.balance -= forTransfer;
                        voterInfo.unstaked = voterInfo.stake;
                    }
                    else {
                        uint forUnstake = (voterInfo.stake / moving.distance) * moving.speed * (now - moving.startTime);

                        if (forUnstake > voterInfo.unstaked) {
                            uint forTransfer2 = votingContract.withdrawStake(moving.votingId, msg.sender, forUnstake - voterInfo.unstaked);
                            require(token.transfer(msg.sender, forTransfer2));
                            item.balance -= forTransfer2;
                            voterInfo.unstaked = forUnstake;
                        }
                    }
                }
            }
        }
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
        voting.unstakeSpeed = getUnstakeSpeed();
        voting.commitTtl = currentCommitTtl;
        voting.revealTtl = currentRevealTtl;
        voting.dynamicFeeRate = currentDynamicFeeRate;

        votingCount++;

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

    function removeOldMovings(uint itemId)
        internal
    {
        Item storage item = Items[itemId];

        for (uint i = 0; i < item.movingsIds.length; ++i) {
            Moving storage moving = Movings[item.movingsIds[i]];

            if ((now - moving.startTime) * moving.speed >= moving.distance) {
                withdrawForAllVoters(moving.votingId, itemId);

                if (moving.direction != 0)
                    item.lastRank += moving.distance;
                else
                    item.lastRank -= moving.distance;

                if (maxRank < item.lastRank)
                    maxRank = item.lastRank;

                delete Votings[moving.votingId];
                delete Movings[item.movingsIds[i]];
                item.movingsIds[i] = item.movingsIds[item.movingsIds.length - 1];
                item.movingsIds.length--;
                i--;
            }
        }
    }

    function withdrawForAllVoters(uint votingId, uint itemId)
        internal
    {
        Voting storage voting = Votings[votingId];
        Item storage item = Items[itemId];

        for (uint i = 0; i < voting.votersAddresses.length; ++i) {
            VoterInfo storage voter = voting.voters[voting.votersAddresses[i]];

            if (voter.stake > voter.unstaked) {
                uint forTransfer = votingContract.withdrawStake(votingId, voting.votersAddresses[i], voter.stake - voter.unstaked); 
                require(token.transfer(voting.votersAddresses[i], forTransfer));
                item.balance -= forTransfer;
                voter.unstaked = voter.stake;
            }
        }
    }
}
