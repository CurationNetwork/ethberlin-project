const { ether } = require('../node_modules/zeppelin-solidity/test/helpers/ether');
const { ethGetBalance } = require('../node_modules/zeppelin-solidity/test/helpers/web3');
const { latestTime } = require('../node_modules/zeppelin-solidity/test/helpers/latestTime');
const { increaseTimeTo, duration } = require('../node_modules/zeppelin-solidity/test/helpers/increaseTime');
const { advanceBlock } = require('../node_modules/zeppelin-solidity/test/helpers/advanceToBlock');
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
    })

    describe('happy path vote', function() {
        it('start poll', async function() {
            var currentTime = await latestTime();
            console.log("Starting poll");
            const pollId = await this.voting.startPoll.call(0, 1000, 2000, 1, 1, 100);

            await this.voting.startPoll(0, 1000, 2000, 1, 1, 100);
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
            await this.voting.commitVote(utils.bn(pollId), secretVoter1, {from: voter1});
            console.log(`Commit second vote ${secretVoter2}`);
            await this.voting.commitVote(utils.bn(pollId), secretVoter2, {from: voter2});

            await increaseTimeTo(currentTime + duration.seconds(1001));

            console.log(`Reveal first vote ${secretVoter1}`);

            await this.voting.revealVote(utils.bn(pollId), utils.bn(1), utils.bn(10000), utils.bn(salt), {from: voter1});
            console.log(`Reveal second vote ${secretVoter2}`);

            await this.voting.revealVote(utils.bn(pollId), utils.bn(0), utils.bn(1000), utils.bn(salt), {from: voter2});

            await increaseTimeTo(currentTime + duration.seconds(1001));

            var result = await this.voting.result.call(pollId);

            result.should.be.bignumber.equal(1);

            

            await this.voting.comitVote()
            
            //(await this.voting.pollExists(0)).should.be.equal(false);
        })
    })
})