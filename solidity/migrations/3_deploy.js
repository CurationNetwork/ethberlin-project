var Voting = artifacts.require("./Voting.sol");
var Ranking = artifacts.require("./Ranking.sol");
var Faucet = artifacts.require("./Faucet.sol");

// dynamicFeeLinearRate, dynamicFeeLinearPrecision, maxOverStakeFactor,
// maxFixedFeeRate, maxFixedFeePrecision, unstakeSpeed,
// currentCommitTtl, currentRevealTtl, initialAvgStake
const rankingParams = [ 1, 100, 10, 10, 100, 1, 180, 180, 200 ];
const totalSupply = '10000';


module.exports = async function(deployer, network, accounts) {
    let voting, ranking, faucet;

    deployer.then(function() {
        return Voting.new();
    }).then(function(instance) {
        voting = instance;
        console.log('Voting:', voting.address);

        return Ranking.new();
    }).then(function(instance) {
        ranking = instance;
        console.log('Ranking:', ranking.address);

        return Faucet.new();
    }).then(function(instance) {
        faucet = instance;
        console.log('Faucet:', faucet.address);

        return voting.init();
    }).then(function () {
        console.log('Voting inited');

        return ranking.init(voting.address, ...rankingParams);
    }).then(async function () {
        console.log('Ranking inited');

        return faucet.init(ranking.address);
    }).then(async function () {
        console.log('Faucet inited');

        return ranking.transfer(faucet.address, totalSupply);
    }).then(async function () {
        console.log('Faucet charged');
    })
    .catch(e => console.log(e));

};
