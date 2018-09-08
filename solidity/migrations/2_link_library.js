const Voting = artifacts.require('./Voting.sol');
const DLL = artifacts.require('dll/DLL.sol');
const AttributeStore = artifacts.require('attrstore/AttributeStore.sol');

module.exports = (deployer) => {
  // deploy libraries
  deployer.deploy(AttributeStore);

  // link libraries
  deployer.link(AttributeStore, Voting);

};