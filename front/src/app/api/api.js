export const getItemIds = () => {
  return new Promise((resolve, reject) => {
    resolve([1, 2, 3])
  })
}

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
      switch (id) {
        case 1:
          resolve({
            name: 'Zoi',
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
            owner: '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
            lastRank: 222,
            balance: 404,
            votingId: 2,
            movingsIds: [2],
          });
          break;

        case 3:
          resolve({
            name: 'Moi-toi',
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
  return new Promise((resolve, reject) => {
    switch (id) {
      case 1:
        resolve({
          fixedFee: 45,
          dynamicFeeRate: 2,
          unstakeSpeed: 12,
          startTime: 1536419276,
          commitTtl: 1000,
          revealTtl: 1000,
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
          commitTtl: 1000,
          revealTtl: 1000,
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
          commitTtl: 1000,
          revealTtl: 1000,
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
  return new Promise((resolve, reject) => {
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
          direction: 0,
          votingId: 1,
        });
        break;

      default:
        break;
    }
  })
}

export const getFlexComm = (stake) => {
  return new Promise((resolve, reject) => {
    resolve(12432321)
  })
}
