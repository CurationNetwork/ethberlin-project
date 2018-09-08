const { ether } = require('../node_modules/zeppelin-solidity/test/helpers/ether');
const { ethGetBalance } = require('../node_modules/zeppelin-solidity/test/helpers/web3');
const { latestTime } = require('../node_modules/zeppelin-solidity/test/helpers/latestTime');
const { increaseTimeTo, duration } = require('../node_modules/zeppelin-solidity/test/helpers/increaseTime');
const { advanceBlock } = require('../node_modules/zeppelin-solidity/test/helpers/advanceToBlock');
const { expectThrow } = require('../node_modules/zeppelin-solidity/test/helpers/expectThrow');
const { EVMRevert } = require('../node_modules/zeppelin-solidity/test/helpers/EVMRevert');


const abi = require('ethereumjs-abi')


const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Voting = artifacts.require('Voting');
const Token = artifacts.require('SimpleToken');
const utils = {
createVoteHash: (vote, stake, salt) => {
    const hash = `0x${abi.soliditySHA3(['uint', 'uint', 'uint'],
      [vote, stake, salt]).toString('hex')}`;
    return hash;
  },
  bn: (n) => {
      return new BigNumber(n);
  }
}

contract('Voting', function([_, owner, voter1, voter2]) {
    beforeEach(async function(){
        await advanceBlock()
        console.log("Deploy token");
        this.token = await Token.new();
        console.log("Deploy voting");
        this.voting = await Voting.new();
        console.log("Init voting contract");

        await this.voting.init(this.token.address, owner);
        console.log("Transfer tokens")
        await this.token.transfer(voter1, 100000000);
        await this.token.transfer(voter2, 100000000);
        await this.token.approve(this.voting.address, 1000000000, {from: voter1});
        await this.token.approve(this.voting.address, 1000000000, {from: voter2});
    })

    describe('happy path vote', function() {
        it('start poll', async function() {
            var currentTime = await latestTime();
            console.log("Starting poll");
            const pollId = await this.voting.startPoll.call(0, 1000, 2000, 100, 1000, 1000);

            await this.voting.startPoll(0, 1000, 2000, 100, 1000, 1000);
            await increaseTimeTo(currentTime + duration.seconds(100));

            pollId.should.be.bignumber.equal(1);
            
            const pollExists = await this.voting.pollExists.call(new BigNumber(1));
            pollExists.should.be.equal(true);

            const pollExpired = await this.voting.isExpired.call(currentTime + duration.seconds(1000));
            pollExpired.should.be.equal(false);

            var salt = 0;
            var secretVoter1 = utils.createVoteHash(1, 10000, salt);
            var secretVoter2 = utils.createVoteHash(0, 1000, salt);
           
            console.log(`Commit first vote ${secretVoter1}`);
            await this.voting.commitVote(utils.bn(pollId), secretVoter1, voter1);
            console.log(`Commit second vote ${secretVoter2}`);
            await this.voting.commitVote(utils.bn(pollId), secretVoter2, voter2);

            await increaseTimeTo(currentTime + duration.seconds(1001));

            console.log(`Reveal first vote ${secretVoter1}`);

            await this.voting.revealVote(utils.bn(pollId), utils.bn(1), utils.bn(10000), utils.bn(salt),  voter1);
            console.log(`Reveal second vote ${secretVoter2}`);

            await this.voting.revealVote(utils.bn(pollId), utils.bn(0), utils.bn(1000), utils.bn(salt), voter2);

            await increaseTimeTo(currentTime + duration.seconds(4001));
            console.log("Try get result");
            var result = await this.voting.result.call(utils.bn(pollId));

            result.should.be.bignumber.equal(1);
            console.log("Withdraw stake");
            var bonus = await this.voting.withdrawStake.call(utils.bn(pollId), voter1, utils.bn(10000));
            var prize = await this.voting.getWinnerPrize.call(utils.bn(pollId), voter1);
            prize[0].should.be.bignumber.equal(1181);
            prize[1].should.be.bignumber.equal(909);
            prize[2].should.be.equal(true);

            var loserPrize = await this.voting.getWinnerPrize.call(utils.bn(pollId), voter2);
            loserPrize[1].should.be.bignumber.equal(0);
            loserPrize[2].should.be.equal(false);

           
            bonus.should.be.bignumber.gt(0);

            var balance = await this.token.balanceOf.call(voter1);
            console.log(balance.toString());

            await this.voting.withdrawStake(utils.bn(pollId), voter1, utils.bn(10000));


            await expectThrow(
                this.voting.withdrawStake(utils.bn(pollId), voter1, utils.bn(1)), 
                EVMRevert
            );
            await this.voting.withdrawStake(utils.bn(pollId), voter2, utils.bn(1000));

            await expectThrow(
                this.voting.withdrawStake(utils.bn(pollId), voter2, utils.bn(1)), 
                EVMRevert
            );

            balance = await this.token.balanceOf.call(voter1);
            console.log(balance.toString());
            balance.should.be.bignumber.equal(100000081);

        
        })
    })
})