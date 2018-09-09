export default
{
  "contractName": "SimpleToken",
  "abi": [
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
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
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
      "name": "burnFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
          "indexed": true,
          "name": "burner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Burn",
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
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50601260ff16600a0a61271002600181905550601260ff16600a0a612710026000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef601260ff16600a0a612710026040518082815260200191505060405180910390a3611660806100f16000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100d5578063095ea7b31461016557806318160ddd146101ca57806323b872dd146101f55780632ff2e9dc1461027a578063313ce567146102a557806342966c68146102d6578063661884631461030357806370a082311461036857806379cc6790146103bf57806395d89b411461040c578063a9059cbb1461049c578063d73dd62314610501578063dd62ed3e14610566575b600080fd5b3480156100e157600080fd5b506100ea6105dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012a57808201518184015260208101905061010f565b50505050905090810190601f1680156101575780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017157600080fd5b506101b0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610616565b604051808215151515815260200191505060405180910390f35b3480156101d657600080fd5b506101df610708565b6040518082815260200191505060405180910390f35b34801561020157600080fd5b50610260600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610712565b604051808215151515815260200191505060405180910390f35b34801561028657600080fd5b5061028f610acd565b6040518082815260200191505060405180910390f35b3480156102b157600080fd5b506102ba610adc565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102e257600080fd5b5061030160048036038101908080359060200190929190505050610ae1565b005b34801561030f57600080fd5b5061034e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610aee565b604051808215151515815260200191505060405180910390f35b34801561037457600080fd5b506103a9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d80565b6040518082815260200191505060405180910390f35b3480156103cb57600080fd5b5061040a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dc8565b005b34801561041857600080fd5b50610421610f70565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610461578082015181840152602081019050610446565b50505050905090810190601f16801561048e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104a857600080fd5b506104e7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610fa9565b604051808215151515815260200191505060405180910390f35b34801561050d57600080fd5b5061054c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506111c9565b604051808215151515815260200191505060405180910390f35b34801561057257600080fd5b506105c7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506113c5565b6040518082815260200191505060405180910390f35b6040805190810160405280600b81526020017f53696d706c65546f6b656e00000000000000000000000000000000000000000081525081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561076157600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156107ec57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561082857600080fd5b610879826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061090c826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461146590919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506109dd82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b601260ff16600a0a6127100281565b601281565b610aeb3382611481565b50565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610c00576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c94565b610c13838261144c90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548111151515610e5357600080fd5b610ee281600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610f6c8282611481565b5050565b6040805190810160405280600381526020017f53494d000000000000000000000000000000000000000000000000000000000081525081565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610ff857600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561103457600080fd5b611085826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611118826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461146590919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061125a82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461146590919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600082821115151561145a57fe5b818303905092915050565b6000818301905082811015151561147857fe5b80905092915050565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481111515156114ce57600080fd5b61151f816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506115768160015461144c90919063ffffffff16565b6001819055508173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5826040518082815260200191505060405180910390a2600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a350505600a165627a7a72305820f7970f496090a21f0685898d0ff555407c5510f7c34c90b2c22217b1d647f33c0029",
  "deployedBytecode": "0x6080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100d5578063095ea7b31461016557806318160ddd146101ca57806323b872dd146101f55780632ff2e9dc1461027a578063313ce567146102a557806342966c68146102d6578063661884631461030357806370a082311461036857806379cc6790146103bf57806395d89b411461040c578063a9059cbb1461049c578063d73dd62314610501578063dd62ed3e14610566575b600080fd5b3480156100e157600080fd5b506100ea6105dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012a57808201518184015260208101905061010f565b50505050905090810190601f1680156101575780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017157600080fd5b506101b0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610616565b604051808215151515815260200191505060405180910390f35b3480156101d657600080fd5b506101df610708565b6040518082815260200191505060405180910390f35b34801561020157600080fd5b50610260600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610712565b604051808215151515815260200191505060405180910390f35b34801561028657600080fd5b5061028f610acd565b6040518082815260200191505060405180910390f35b3480156102b157600080fd5b506102ba610adc565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102e257600080fd5b5061030160048036038101908080359060200190929190505050610ae1565b005b34801561030f57600080fd5b5061034e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610aee565b604051808215151515815260200191505060405180910390f35b34801561037457600080fd5b506103a9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d80565b6040518082815260200191505060405180910390f35b3480156103cb57600080fd5b5061040a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dc8565b005b34801561041857600080fd5b50610421610f70565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610461578082015181840152602081019050610446565b50505050905090810190601f16801561048e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104a857600080fd5b506104e7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610fa9565b604051808215151515815260200191505060405180910390f35b34801561050d57600080fd5b5061054c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506111c9565b604051808215151515815260200191505060405180910390f35b34801561057257600080fd5b506105c7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506113c5565b6040518082815260200191505060405180910390f35b6040805190810160405280600b81526020017f53696d706c65546f6b656e00000000000000000000000000000000000000000081525081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561076157600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156107ec57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561082857600080fd5b610879826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061090c826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461146590919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506109dd82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b601260ff16600a0a6127100281565b601281565b610aeb3382611481565b50565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610c00576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c94565b610c13838261144c90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548111151515610e5357600080fd5b610ee281600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610f6c8282611481565b5050565b6040805190810160405280600381526020017f53494d000000000000000000000000000000000000000000000000000000000081525081565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610ff857600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561103457600080fd5b611085826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611118826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461146590919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061125a82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461146590919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600082821115151561145a57fe5b818303905092915050565b6000818301905082811015151561147857fe5b80905092915050565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481111515156114ce57600080fd5b61151f816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144c90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506115768160015461144c90919063ffffffff16565b6001819055508173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5826040518082815260200191505060405180910390a2600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a350505600a165627a7a72305820f7970f496090a21f0685898d0ff555407c5510f7c34c90b2c22217b1d647f33c0029",
  "sourceMap": "429:532:4:-;;;781:177;8:9:-1;5:2;;;30:1;27;20:12;5:2;781:177:4;607:2;672:17;;666:2;:23;657:5;:33;812:12;:29;;;;607:2;672:17;;666:2;:23;657:5;:33;851:8;:20;860:10;851:20;;;;;;;;;;;;;;;:37;;;;924:10;903:48;;920:1;903:48;;;607:2;672:17;;666:2;:23;657:5;:33;903:48;;;;;;;;;;;;;;;;;;429:532;;;;;;",
  "deployedSourceMap": "429:532:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;482:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;482:43:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;482:43:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1814:188:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1814:188:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;389:83:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;389:83:9;;;;;;;;;;;;;;;;;;;;;;;726:470:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;726:470:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;616:74:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;616:74:4;;;;;;;;;;;;;;;;;;;;;;;574:35;;8:9:-1;5:2;;;30:1;27;20:12;5:2;574:35:4;;;;;;;;;;;;;;;;;;;;;;;;;;;353:73:10;;8:9:-1;5:2;;;30:1;27;20:12;5:2;353:73:10;;;;;;;;;;;;;;;;;;;;;;;;;;3679:432:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3679:432:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1149:99:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1149:99:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;490:370:13;;8:9:-1;5:2;;;30:1;27;20:12;5:2;490:370:13;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;531:37:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;531:37:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;531:37:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;626:321:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;626:321:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2926:296:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2926:296:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2321:153;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2321:153:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;482:43:4;;;;;;;;;;;;;;;;;;;;:::o;1814:188:14:-;1881:4;1925:6;1893:7;:19;1901:10;1893:19;;;;;;;;;;;;;;;:29;1913:8;1893:29;;;;;;;;;;;;;;;:38;;;;1963:8;1942:38;;1951:10;1942:38;;;1973:6;1942:38;;;;;;;;;;;;;;;;;;1993:4;1986:11;;1814:188;;;;:::o;389:83:9:-;433:7;455:12;;448:19;;389:83;:::o;726:470:14:-;832:4;864:8;:15;873:5;864:15;;;;;;;;;;;;;;;;854:6;:25;;846:34;;;;;;;;904:7;:14;912:5;904:14;;;;;;;;;;;;;;;:26;919:10;904:26;;;;;;;;;;;;;;;;894:6;:36;;886:45;;;;;;;;960:1;945:17;;:3;:17;;;;937:26;;;;;;;;988:27;1008:6;988:8;:15;997:5;988:15;;;;;;;;;;;;;;;;:19;;:27;;;;:::i;:::-;970:8;:15;979:5;970:15;;;;;;;;;;;;;;;:45;;;;1037:25;1055:6;1037:8;:13;1046:3;1037:13;;;;;;;;;;;;;;;;:17;;:25;;;;:::i;:::-;1021:8;:13;1030:3;1021:13;;;;;;;;;;;;;;;:41;;;;1097:38;1128:6;1097:7;:14;1105:5;1097:14;;;;;;;;;;;;;;;:26;1112:10;1097:26;;;;;;;;;;;;;;;;:30;;:38;;;;:::i;:::-;1068:7;:14;1076:5;1068:14;;;;;;;;;;;;;;;:26;1083:10;1068:26;;;;;;;;;;;;;;;:67;;;;1162:3;1146:28;;1155:5;1146:28;;;1167:6;1146:28;;;;;;;;;;;;;;;;;;1187:4;1180:11;;726:470;;;;;:::o;616:74:4:-;607:2;672:17;;666:2;:23;657:5;:33;616:74;:::o;574:35::-;607:2;574:35;:::o;353:73:10:-;396:25;402:10;414:6;396:5;:25::i;:::-;353:73;:::o;3679:432:14:-;3785:4;3799:16;3818:7;:19;3826:10;3818:19;;;;;;;;;;;;;;;:29;3838:8;3818:29;;;;;;;;;;;;;;;;3799:48;;3877:8;3857:16;:28;;3853:165;;;3927:1;3895:7;:19;3903:10;3895:19;;;;;;;;;;;;;;;:29;3915:8;3895:29;;;;;;;;;;;;;;;:33;;;;3853:165;;;3981:30;3994:16;3981:8;:12;;:30;;;;:::i;:::-;3949:7;:19;3957:10;3949:19;;;;;;;;;;;;;;;:29;3969:8;3949:29;;;;;;;;;;;;;;;:62;;;;3853:165;4049:8;4028:61;;4037:10;4028:61;;;4059:7;:19;4067:10;4059:19;;;;;;;;;;;;;;;:29;4079:8;4059:29;;;;;;;;;;;;;;;;4028:61;;;;;;;;;;;;;;;;;;4102:4;4095:11;;3679:432;;;;;:::o;1149:99:9:-;1205:7;1227:8;:16;1236:6;1227:16;;;;;;;;;;;;;;;;1220:23;;1149:99;;;:::o;490:370:13:-;570:7;:14;578:5;570:14;;;;;;;;;;;;;;;:26;585:10;570:26;;;;;;;;;;;;;;;;560:6;:36;;552:45;;;;;;;;791:38;822:6;791:7;:14;799:5;791:14;;;;;;;;;;;;;;;:26;806:10;791:26;;;;;;;;;;;;;;;;:30;;:38;;;;:::i;:::-;762:7;:14;770:5;762:14;;;;;;;;;;;;;;;:26;777:10;762:26;;;;;;;;;;;;;;;:67;;;;835:20;841:5;848:6;835:5;:20::i;:::-;490:370;;:::o;531:37:4:-;;;;;;;;;;;;;;;;;;;;:::o;626:321:9:-;689:4;719:8;:20;728:10;719:20;;;;;;;;;;;;;;;;709:6;:30;;701:39;;;;;;;;769:1;754:17;;:3;:17;;;;746:26;;;;;;;;802:32;827:6;802:8;:20;811:10;802:20;;;;;;;;;;;;;;;;:24;;:32;;;;:::i;:::-;779:8;:20;788:10;779:20;;;;;;;;;;;;;;;:55;;;;856:25;874:6;856:8;:13;865:3;856:13;;;;;;;;;;;;;;;;:17;;:25;;;;:::i;:::-;840:8;:13;849:3;840:13;;;;;;;;;;;;;;;:41;;;;913:3;892:33;;901:10;892:33;;;918:6;892:33;;;;;;;;;;;;;;;;;;938:4;931:11;;626:321;;;;:::o;2926:296:14:-;3027:4;3081:46;3115:11;3081:7;:19;3089:10;3081:19;;;;;;;;;;;;;;;:29;3101:8;3081:29;;;;;;;;;;;;;;;;:33;;:46;;;;:::i;:::-;3041:7;:19;3049:10;3041:19;;;;;;;;;;;;;;;:29;3061:8;3041:29;;;;;;;;;;;;;;;:87;;;;3160:8;3139:61;;3148:10;3139:61;;;3170:7;:19;3178:10;3170:19;;;;;;;;;;;;;;;:29;3190:8;3170:29;;;;;;;;;;;;;;;;3139:61;;;;;;;;;;;;;;;;;;3213:4;3206:11;;2926:296;;;;:::o;2321:153::-;2420:7;2444;:15;2452:6;2444:15;;;;;;;;;;;;;;;:25;2460:8;2444:25;;;;;;;;;;;;;;;;2437:32;;2321:153;;;;:::o;1060:116:8:-;1120:7;1148:2;1142;:8;;1135:16;;;;;;1169:2;1164;:7;1157:14;;1060:116;;;;:::o;1238:128::-;1298:9;1324:2;1319;:7;1315:11;;1344:2;1339:1;:7;;1332:15;;;;;;1360:1;1353:8;;1238:128;;;;:::o;430:438:10:-;508:8;:14;517:4;508:14;;;;;;;;;;;;;;;;498:6;:24;;490:33;;;;;;;;718:26;737:6;718:8;:14;727:4;718:14;;;;;;;;;;;;;;;;:18;;:26;;;;:::i;:::-;701:8;:14;710:4;701:14;;;;;;;;;;;;;;;:43;;;;765:24;782:6;765:12;;:16;;:24;;;;:::i;:::-;750:12;:39;;;;805:4;800:18;;;811:6;800:18;;;;;;;;;;;;;;;;;;852:1;829:34;;838:4;829:34;;;856:6;829:34;;;;;;;;;;;;;;;;;;430:438;;:::o",
  "source": "pragma solidity ^0.4.24;\n\n\nimport \"zeppelin-solidity/contracts/token/ERC20/StandardToken.sol\";\nimport \"zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol\";\n\n    /**\n    * @title SimpleToken\n    * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.\n    * Note they can later distribute these tokens as they wish using `transfer` and other\n    * `StandardToken` functions.\n    */\ncontract SimpleToken is StandardBurnableToken {\n\n    string public constant name = \"SimpleToken\";\n    string public constant symbol = \"SIM\";\n    uint8 public constant decimals = 18;\n\n    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));\n\n    /**\n    * @dev Constructor that gives msg.sender all of existing tokens.\n    */\n    constructor() public {\n        totalSupply_ = INITIAL_SUPPLY;\n        balances[msg.sender] = INITIAL_SUPPLY;\n        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);\n    }\n\n}",
  "sourcePath": "/home/algys/sources/tcr-hack/solidity/contracts/examples/SimpleToken.sol",
  "ast": {
    "absolutePath": "/home/algys/sources/tcr-hack/solidity/contracts/examples/SimpleToken.sol",
    "exportedSymbols": {
      "SimpleToken": [
        3223
      ]
    },
    "id": 3224,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3175,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "id": 3176,
        "nodeType": "ImportDirective",
        "scope": 3224,
        "sourceUnit": 4283,
        "src": "27:67:4",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol",
        "id": 3177,
        "nodeType": "ImportDirective",
        "scope": 3224,
        "sourceUnit": 4036,
        "src": "95:75:4",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 3178,
              "name": "StandardBurnableToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4035,
              "src": "453:21:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardBurnableToken_$4035",
                "typeString": "contract StandardBurnableToken"
              }
            },
            "id": 3179,
            "nodeType": "InheritanceSpecifier",
            "src": "453:21:4"
          }
        ],
        "contractDependencies": [
          3839,
          3910,
          3953,
          3985,
          4035,
          4282
        ],
        "contractKind": "contract",
        "documentation": "@title SimpleToken\n@dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.\nNote they can later distribute these tokens as they wish using `transfer` and other\n`StandardToken` functions.",
        "fullyImplemented": true,
        "id": 3223,
        "linearizedBaseContracts": [
          3223,
          4035,
          4282,
          3910,
          3839,
          3953,
          3985
        ],
        "name": "SimpleToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 3182,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "482:43:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3180,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "482:6:4",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53696d706c65546f6b656e",
              "id": 3181,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "512:13:4",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_da035752f00a45fb4b10b269b9dcdc58efd98a12eda6b33da179acab837f7818",
                "typeString": "literal_string \"SimpleToken\""
              },
              "value": "SimpleToken"
            },
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 3185,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "531:37:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3183,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "531:6:4",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53494d",
              "id": 3184,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "563:5:4",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_f6fc0e115f393f52de8a1783205484e2c47c0ae0af6904170edd370a74c376e8",
                "typeString": "literal_string \"SIM\""
              },
              "value": "SIM"
            },
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 3188,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "574:35:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 3186,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "574:5:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint8",
                "typeString": "uint8"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3138",
              "id": 3187,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "607:2:4",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18_by_1",
                "typeString": "int_const 18"
              },
              "value": "18"
            },
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 3198,
            "name": "INITIAL_SUPPLY",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "616:74:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 3189,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "616:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "commonType": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              },
              "id": 3197,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "lValueRequested": false,
              "leftExpression": {
                "argumentTypes": null,
                "hexValue": "3130303030",
                "id": 3190,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "kind": "number",
                "lValueRequested": false,
                "nodeType": "Literal",
                "src": "657:5:4",
                "subdenomination": null,
                "typeDescriptions": {
                  "typeIdentifier": "t_rational_10000_by_1",
                  "typeString": "int_const 10000"
                },
                "value": "10000"
              },
              "nodeType": "BinaryOperation",
              "operator": "*",
              "rightExpression": {
                "argumentTypes": null,
                "components": [
                  {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3195,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "hexValue": "3130",
                      "id": 3191,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "666:2:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_10_by_1",
                        "typeString": "int_const 10"
                      },
                      "value": "10"
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "**",
                    "rightExpression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 3193,
                          "name": "decimals",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3188,
                          "src": "680:8:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        ],
                        "id": 3192,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "672:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_uint256_$",
                          "typeString": "type(uint256)"
                        },
                        "typeName": "uint256"
                      },
                      "id": 3194,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "672:17:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "666:23:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 3196,
                "isConstant": false,
                "isInlineArray": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "TupleExpression",
                "src": "665:25:4",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "src": "657:33:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "visibility": "public"
          },
          {
            "body": {
              "id": 3221,
              "nodeType": "Block",
              "src": "802:156:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3203,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3201,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3758,
                      "src": "812:12:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 3202,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3198,
                      "src": "827:14:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "812:29:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3204,
                  "nodeType": "ExpressionStatement",
                  "src": "812:29:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3210,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 3205,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3756,
                        "src": "851:8:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 3208,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3206,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4297,
                          "src": "860:3:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 3207,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "860:10:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "851:20:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 3209,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3198,
                      "src": "874:14:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "851:37:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3211,
                  "nodeType": "ExpressionStatement",
                  "src": "851:37:4"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 3214,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "920:1:4",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            }
                          ],
                          "id": 3213,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "912:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 3215,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "912:10:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3216,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4297,
                          "src": "924:3:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 3217,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "924:10:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3218,
                        "name": "INITIAL_SUPPLY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3198,
                        "src": "936:14:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 3212,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3984,
                      "src": "903:8:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 3219,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "903:48:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3220,
                  "nodeType": "EmitStatement",
                  "src": "898:53:4"
                }
              ]
            },
            "documentation": "@dev Constructor that gives msg.sender all of existing tokens.",
            "id": 3222,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3199,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "792:2:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 3200,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "802:0:4"
            },
            "scope": 3223,
            "src": "781:177:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3224,
        "src": "429:532:4"
      }
    ],
    "src": "0:961:4"
  },
  "legacyAST": {
    "absolutePath": "/home/algys/sources/tcr-hack/solidity/contracts/examples/SimpleToken.sol",
    "exportedSymbols": {
      "SimpleToken": [
        3223
      ]
    },
    "id": 3224,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3175,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "id": 3176,
        "nodeType": "ImportDirective",
        "scope": 3224,
        "sourceUnit": 4283,
        "src": "27:67:4",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol",
        "id": 3177,
        "nodeType": "ImportDirective",
        "scope": 3224,
        "sourceUnit": 4036,
        "src": "95:75:4",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 3178,
              "name": "StandardBurnableToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4035,
              "src": "453:21:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardBurnableToken_$4035",
                "typeString": "contract StandardBurnableToken"
              }
            },
            "id": 3179,
            "nodeType": "InheritanceSpecifier",
            "src": "453:21:4"
          }
        ],
        "contractDependencies": [
          3839,
          3910,
          3953,
          3985,
          4035,
          4282
        ],
        "contractKind": "contract",
        "documentation": "@title SimpleToken\n@dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.\nNote they can later distribute these tokens as they wish using `transfer` and other\n`StandardToken` functions.",
        "fullyImplemented": true,
        "id": 3223,
        "linearizedBaseContracts": [
          3223,
          4035,
          4282,
          3910,
          3839,
          3953,
          3985
        ],
        "name": "SimpleToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 3182,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "482:43:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3180,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "482:6:4",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53696d706c65546f6b656e",
              "id": 3181,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "512:13:4",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_da035752f00a45fb4b10b269b9dcdc58efd98a12eda6b33da179acab837f7818",
                "typeString": "literal_string \"SimpleToken\""
              },
              "value": "SimpleToken"
            },
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 3185,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "531:37:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 3183,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "531:6:4",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53494d",
              "id": 3184,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "563:5:4",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_f6fc0e115f393f52de8a1783205484e2c47c0ae0af6904170edd370a74c376e8",
                "typeString": "literal_string \"SIM\""
              },
              "value": "SIM"
            },
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 3188,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "574:35:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint8",
              "typeString": "uint8"
            },
            "typeName": {
              "id": 3186,
              "name": "uint8",
              "nodeType": "ElementaryTypeName",
              "src": "574:5:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint8",
                "typeString": "uint8"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3138",
              "id": 3187,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "607:2:4",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18_by_1",
                "typeString": "int_const 18"
              },
              "value": "18"
            },
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 3198,
            "name": "INITIAL_SUPPLY",
            "nodeType": "VariableDeclaration",
            "scope": 3223,
            "src": "616:74:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 3189,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "616:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "commonType": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              },
              "id": 3197,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "lValueRequested": false,
              "leftExpression": {
                "argumentTypes": null,
                "hexValue": "3130303030",
                "id": 3190,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "kind": "number",
                "lValueRequested": false,
                "nodeType": "Literal",
                "src": "657:5:4",
                "subdenomination": null,
                "typeDescriptions": {
                  "typeIdentifier": "t_rational_10000_by_1",
                  "typeString": "int_const 10000"
                },
                "value": "10000"
              },
              "nodeType": "BinaryOperation",
              "operator": "*",
              "rightExpression": {
                "argumentTypes": null,
                "components": [
                  {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3195,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "hexValue": "3130",
                      "id": 3191,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "666:2:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_10_by_1",
                        "typeString": "int_const 10"
                      },
                      "value": "10"
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "**",
                    "rightExpression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 3193,
                          "name": "decimals",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3188,
                          "src": "680:8:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        ],
                        "id": 3192,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "672:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_uint256_$",
                          "typeString": "type(uint256)"
                        },
                        "typeName": "uint256"
                      },
                      "id": 3194,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "672:17:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "666:23:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 3196,
                "isConstant": false,
                "isInlineArray": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "TupleExpression",
                "src": "665:25:4",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "src": "657:33:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "visibility": "public"
          },
          {
            "body": {
              "id": 3221,
              "nodeType": "Block",
              "src": "802:156:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3203,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 3201,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3758,
                      "src": "812:12:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 3202,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3198,
                      "src": "827:14:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "812:29:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3204,
                  "nodeType": "ExpressionStatement",
                  "src": "812:29:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3210,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 3205,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3756,
                        "src": "851:8:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 3208,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3206,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4297,
                          "src": "860:3:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 3207,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "860:10:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "851:20:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 3209,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3198,
                      "src": "874:14:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "851:37:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3211,
                  "nodeType": "ExpressionStatement",
                  "src": "851:37:4"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 3214,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "920:1:4",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            }
                          ],
                          "id": 3213,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "912:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 3215,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "912:10:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3216,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4297,
                          "src": "924:3:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 3217,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "924:10:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3218,
                        "name": "INITIAL_SUPPLY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3198,
                        "src": "936:14:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 3212,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3984,
                      "src": "903:8:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 3219,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "903:48:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3220,
                  "nodeType": "EmitStatement",
                  "src": "898:53:4"
                }
              ]
            },
            "documentation": "@dev Constructor that gives msg.sender all of existing tokens.",
            "id": 3222,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3199,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "792:2:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 3200,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "802:0:4"
            },
            "scope": 3223,
            "src": "781:177:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3224,
        "src": "429:532:4"
      }
    ],
    "src": "0:961:4"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.1",
  "updatedAt": "2018-09-09T02:39:31.656Z"
}
