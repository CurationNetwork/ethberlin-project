export default
[
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "INITIAL_SUPPLY",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseApproval",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseApproval",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "votingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "startTime",
        "type": "uint256"
      }
    ],
    "name": "VotingStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "votingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "VoteCommit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "votingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "direction",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "stake",
        "type": "uint256"
      }
    ],
    "name": "VoteReveal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "votingId",
        "type": "uint256"
      }
    ],
    "name": "VotingFinished",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "votingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "movingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "startTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "distance",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "direction",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "speed",
        "type": "uint256"
      }
    ],
    "name": "MovingStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "votingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "movingId",
        "type": "uint256"
      }
    ],
    "name": "MovingRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "votingContractAddress",
        "type": "address"
      },
      {
        "name": "dynamicFeeLinearRate_",
        "type": "uint256"
      },
      {
        "name": "dynamicFeeLinearPrecision_",
        "type": "uint256"
      },
      {
        "name": "maxOverStakeFactor_",
        "type": "uint256"
      },
      {
        "name": "maxFixedFeeRate_",
        "type": "uint256"
      },
      {
        "name": "maxFixedFeePrecision_",
        "type": "uint256"
      },
      {
        "name": "unstakeSpeed_",
        "type": "uint256"
      },
      {
        "name": "currentCommitTtl_",
        "type": "uint256"
      },
      {
        "name": "currentRevealTtl_",
        "type": "uint256"
      },
      {
        "name": "initialAvgStake_",
        "type": "uint256"
      }
    ],
    "name": "init",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "sqrt",
    "outputs": [
      {
        "name": "y",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "getItemState",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "votingId",
        "type": "uint256"
      }
    ],
    "name": "getVotingState",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "getFixedCommission",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "stake",
        "type": "uint256"
      }
    ],
    "name": "getDynamicCommission",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "getCurrentRank",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUnstakeSpeed",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getItems",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "getItem",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "lastRank",
        "type": "uint256"
      },
      {
        "name": "balance",
        "type": "uint256"
      },
      {
        "name": "votingId",
        "type": "uint256"
      },
      {
        "name": "movingsIds",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "votingId",
        "type": "uint256"
      }
    ],
    "name": "getVoting",
    "outputs": [
      {
        "name": "fixedFee",
        "type": "uint256"
      },
      {
        "name": "unstakeSpeed",
        "type": "uint256"
      },
      {
        "name": "commitTtl",
        "type": "uint256"
      },
      {
        "name": "revealTtl",
        "type": "uint256"
      },
      {
        "name": "startTime",
        "type": "uint256"
      },
      {
        "name": "totalPrize",
        "type": "uint256"
      },
      {
        "name": "votersAddresses",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "votingId",
        "type": "uint256"
      },
      {
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "getVoterInfo",
    "outputs": [
      {
        "name": "direction",
        "type": "uint256"
      },
      {
        "name": "stake",
        "type": "uint256"
      },
      {
        "name": "unstaked",
        "type": "uint256"
      },
      {
        "name": "prize",
        "type": "uint256"
      },
      {
        "name": "isWinner",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "movingId",
        "type": "uint256"
      }
    ],
    "name": "getMoving",
    "outputs": [
      {
        "name": "startTime",
        "type": "uint256"
      },
      {
        "name": "speed",
        "type": "uint256"
      },
      {
        "name": "distance",
        "type": "uint256"
      },
      {
        "name": "direction",
        "type": "uint256"
      },
      {
        "name": "votingId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "direction",
        "type": "uint256"
      },
      {
        "name": "stake",
        "type": "uint256"
      },
      {
        "name": "salt",
        "type": "uint256"
      }
    ],
    "name": "getCommitHash",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "desc",
        "type": "string"
      }
    ],
    "name": "newItem",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      },
      {
        "name": "numTokens",
        "type": "uint256"
      }
    ],
    "name": "chargeBalance",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      },
      {
        "name": "commitment",
        "type": "bytes32"
      }
    ],
    "name": "voteCommit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      },
      {
        "name": "direction",
        "type": "uint8"
      },
      {
        "name": "stake",
        "type": "uint256"
      },
      {
        "name": "salt",
        "type": "uint256"
      }
    ],
    "name": "voteReveal",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "finishVoting",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "unstake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "send",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "pay",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
