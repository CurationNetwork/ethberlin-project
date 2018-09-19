pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './IVoting.sol';


contract Ranking is StandardToken {

    using SafeMath for uint;

    event VotingStarted(
        uint itemId,
        uint votingId,
        uint startTime
    );

    event VoteCommit(
        uint itemId,
        uint votingId,
        address voter
    );

    event VoteReveal(
        uint itemId,
        uint votingId,
        address voter,
        uint direction,
        uint stake
    );

    event VotingFinished(
        uint itemId,
        uint votingId
    );

    event MovingStarted(
        uint itemId,
        uint votingId,
        uint movingId,
        uint startTime,
        uint distance,
        uint direction,
        uint speed
    );

    event MovingRemoved(
        uint itemId,
        uint votingId,
        uint movingId
    );


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
        uint unstakeSpeed;
        uint commitTtl;
        uint revealTtl;
        uint startTime;
        uint totalPrize;
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


    uint stakesCounter = 1;
    uint maxRank;
    uint avgStake;

    IVoting votingContract;

    /* constants */
    uint dynamicFeeLinearRate;
    uint dynamicFeeLinearPrecision;
    uint maxOverStakeFactor;

    uint maxFixedFeeRate;
    uint maxFixedFeePrecision;

    uint unstakeSpeed;

    uint currentCommitTtl;
    uint currentRevealTtl;

    string public constant name = "CurationToken";
    string public constant symbol = "CRN";
    uint8 public constant decimals = 0;

    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }

    function init(address votingContractAddress,
                uint dynamicFeeLinearRate_, uint dynamicFeeLinearPrecision_, uint maxOverStakeFactor_,
                uint maxFixedFeeRate_, uint maxFixedFeePrecision_, uint unstakeSpeed_,
                uint currentCommitTtl_, uint currentRevealTtl_, uint initialAvgStake_
    )
        public
    {
        votingContract = IVoting(votingContractAddress);

        dynamicFeeLinearRate = dynamicFeeLinearRate_;
        dynamicFeeLinearPrecision = dynamicFeeLinearPrecision_;
        maxOverStakeFactor = maxOverStakeFactor_;

        maxFixedFeeRate = maxFixedFeeRate_;
        maxFixedFeePrecision = maxFixedFeePrecision_;

        unstakeSpeed = unstakeSpeed_;

        currentCommitTtl = currentCommitTtl_;
        currentRevealTtl = currentRevealTtl_;

        avgStake = initialAvgStake_;
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

    modifier onlyFinishedVoting(uint votingId) {
        require(getVotingState(votingId) == VotingState.Finished);
        _;
    }

    /* VIEW FUNCTIONS */
    function sqrt(uint x)
        public
        pure
        returns (uint y)
    {
        if (x == 0)
            return 0;
        else if (x <= 3)
            return 1;

        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

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
        uint maxFee = avgStake.mul(maxFixedFeeRate).div(maxFixedFeePrecision);
        uint itemRank = getCurrentRank(itemId);

        if (itemRank >= maxRank)
            return maxFee;

        uint dRank = maxRank.sub(itemRank);

        return maxFee.sub(maxFee.mul(dRank).div(maxRank));
    }

    function getDynamicCommission(uint stake)
        public
        view
        returns (uint)
    {
        if (stake <= avgStake)
            return stake.mul(dynamicFeeLinearRate).div(dynamicFeeLinearPrecision);

        uint overStake = stake.sub(avgStake);
        uint fee = avgStake.mul(dynamicFeeLinearRate).div(dynamicFeeLinearPrecision);

        uint k = 1;
        uint kPrecision = 1;
        uint max = sqrt(totalSupply_.sub(avgStake));
        uint x = maxOverStakeFactor.mul(avgStake);

        if (max > x)
            k = max.div(x);
        else
            kPrecision = x.div(max);

        return fee.add(k.mul(overStake).div(kPrecision) ** 2);
    }

    function getCurrentRank(uint itemId)
        public
        view
        onlyExistItem(itemId)
        returns (uint)
    {
        Item storage item = Items[itemId];

        uint rank = item.lastRank;

        for (uint i = 0; i < item.movingsIds.length; ++i) {
            Moving storage moving = Movings[item.movingsIds[i]];

            if (now.sub(moving.startTime).mul(moving.speed) >= moving.distance) {
                if (moving.direction != 0)
                    rank = rank.add(moving.distance);
                else
                    rank = rank.sub(moving.distance);
            }
            else {
                if (moving.direction != 0)
                    rank = rank.add(now.sub(moving.startTime).mul(moving.speed));
                else
                    rank = rank.sub(now.sub(moving.startTime).mul(moving.speed));
            }
        }

        return rank;
    }

    function getUnstakeSpeed()
        public
        view
        returns (uint)
    {
        return unstakeSpeed;  //TODO dynamic change
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
            uint unstakeSpeed,
            uint commitTtl,
            uint revealTtl,
            uint startTime,
            uint totalPrize,
            address[] votersAddresses
        )
    {
        Voting storage voting = Votings[votingId];
        return (
            voting.fixedFee,
            voting.unstakeSpeed,
            voting.commitTtl,
            voting.revealTtl,
            voting.startTime,
            voting.totalPrize,
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

    function getCommitHash(uint direction, uint stake, uint salt)
        public
        view
        returns (bytes32)
    {
        return sha3(direction, stake, salt);
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
        require(pay(msg.sender, numTokens));
    }


    /* VOTING FUNCTIONS */
    function voteCommit(uint itemId, bytes32 commitment)
        public
        onlyExistItem(itemId)
    {
        Item storage item = Items[itemId];

        if (item.votingId == 0) {
            item.votingId = newVoting(itemId);

            emit VotingStarted(itemId, item.votingId, now);
        }

        require(getVotingState(item.votingId) == VotingState.Commiting);
        Voting storage voting = Votings[item.votingId];

        require(pay(msg.sender, voting.fixedFee));
        voting.totalPrize.add(voting.fixedFee);

        voting.votersAddresses.push(msg.sender);

        votingContract.commitVote(voting.pollId, commitment, msg.sender);

        removeOldMovings(itemId);

        emit VoteCommit(itemId, item.votingId, msg.sender);
    }

    function voteReveal(uint itemId, uint8 direction, uint stake, uint salt)
        public
        onlyExistItem(itemId)
    {
        Item storage item = Items[itemId];
        require(getItemState(itemId) == ItemState.Voting);
        require(getVotingState(item.votingId) == VotingState.Revealing);

        Voting storage voting = Votings[item.votingId];

        uint fee = getDynamicCommission(itemId);
        require(pay(msg.sender, fee.add(stake)));
        voting.totalPrize += fee;

        VoterInfo storage voterInfo = voting.voters[msg.sender];
        voterInfo.stake = stake;
        voterInfo.direction = direction;

        votingContract.revealVote(voting.pollId, direction, stake, salt, msg.sender);

        stakesCounter++;
        avgStake = avgStake.add(stake - 1).div(stakesCounter);

        emit VoteReveal(itemId, item.votingId, msg.sender, direction, stake);
    }

    function finishVoting(uint itemId)
        public
        onlyExistItem(itemId)
    {
        require(getItemState(itemId) == ItemState.Voting);
        require(getVotingState(Items[itemId].votingId) == VotingState.Finished);

        Item storage item = Items[itemId];

        sendPrizesOrUnstake(item.votingId);

        Voting storage voting = Votings[item.votingId];

        uint votesUp;
        uint votesDown;
        (votesUp, votesDown) = votingContract.getPollResult(voting.pollId);

        uint direction = votesUp > votesDown ? 1 : 0;
        uint distance = votesUp > votesDown ? votesUp - votesDown : votesDown - votesUp;

        uint movingId = newMoving(now, voting.unstakeSpeed, distance, direction, item.votingId);
        item.movingsIds.push(movingId);
        item.votingId = 0;

        emit MovingStarted(itemId, item.votingId, movingId, now, distance, direction, voting.unstakeSpeed);

        emit VotingFinished(itemId, item.votingId);
    }

    function unstake(uint itemId)
        public
    {
        for (uint i = 0; i < Items[itemId].movingsIds.length; ++i) {
            Moving storage moving = Movings[Items[itemId].movingsIds[i]];

            if (Votings[moving.votingId].voters[msg.sender].stake != 0) {
                VoterInfo storage voterInfo = Votings[moving.votingId].voters[msg.sender];

                if (voterInfo.stake <= voterInfo.unstaked)
                    continue;

                if ((now.sub(moving.startTime)).mul(moving.speed) >= moving.distance) {
                    require(send(msg.sender, voterInfo.stake - voterInfo.unstaked));
                    voterInfo.unstaked = voterInfo.stake;
                }
                else {
                    uint movedDistance = now.sub(moving.startTime).mul(moving.speed);
                    uint forUnstake = voterInfo.stake.mul(movedDistance).div(moving.distance);

                    if (forUnstake > voterInfo.unstaked) {
                        require(send(msg.sender, forUnstake));
                        voterInfo.unstaked = forUnstake;
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
        Item storage item = Items[itemId];

        voting.startTime = now;
        voting.fixedFee = getFixedCommission(itemId);
        voting.unstakeSpeed = getUnstakeSpeed();
        voting.commitTtl = currentCommitTtl;
        voting.revealTtl = currentRevealTtl;

        voting.totalPrize = item.balance;
        item.balance = 0;


        voting.pollId = votingContract.startPoll(
            itemId,
            voting.commitTtl,
            voting.revealTtl
        );

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

            if (now.sub(moving.startTime).mul(moving.speed) >= moving.distance) {
                unstakeForAllVoters(moving.votingId, itemId);

                if (moving.direction != 0)
                    item.lastRank = item.lastRank.add(moving.distance);
                else
                    item.lastRank = item.lastRank.sub(moving.distance);

                if (maxRank < item.lastRank)
                    maxRank = item.lastRank;

                emit MovingRemoved(itemId, moving.votingId, item.movingsIds[i]);

                delete Votings[moving.votingId];
                delete Movings[item.movingsIds[i]];

                item.movingsIds[i] = item.movingsIds[item.movingsIds.length - 1];
                item.movingsIds.length--;
                i--;
            }
        }
    }

    function unstakeForAllVoters(uint votingId, uint itemId)
        internal
    {
        Voting storage voting = Votings[votingId];
        Item storage item = Items[itemId];

        for (uint i = 0; i < voting.votersAddresses.length; ++i) {
            VoterInfo storage voter = voting.voters[voting.votersAddresses[i]];

            if (voter.stake > voter.unstaked) {
                require(send(voting.votersAddresses[i], voter.stake.sub(voter.unstaked)));
                voter.unstaked = voter.stake;
            }
        }
    }

    function calculatePrize(uint overallPrize, uint overallStake, uint voterStake)
        internal
        returns (uint)
    {
        return overallPrize.mul(voterStake).div(overallStake);
    }

    function sendPrizesOrUnstake(uint votingId)
        internal
        onlyExistVoting(votingId)
        onlyFinishedVoting(votingId)
    {
        Voting storage voting = Votings[votingId];

        for (uint i = 0; i < voting.votersAddresses.length; ++i) {
            if (votingContract.isWinner(voting.pollId, voting.votersAddresses[i])) {
                uint prize = calculatePrize(voting.totalPrize,
                                            votingContract.getOverallStake(voting.pollId),
                                            voting.voters[voting.votersAddresses[i]].stake);

                voting.voters[voting.votersAddresses[i]].isWinner = true;
                require(send(voting.votersAddresses[i], prize));
            }
            else {
                if (voting.voters[voting.votersAddresses[i]].stake > 0) {
                    require(send(voting.votersAddresses[i], voting.voters[voting.votersAddresses[i]].stake));
                }
            }
        }
    }

    function send(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));

        // SafeMath.sub will throw if there is not enough balance.
        balances[this] = balances[this].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(this, _to, _value);
        return true;
    }

    function pay(address _from, uint256 _value) public returns (bool) {
        require(_from != address(0));

        // SafeMath.sub will throw if there is not enough balance.
        balances[_from] = balances[_from].sub(_value);
        balances[this] = balances[this].add(_value);
        Transfer(_from, this, _value);
        return true;
    }
}
