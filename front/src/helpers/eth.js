import abi from '../constants/Ranking.js';
import tokenAbi from '../constants/Token.js';

export let web3 = window.Web3 ? new window.Web3(window.web3.currentProvider) : undefined;

const address = '0xa79e596b452c89d0be35675d9f8ecf39a0a6e2fd';
const tokenAddress = '0xc4d079752947dffb8b38e76e4a3014497b6d476b';


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
  const func = (txHash, cb) =>
    web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
      if (receipt == null) {
        setTimeout(() => func(txHash, cb), 1000);
      } else {
        cb(receipt);
      }
    });

  return new Promise((resolve, reject) => {
    func(txHash, resolve);
  })
};


export const getTxReceipt = (txHash, cb) => {
  web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
    if (null == receipt) window.setTimeout(() => getTxReceipt(txHash, cb), 500);
    else {
      cb(receipt);
    }
  });
};


export const currentAccount = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, res) => {
      if (err)
        reject(err);
      resolve(res[0]);
    });
  });
}

export const getBalance = () => {
  const token = web3.eth.contract(tokenAbi.abi).at(tokenAddress);

  return new Promise((resolve, reject) => {
    try {
      currentAccount().then(account => {
        token['balanceOf']([account], (error, result) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(result.div("1000000000000000000").toString());
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}
