const BigNumber = web3.BigNumber;
const { sha3 } = require('ethereumjs-util');
const abi = require('ethereumjs-abi')

const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();


const Voting = artifacts.require('Voting');
const Ranking = artifacts.require('Ranking');
const Token = artifacts.require('SimpleToken');

function hash(dir, stake, salt) {
    return `0x${abi.soliditySHA3(['uint', 'uint', 'uint'], [dir, stake, salt]).toString('hex')}`;
}

contract('Ranking', function(accounts) {

    let fund = accounts[1];
    let voters = accounts.slice(2, 5);

    let rankingParams = [ 10, 10000, 20000, 300, 5, 10, 180, 180 ];

    before(async function() {
        console.log("Deploy token");
        this.token = await Token.new();
        console.log("Deploy voting");
        this.voting = await Voting.new();
        console.log("Deploy ranking");
        this.ranking = await Ranking.new();

        console.log('Token address:', this.token.address);
        console.log('Voting address:', this.voting.address);
        console.log('Ranking address:', this.ranking.address);
        console.log('Fund address:', fund);

        console.log('Voters:', voters);

        let ts = await this.token.totalSupply();
        console.log('Token total supplly:', ts.toString());

        await this.token.approve(this.voting.address, 1000000000, { from: voters[0] });
        await this.token.approve(this.voting.address, 1000000000, { from: voters[1] });
        await this.token.approve(this.voting.address, 1000000000, { from: voters[2] });

        await this.token.approve(this.ranking.address, 1000000000, { from: voters[0] });
        await this.token.approve(this.ranking.address, 1000000000, { from: voters[1] });
        await this.token.approve(this.ranking.address, 1000000000, { from: voters[2] });

        await this.token.transfer(voters[0], 10000000000);
        await this.token.transfer(voters[1], 10000000000);
        await this.token.transfer(voters[2], 10000000000);

//        await this.token.balanceOf(voters[1]).should.be.bignumber.equal(10000000000);

        await this.voting.init(this.token.address, fund);
        await this.ranking.init(this.voting.address, this.token.address, ...rankingParams);
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

        it('voting', async function() {
            let itemIds = await this.ranking.getItems.call();

            await this.ranking.voteCommit(2, hash(0, 10, 0), {from: voters[0]});

            let item = await this.ranking.getItem.call(2);

            console.log(item);
        });
    });
})
