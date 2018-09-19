pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/ownership/Superuser.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './IVoting.sol';


contract Ranking is StandardToken, Superuser {

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
        uint _itemId,
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

    uint initialUnstakeSpeed;

    uint currentCommitTtl;
    uint currentRevealTtl;

    string public constant tokenName = "CurationToken";
    string public constant symbol = "CRN";
    uint8 public constant decimals = 18;

    uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(decimals));

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }

    function init(address votingContractAddress,
                uint dynamicFeeLinearRate_, uint dynamicFeeLinearPrecision_, uint maxOverStakeFactor_,
                uint maxFixedFeeRate_, uint maxFixedFeePrecision_, uint initialUnstakeSpeed_,
                uint currentCommitTtl_, uint currentRevealTtl_, uint initialAvgStake_
    )
        public
        onlyOwner
    {
        votingContract = IVoting(votingContractAddress);

        dynamicFeeLinearRate = dynamicFeeLinearRate_;
        dynamicFeeLinearPrecision = dynamicFeeLinearPrecision_;
        maxOverStakeFactor = maxOverStakeFactor_;

        maxFixedFeeRate = maxFixedFeeRate_;
        maxFixedFeePrecision = maxFixedFeePrecision_;

        initialUnstakeSpeed = initialUnstakeSpeed_;

        currentCommitTtl = currentCommitTtl_;
        currentRevealTtl = currentRevealTtl_;

        avgStake = initialAvgStake_;
    }


    /* MODIFIERS */
    modifier onlyExistItem(uint _itemId) {
        require(Items[_itemId].owner != address(0));
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

    modifier onlyItemOwner(uint _itemId) {
        require(Items[_itemId].owner == msg.sender);
        _;
    }

    modifier onlyFinishedVoting(uint votingId) {
        require(getVotingState(votingId) == VotingState.Finished);
        _;
    }

    /* PURE FUNCTIONS */
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

    function getCommitHash(uint _direction, uint _stake, uint _salt)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_direction, _stake, _salt));
    }

    function calculatePrize(uint _overallPrize, uint _overallStake, uint _voterStake)
        public
        pure
        returns (uint)
    {
        return _overallPrize.mul(_voterStake).div(_overallStake);
    }


    /* VIEW FUNCTIONS */
    function getItemState(uint _itemId)
        public
        view
        onlyExistItem(_itemId)
        returns (ItemState)
    {
        Item storage item = Items[_itemId];

        if (item.votingId == 0)
            return ItemState.None;
        else
            return ItemState.Voting;
    }

    function getVotingState(uint _votingId)
        public
        view
        onlyExistVoting(_votingId)
        returns (VotingState)
    {
        Voting storage voting = Votings[_votingId];

        if (voting.startTime + voting.commitTtl + voting.revealTtl < now)
            return VotingState.Finished;
        if (voting.startTime + voting.commitTtl < now)
            return VotingState.Revealing;

        return VotingState.Commiting;
    }

    function getFixedCommission(uint _itemId)
        public
        view
        onlyExistItem(_itemId)
        returns (uint)
    {
        uint maxFee = avgStake.mul(maxFixedFeeRate).div(maxFixedFeePrecision);
        uint itemRank = getCurrentRank(_itemId);

        if (itemRank >= maxRank)
            return maxFee;

        uint dRank = maxRank.sub(itemRank);

        return maxFee.sub(maxFee.mul(dRank).div(maxRank));
    }

    function getDynamicCommission(uint _stake)
        public
        view
        returns (uint)
    {
        if (_stake <= avgStake)
            return _stake.mul(dynamicFeeLinearRate).div(dynamicFeeLinearPrecision);

        uint overStake = _stake.sub(avgStake);
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

    function getCurrentRank(uint _itemId)
        public
        view
        onlyExistItem(_itemId)
        returns (uint)
    {
        Item storage item = Items[_itemId];

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
        return initialUnstakeSpeed;  //TODO dynamic change
    }

    function getItems()
        public
        view
        returns (uint[])
    {
        return ItemsIds;
    }

    function getItem(uint _itemId)
        public
        view
        onlyExistItem(_itemId)
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
        Item storage item = Items[_itemId];
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

    function getVoting(uint _votingId)
        public
        view
        onlyExistVoting(_votingId)
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
        Voting storage voting = Votings[_votingId];
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

    function getVoterInfo(uint _votingId, address _voter)
        public
        view
        onlyExistVoting(_votingId)
        returns (
            uint direction,
            uint stake,
            uint unstaked,
            uint prize,
            bool isWinner
        )
    {
        VoterInfo storage info = Votings[_votingId].voters[_voter];
        return (
            info.direction,
            info.stake,
            info.unstaked,
            info.prize,
            info.isWinner
        );
    }

    function getMoving(uint _movingId)
        public
        view
        onlyExistMoving(_movingId)
        returns (
            uint startTime,
            uint speed,
            uint distance,
            uint direction,
            uint votingId
        )
    {
        Moving storage moving = Movings[_movingId];
        return (
            moving.startTime,
            moving.speed,
            moving.distance,
            moving.direction,
            moving.votingId
        );
    }


    /* Only owner functions (only for testing period) */
    function newItemWithRank(string _name, string _desc, uint _rank)
        public
        onlySuperuser
    {
        Item storage item = Items[ItemsLastId];
        ItemsIds.push(ItemsLastId++);

        item.name = _name;
        item.description = _desc;
        item.owner = msg.sender;
        item.lastRank = _rank;
    }

    function setItemLastRank(uint _itemId, uint _rank)
        public
        onlySuperuser
        onlyExistItem(_itemId)
    {
        Item storage item = Items[_itemId];
        item.lastRank = _rank;
    }


    /* LISTING FUNCTIONS */
    function newItem(string _name, string _desc)
        public
    {
        Item storage item = Items[ItemsLastId];
        ItemsIds.push(ItemsLastId++);

        item.name = _name;
        item.description = _desc;
        item.owner = msg.sender;
    }

    function chargeBalance(uint _itemId, uint _numTokens)
        public
        onlyItemOwner(_itemId)
    {
        require(getItemState(_itemId) == ItemState.None);

        Items[_itemId].balance += _numTokens;
        require(pay(msg.sender, _numTokens));
    }


    /* VOTING FUNCTIONS */
    function voteCommit(uint _itemId, bytes32 _commitment)
        public
        onlyExistItem(_itemId)
    {
        Item storage item = Items[_itemId];

        if (item.votingId == 0) {
            item.votingId = newVoting(_itemId);

            emit VotingStarted(_itemId, item.votingId, now);
        }

        require(getVotingState(item.votingId) == VotingState.Commiting);
        Voting storage voting = Votings[item.votingId];

        require(pay(msg.sender, voting.fixedFee));
        voting.totalPrize = voting.totalPrize.add(voting.fixedFee);

        voting.votersAddresses.push(msg.sender);

        votingContract.commitVote(voting.pollId, _commitment, msg.sender);

        removeOldMovings(_itemId);

        emit VoteCommit(_itemId, item.votingId, msg.sender);
    }

    function voteReveal(uint _itemId, uint8 _direction, uint _stake, uint _salt)
        public
        onlyExistItem(_itemId)
    {
        Item storage item = Items[_itemId];
        require(getItemState(_itemId) == ItemState.Voting);
        require(getVotingState(item.votingId) == VotingState.Revealing);

        Voting storage voting = Votings[item.votingId];

        uint fee = getDynamicCommission(_itemId);
        require(pay(msg.sender, fee.add(_stake)));
        voting.totalPrize = voting.totalPrize.add(fee);

        VoterInfo storage voterInfo = voting.voters[msg.sender];
        voterInfo.stake = _stake;
        voterInfo.direction = _direction;

        votingContract.revealVote(voting.pollId, _direction, _stake, _salt, msg.sender);

        stakesCounter++;
        avgStake = avgStake.add(_stake - 1).div(stakesCounter);

        emit VoteReveal(_itemId, item.votingId, msg.sender, _direction, _stake);
    }

    function finishVoting(uint _itemId)
        public
        onlyExistItem(_itemId)
    {
        require(getItemState(_itemId) == ItemState.Voting);
        require(getVotingState(Items[_itemId].votingId) == VotingState.Finished);

        Item storage item = Items[_itemId];

        sendPrizesOrUnstake(item.votingId);

        Voting storage voting = Votings[item.votingId];

        uint votesUp;
        uint votesDown;
        (votesUp, votesDown) = votingContract.getPollResult(voting.pollId);

        uint _direction = votesUp > votesDown ? 1 : 0;
        uint distance = votesUp > votesDown ? votesUp - votesDown : votesDown - votesUp;

        uint movingId = newMoving(now, voting.unstakeSpeed, distance, _direction, item.votingId);
        item.movingsIds.push(movingId);
        item.votingId = 0;

        emit MovingStarted(_itemId, item.votingId, movingId, now, distance, _direction, voting.unstakeSpeed);

        emit VotingFinished(_itemId, item.votingId);
    }

    function unstake(uint _itemId)
        public
    {
        for (uint i = 0; i < Items[_itemId].movingsIds.length; ++i) {
            Moving storage moving = Movings[Items[_itemId].movingsIds[i]];

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
    function newVoting(uint _itemId)
        internal
        returns (uint)
    {
        uint votingId = VotingsLastId++;
        Voting storage voting = Votings[votingId];
        Item storage item = Items[_itemId];

        voting.startTime = now;
        voting.fixedFee = getFixedCommission(_itemId);
        voting.unstakeSpeed = getUnstakeSpeed();
        voting.commitTtl = currentCommitTtl;
        voting.revealTtl = currentRevealTtl;

        voting.totalPrize = item.balance;
        item.balance = 0;


        voting.pollId = votingContract.startPoll(
            _itemId,
            voting.commitTtl,
            voting.revealTtl
        );

        return votingId;
    }

    function newMoving(uint _startTime, uint _speed, uint _distance, uint _direction, uint _votingId)
        internal
        returns (uint)
    {
        uint movingId = MovingsLastId++;
        Moving storage moving = Movings[movingId];

        moving.startTime = _startTime;
        moving.speed = _speed;
        moving.distance = _distance;
        moving.direction = _direction;
        moving.votingId = _votingId;

        return movingId;
    }

    function removeOldMovings(uint _itemId)
        internal
    {
        Item storage item = Items[_itemId];

        for (uint i = 0; i < item.movingsIds.length; ++i) {
            Moving storage moving = Movings[item.movingsIds[i]];

            if (now.sub(moving.startTime).mul(moving.speed) >= moving.distance) {
                unstakeForAllVoters(moving.votingId);

                if (moving.direction != 0)
                    item.lastRank = item.lastRank.add(moving.distance);
                else
                    item.lastRank = item.lastRank.sub(moving.distance);

                if (maxRank < item.lastRank)
                    maxRank = item.lastRank;

                emit MovingRemoved(_itemId, moving.votingId, item.movingsIds[i]);

                delete Votings[moving.votingId];
                delete Movings[item.movingsIds[i]];

                item.movingsIds[i] = item.movingsIds[item.movingsIds.length - 1];
                item.movingsIds.length--;
                i--;
            }
        }
    }

    function unstakeForAllVoters(uint _votingId)
        internal
    {
        Voting storage voting = Votings[_votingId];

        for (uint i = 0; i < voting.votersAddresses.length; ++i) {
            VoterInfo storage voter = voting.voters[voting.votersAddresses[i]];

            if (voter.stake > voter.unstaked) {
                require(send(voting.votersAddresses[i], voter.stake.sub(voter.unstaked)));
                voter.unstaked = voter.stake;
            }
        }
    }

    function sendPrizesOrUnstake(uint _votingId)
        internal
    {
        Voting storage voting = Votings[_votingId];

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

    function send(address _to, uint256 _value)
        internal
        returns (bool)
    {
        require(_to != address(0));

        balances[this] = balances[this].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(this, _to, _value);
        return true;
    }

    function pay(address _from, uint256 _value)
        internal
        returns (bool)
    {
        require(_from != address(0));

        balances[_from] = balances[_from].sub(_value);
        balances[this] = balances[this].add(_value);
        emit Transfer(_from, this, _value);
        return true;
    }
}
