import abi from '../constants/Ranking.js';

export let web3 = window.Web3 ? new window.Web3(window.web3.currentProvider) : undefined;

const address = '0xfc3e510ae60ce7a72845ff1ad59226be862731cb';


export const sendTransaction = (contractAddress) => {
  let value;

  const transactionParameters = {
    // value: ???,     // amount of ether to send with
    // gas: ???,       // amount of gas
    gasPrice: 5e9,
  };

  return new Promise((resolve, reject) => {
    try {
      web3.eth.sendTransaction({
        ...transactionParameters,
        value,

        to: address,
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const readContract = (contractAddress, funcName, params) => {
  const сtorDapp = web3.eth.contract(abi.abi).at(contractAddress);

  return new Promise((resolve, reject) => {
    try {
      сtorDapp[funcName](...params, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const waitTransaction = (txHash) => {

  return new Promise((resolve, reject) => {




    const func = () => web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
      if (null == receipt) { }
      window.setTimeout(() => getTxReceipt(txHash), 500);
      else {
  cb(receipt);
}
    });

  })
};