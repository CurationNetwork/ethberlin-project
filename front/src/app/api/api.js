export const getItemIds = () => {
  return new Promise((resolve, reject) => {
    resolve([1, 2, 3])
  })
}

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    resolve({
      name: 'Zoi',
      owner: '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
      lastRank: 123,
      balance: 145,
      votingId: 1,
      movingsIds: [],
    })
  })
}

export const getVoting = (id) => {
  return new Promise((resolve, reject) => {
    resolve({
      fixedFee: 45,
      dynamicFeeRate: 2, // multiple on stake = flex comm 
      unstakeSpeed: 12,
      commitTtl: 1536455276,
      revealTtl: 1536459276,
      startTime: 1536419276,
      commissions: 56,

      votersAddresses: ['0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
        '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0',
        '0x0e5f3ade12b0920ab43318cf7bef19cd823bf1c0'],
    })
  })
}