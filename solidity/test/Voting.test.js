const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Voting = artifacts.require('Voting');
const Token = artifacts.require('StandardToken');

contract('Voting', function([_, owner]) {
    beforeEach(async function(){
        console.log("Deploy token");
        this.token = await Token.new();
        console.log("Deploy voting");
        this.voting = await Voting.new();
    })

    describe('i can run test', function() {
        it('woo', async function() {
            (await this.voting.pollExists(0)).should.be.equal(false);
        })
    })
})