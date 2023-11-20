{
  "_format": "hh-sol-artifact-1",
  "contractName": "SourceMinter",
  "sourceName": "contracts/cross-chain-nft/SourceMinter.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "router",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "link",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "FailedToWithdrawEth",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "messageId",
          "type": "bytes32"
        }
      ],
      "name": "MessageSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "destinationChainSelector",
          "type": "uint64"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "enum SourceMinter.PayFeesIn",
          "name": "payFeesIn",
          "type": "uint8"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "withdrawToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x60c06040523480156200001157600080fd5b5060405162000f9138038062000f91833981016040819052620000349162000217565b33806000816200008b5760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420736574206f776e657220746f207a65726f000000000000000060448201526064015b60405180910390fd5b600080546001600160a01b0319166001600160a01b0384811691909117909155811615620000be57620000be816200014f565b5050506001600160a01b03828116608081905290821660a081905260405163095ea7b360e01b8152600481019290925260001960248301529063095ea7b3906044016020604051808303816000875af115801562000120573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200014691906200024f565b5050506200027a565b336001600160a01b03821603620001a95760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000604482015260640162000082565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b80516001600160a01b03811681146200021257600080fd5b919050565b600080604083850312156200022b57600080fd5b6200023683620001fa565b91506200024660208401620001fa565b90509250929050565b6000602082840312156200026257600080fd5b815180151581146200027357600080fd5b9392505050565b60805160a051610ce3620002ae60003960006105a90152600081816105fd015281816106f101526107af0152610ce36000f3fe6080604052600436106100695760003560e01c80638da5cb5b116100435780638da5cb5b146100cc578063ec99afa214610105578063f2fde38b1461012557600080fd5b80633aeac4e11461007557806351cff8d91461009757806379ba5097146100b757600080fd5b3661007057005b600080fd5b34801561008157600080fd5b50610095610090366004610a1e565b610145565b005b3480156100a357600080fd5b506100956100b2366004610a51565b610281565b3480156100c357600080fd5b50610095610352565b3480156100d857600080fd5b506000546040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561011157600080fd5b50610095610120366004610a73565b61044f565b34801561013157600080fd5b50610095610140366004610a51565b610869565b61014d61087d565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156101ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101de9190610acd565b6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152602482018390529192509083169063a9059cbb906044016020604051808303816000875af1158015610257573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061027b9190610ae6565b50505050565b61028961087d565b604051479060009073ffffffffffffffffffffffffffffffffffffffff84169083908381818185875af1925050503d80600081146102e3576040519150601f19603f3d011682016040523d82523d6000602084013e6102e8565b606091505b505090508061034d576040517f9d11f56300000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff84166024820152604481018390526064015b60405180910390fd5b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1633146103d3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d7573742062652070726f706f736564206f776e6572000000000000000000006044820152606401610344565b60008054337fffffffffffffffffffffffff00000000000000000000000000000000000000008083168217845560018054909116905560405173ffffffffffffffffffffffffffffffffffffffff90921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b6040805160a0810190915273ffffffffffffffffffffffffffffffffffffffff831660c08201526000908060e08101604080518083037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe001815291815290825251336024820152602090910190604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052602080820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f6a6278420000000000000000000000000000000000000000000000000000000017905290825201600060405190808252806020026020018201604052801561058157816020015b604080518082019091526000808252602082015281526020019060019003908161055a5790505b508152602001600184600181111561059b5761059b610b08565b146105a75760006105c9565b7f00000000000000000000000000000000000000000000000000000000000000005b73ffffffffffffffffffffffffffffffffffffffff16815260200160405180602001604052806000815250815250905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166320487ded86846040518363ffffffff1660e01b8152600401610656929190610b9b565b602060405180830381865afa158015610673573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106979190610acd565b9050600060018460018111156106af576106af610b08565b03610772576040517f96f4e9f900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f9906107289089908790600401610b9b565b6020604051808303816000875af1158015610747573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076b9190610acd565b905061082e565b6040517f96f4e9f900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f99084906107e8908a908890600401610b9b565b60206040518083038185885af1158015610806573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061082b9190610acd565b90505b6040518181527f54791b38f3859327992a1ca0590ad3c0f08feba98d1a4f56ab0dca74d203392a9060200160405180910390a1505050505050565b61087161087d565b61087a81610900565b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146108fe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e6572000000000000000000006044820152606401610344565b565b3373ffffffffffffffffffffffffffffffffffffffff82160361097f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c660000000000000000006044820152606401610344565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b803573ffffffffffffffffffffffffffffffffffffffff81168114610a1957600080fd5b919050565b60008060408385031215610a3157600080fd5b610a3a836109f5565b9150610a48602084016109f5565b90509250929050565b600060208284031215610a6357600080fd5b610a6c826109f5565b9392505050565b600080600060608486031215610a8857600080fd5b833567ffffffffffffffff81168114610aa057600080fd5b9250610aae602085016109f5565b9150604084013560028110610ac257600080fd5b809150509250925092565b600060208284031215610adf57600080fd5b5051919050565b600060208284031215610af857600080fd5b81518015158114610a6c57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000815180845260005b81811015610b5d57602081850181015186830182015201610b41565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b6000604067ffffffffffffffff8516835260208181850152845160a083860152610bc860e0860182610b37565b9050818601517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc080878403016060880152610c038383610b37565b88860151888203830160808a01528051808352908601945060009350908501905b80841015610c63578451805173ffffffffffffffffffffffffffffffffffffffff16835286015186830152938501936001939093019290860190610c24565b50606089015173ffffffffffffffffffffffffffffffffffffffff1660a08901526080890151888203830160c08a01529550610c9f8187610b37565b9a995050505050505050505056fea2646970667358221220878506edfad4fe8546c4280d02007eae4453978b0bb16294de5ff7f28c1357c064736f6c63430008130033",
  "deployedBytecode": "0x6080604052600436106100695760003560e01c80638da5cb5b116100435780638da5cb5b146100cc578063ec99afa214610105578063f2fde38b1461012557600080fd5b80633aeac4e11461007557806351cff8d91461009757806379ba5097146100b757600080fd5b3661007057005b600080fd5b34801561008157600080fd5b50610095610090366004610a1e565b610145565b005b3480156100a357600080fd5b506100956100b2366004610a51565b610281565b3480156100c357600080fd5b50610095610352565b3480156100d857600080fd5b506000546040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561011157600080fd5b50610095610120366004610a73565b61044f565b34801561013157600080fd5b50610095610140366004610a51565b610869565b61014d61087d565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156101ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101de9190610acd565b6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152602482018390529192509083169063a9059cbb906044016020604051808303816000875af1158015610257573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061027b9190610ae6565b50505050565b61028961087d565b604051479060009073ffffffffffffffffffffffffffffffffffffffff84169083908381818185875af1925050503d80600081146102e3576040519150601f19603f3d011682016040523d82523d6000602084013e6102e8565b606091505b505090508061034d576040517f9d11f56300000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff84166024820152604481018390526064015b60405180910390fd5b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1633146103d3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d7573742062652070726f706f736564206f776e6572000000000000000000006044820152606401610344565b60008054337fffffffffffffffffffffffff00000000000000000000000000000000000000008083168217845560018054909116905560405173ffffffffffffffffffffffffffffffffffffffff90921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b6040805160a0810190915273ffffffffffffffffffffffffffffffffffffffff831660c08201526000908060e08101604080518083037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe001815291815290825251336024820152602090910190604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052602080820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f6a6278420000000000000000000000000000000000000000000000000000000017905290825201600060405190808252806020026020018201604052801561058157816020015b604080518082019091526000808252602082015281526020019060019003908161055a5790505b508152602001600184600181111561059b5761059b610b08565b146105a75760006105c9565b7f00000000000000000000000000000000000000000000000000000000000000005b73ffffffffffffffffffffffffffffffffffffffff16815260200160405180602001604052806000815250815250905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166320487ded86846040518363ffffffff1660e01b8152600401610656929190610b9b565b602060405180830381865afa158015610673573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106979190610acd565b9050600060018460018111156106af576106af610b08565b03610772576040517f96f4e9f900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f9906107289089908790600401610b9b565b6020604051808303816000875af1158015610747573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076b9190610acd565b905061082e565b6040517f96f4e9f900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f99084906107e8908a908890600401610b9b565b60206040518083038185885af1158015610806573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061082b9190610acd565b90505b6040518181527f54791b38f3859327992a1ca0590ad3c0f08feba98d1a4f56ab0dca74d203392a9060200160405180910390a1505050505050565b61087161087d565b61087a81610900565b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146108fe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e6572000000000000000000006044820152606401610344565b565b3373ffffffffffffffffffffffffffffffffffffffff82160361097f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c660000000000000000006044820152606401610344565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b803573ffffffffffffffffffffffffffffffffffffffff81168114610a1957600080fd5b919050565b60008060408385031215610a3157600080fd5b610a3a836109f5565b9150610a48602084016109f5565b90509250929050565b600060208284031215610a6357600080fd5b610a6c826109f5565b9392505050565b600080600060608486031215610a8857600080fd5b833567ffffffffffffffff81168114610aa057600080fd5b9250610aae602085016109f5565b9150604084013560028110610ac257600080fd5b809150509250925092565b600060208284031215610adf57600080fd5b5051919050565b600060208284031215610af857600080fd5b81518015158114610a6c57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000815180845260005b81811015610b5d57602081850181015186830182015201610b41565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b6000604067ffffffffffffffff8516835260208181850152845160a083860152610bc860e0860182610b37565b9050818601517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc080878403016060880152610c038383610b37565b88860151888203830160808a01528051808352908601945060009350908501905b80841015610c63578451805173ffffffffffffffffffffffffffffffffffffffff16835286015186830152938501936001939093019290860190610c24565b50606089015173ffffffffffffffffffffffffffffffffffffffff1660a08901526080890151888203830160c08a01529550610c9f8187610b37565b9a995050505050505050505056fea2646970667358221220878506edfad4fe8546c4280d02007eae4453978b0bb16294de5ff7f28c1357c064736f6c63430008130033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}