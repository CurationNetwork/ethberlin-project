const BigNumber = web3.BigNumber;
const { sha3 } = require('ethereumjs-util');
const { latestTime } = require('../node_modules/zeppelin-solidity/test/helpers/latestTime');
const { increaseTimeTo, duration } = require('../node_modules/zeppelin-solidity/test/helpers/increaseTime');
const abi = require('ethereumjs-abi')

const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();


const Voting = artifacts.require('Voting');
const Ranking = artifacts.require('Ranking');

function hash(dir, stake, salt) {
    return `0x${abi.soliditySHA3(['uint', 'uint', 'uint'], [dir, stake, salt]).toString('hex')}`;
}

contract('Ranking', function(accounts) {

    let voters = accounts.slice(2, 5);

    let rankingParams = [ 1, 100, 10, 10, 100, 1, 180, 180, 200 ];

    before(async function() {
        console.log("Deploy voting");
        this.voting = await Voting.new();
        console.log("Deploy ranking");
        this.ranking = await Ranking.new();

        console.log('Voting address:', this.voting.address);
        console.log('Ranking address:', this.ranking.address);

        console.log('Voters:', voters);

        let ts = await this.ranking.totalSupply();
        console.log('Token total supplly:', ts.toString());

        await this.ranking.transfer(voters[0], 1000);
        await this.ranking.transfer(voters[1], 1000);
        await this.ranking.transfer(voters[2], 1000);

//        await this.ranking.balanceOf(voters[1]).should.be.bignumber.equal(10000000000);

        await this.voting.init();
        await this.ranking.init(this.voting.address, ...rankingParams);
    });

    describe('full', function() {
        it('add items', async function() {
            await this.ranking.newItem('Kitty', 'Kitty');
            await this.ranking.newItem('Doggy', 'Doggy');
            await this.ranking.newItem('Cyclic', 'Cyclic');

            let itemIds = await this.ranking.getItems.call();

            let items = [];
            for (let i = 0; i < itemIds.length; i++)
                items.push(await this.ranking.getItem.call(itemIds[i]));

            console.log(items);
        });

        it('voting commit', async function() {

            let comm1 = await this.ranking.getCommitHash(0, 10, 0);
            let comm2 = await this.ranking.getCommitHash(1, 20, 0);
            let comm3 = await this.ranking.getCommitHash(1, 201, 0);

            await this.ranking.voteCommit(2, comm1, {from: voters[0]});
            await this.ranking.voteCommit(2, comm2, {from: voters[1]});
            await this.ranking.voteCommit(2, comm3, {from: voters[2]});

            let item = await this.ranking.getItem.call(2);
            let voting = await this.ranking.getVoting.call(item[5]);

            console.log(voting);
        });

        it('voting reveal', async function() {
            var currentTime = await latestTime();
            await increaseTimeTo(currentTime + duration.seconds(200));

            await this.ranking.voteReveal(2, 0, 10, 0, {from: voters[0]});
            await this.ranking.voteReveal(2, 1, 20, 0, {from: voters[1]});
            await this.ranking.voteReveal(2, 1, 201, 0, {from: voters[2]});

            let item = await this.ranking.getItem.call(2);
            let voting = await this.ranking.getVoting.call(item[5]);

            console.log(voting);

            for (let i = 0; i < voting[5].length; ++i) {
                let voterInfo = await this.ranking.getVoterInfo.call(item[5], voting[5][i]);

                console.log('Info for ', voting[5][i], ': ', voterInfo);
            }
        });

        it('finish voting', async function() {
            var currentTime = await latestTime();
            await increaseTimeTo(currentTime + duration.seconds(200));

            console.log(voters[0], 'balance:', await this.ranking.balanceOf(voters[0]));
            console.log(voters[1], 'balance:', await this.ranking.balanceOf(voters[1]));
            console.log(voters[2], 'balance:', await this.ranking.balanceOf(voters[2]));

            await this.ranking.finishVoting(2, {from: voters[0]});

            let item = await this.ranking.getItem.call(2);

            console.log('Item:', item);

            let moving = await this.ranking.getMoving.call(item[6][0]);

            console.log('Moving:', moving);

            let voting = await this.ranking.getVoting.call(moving[4]);

            console.log('Voting:', voting);

            for (let i = 0; i < voting[5].length; ++i) {
                let voterInfo = await this.ranking.getVoterInfo.call(moving[4], voting[5][i]);

                console.log('Info for ', voting[5][i], ': ', voterInfo);
            }

            console.log(voters[0], 'balance:', await this.ranking.balanceOf(voters[0]));
            console.log(voters[1], 'balance:', await this.ranking.balanceOf(voters[1]));
            console.log(voters[1], 'balance:', await this.ranking.balanceOf(voters[2]));
        });

        it('unstake', async function() {
            var currentTime = await latestTime();
            await increaseTimeTo(currentTime + duration.seconds(200));

            await this.ranking.unstake(2, {from: voters[1]});
            await this.ranking.unstake(2, {from: voters[2]});

            console.log(voters[0], 'balance:', await this.ranking.balanceOf(voters[0]));
            console.log(voters[1], 'balance:', await this.ranking.balanceOf(voters[1]));
            console.log(voters[2], 'balance:', await this.ranking.balanceOf(voters[2]));
        });
    });
})
