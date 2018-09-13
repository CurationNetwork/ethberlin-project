var Voting = artifacts.require("./Voting.sol");
var Ranking = artifacts.require("./Ranking.sol");

// currentDynamicFeeRate_, dynamicFeePrecision_, fixedFeeMax_, tMin_, unstakeSpeed0_,
// unstakeSpeedCoef_, currentCommitTtl_, currentRevealTtl_, avgStake_
const rankingParams = [ 100, 10000, 5, 300, 5, 2, 180, 180, 20 ];
const approveAmount = 1000000000;


module.exports = async function(deployer, network, accounts) {
    let voting, ranking;

    deployer.then(function() {
        return Voting.new();
    }).then(function(instance) {
        voting = instance;
        console.log('Voting:', voting.address);
        return Ranking.new();
    }).then(function(instance) {
        ranking = instance;
        console.log('Ranking:', ranking.address);

        return voting.init();
    }).then(function () {
        console.log('Voting init');
        return ranking.init(voting.address, ...rankingParams);
    }).then(async function () {
        console.log('Ranking init');

//        for (let i = 0; i < accounts.length; ++i)
//            await ranking.transfer(accounts[i], approveAmount);
    }).catch(e => console.log(e));

};
