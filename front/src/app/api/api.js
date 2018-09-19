import { readContract, readContractFaucet } from '../../helpers/eth';
import { requestsConfig } from '../../../config/config';

import { address, faucetAddress } from '../../constants/constants.js';

export const getItemIds = () => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getItems', {})
    : new Promise((resolve, reject) => {
      resolve([1, 2, 3])
    })
}

export const getItem = (id) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getItem', [id])
    : new Promise((resolve, reject) => {
      switch (id) {
        case 1:
          resolve({
            name: 'Zoi',
            description: 'Best pussies in Berlin',
            owner: '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
            lastRank: 123,
            balance: 0,
            votingId: 1,
            movingsIds: [1],
          });
          break;

        case 2:
          resolve({
            name: 'Hoi',
            description: 'Best kitties in Berlin',
            owner: '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
            lastRank: 222,
            balance: 404,
            votingId: 0,
            movingsIds: [2],
          });
          break;

        case 3:
          resolve({
            name: 'Moi-toi',
            description: 'Best boom-boom in Berlin',
            owner: '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
            lastRank: 666,
            balance: 12,
            votingId: 3,
            movingsIds: [3],
          });
          break;

        default:
          break;
      }
    })
}

export const getVoting = (id) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getVoting', [id])
    : new Promise((resolve, reject) => {
      switch (id) {
        case 1:
          resolve({
            fixedFee: 45,
            dynamicFeeRate: 2,
            unstakeSpeed: 12,
            startTime: 1536419276,
            commitTtl: 100000,
            revealTtl: 100000,
            commissions: 56,
            votersAddresses: [
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0'
            ],
          });
          break;

        case 2:
          resolve({
            fixedFee: 45,
            dynamicFeeRate: 2,
            unstakeSpeed: 12,
            startTime: 1536419276,
            commitTtl: 100000,
            revealTtl: 100000,
            commissions: 56,
            votersAddresses: [
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0'
            ],
          });
          break;

        case 3:
          resolve({
            fixedFee: 45,
            dynamicFeeRate: 2,
            unstakeSpeed: 12,
            startTime: 1536419276,
            commitTtl: 10000,
            revealTtl: 50000,
            commissions: 56,
            votersAddresses: [
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
              '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0'
            ],
          });
          break;

        default:
          break;
      }
    })
}

export const getMoving = (id) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getMoving', [id])
    : new Promise((resolve, reject) => {
      switch (id) {
        case 1:
          resolve({
            startTime: 1536421276,
            speed: 20,
            distance: 1000,
            direction: 0,
            votingId: 1,
          });
          break;

        case 2:
          resolve({
            startTime: 1536421276,
            speed: 20,
            distance: 1000,
            direction: 0,
            votingId: 1,
          });
          break;

        case 3:
          resolve({
            startTime: 1536421276,
            speed: 20,
            distance: 1000,
            direction: 1,
            votingId: 1,
          });
          break;

        default:
          break;
      }
    })
}

export const getFlexComm = (stake) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getDynamicCommission', [stake])
    : new Promise((resolve, reject) => {
      resolve(12432321)
    })
}

export const getFixComm = (itemId) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getFixedCommission', [itemId])
    : new Promise((resolve, reject) => {
      resolve(13)
    })
}

export const sendNewItem = (name, desc) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'newItem', [name, desc])
    : new Promise((resolve, reject) => {
      resolve(true)
    })
}

export const commitVote = (itemId, hash) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'voteCommit', [itemId, hash])
    : new Promise((resolve, reject) => {
      resolve(true)
    })
}

export const getCommit = (direction, stake) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getCommitHash', [direction, stake, 0])
    : new Promise((resolve, reject) => {
      resolve(true)
    })
}

export const voteReveal = (itemId, direction, stake) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'voteReveal', [itemId, direction, stake, 0])
    : new Promise((resolve, reject) => {
      resolve(true)
    })
}

export const voteFinish = (itemId) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'finishVoting', [itemId])
    : new Promise((resolve, reject) => {
      resolve(true)
    })
}

export const getCurrentRank = (itemId) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'getCurrentRank', [itemId])
    : new Promise((resolve, reject) => {
      resolve(true)
    })
}

export const getBalance = (target) => {
  return !requestsConfig.USE_MOCK
    ? readContract(address, 'balanceOf', [target])
    : new Promise((resolve, reject) => {
      resolve(100)
    })
}

export const faucet = () => {
  return !requestsConfig.USE_MOCK
    ? readContractFaucet(faucetAddress, 'faucet', [])
    : new Promise((resolve, reject) => {
      resolve(true)
    })
}
