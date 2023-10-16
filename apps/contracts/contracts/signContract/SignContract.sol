// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";

/**
 *  SignContract
 */
contract SignContract {
  using Counters for Counters.Counter;
  // signID
  Counters.Counter private signIds;

  struct SignContractInfo {
    string signName;
    address safeAddress;
    address[] signOwners;
    uint required;
    bool approveStatus;
    string[] signatures;
    string fileUri;
  }

  mapping(uint256 => SignContractInfo) public signContracts;
  mapping(uint256 => mapping(address => bool)) public isOwner;

  event SignContractCreated(string appId, string receipeId, uint256 signId, string name, uint required, string uri, address[] owners, address safeAddress);
  event SignatureAdded(string appId, string receipeId, uint256 signId, string signature);
  event ChangeApproveStatus(string appId, string receipeId, uint256 signId, bool approveStatus);


  modifier notApproved(uint256 _signId) {
    require(!signContracts[_signId].approveStatus, "SignContract already approved");
    _;
  }

  modifier notFromSafeContract(uint256 _signId) {
    require(msg.sender == signContracts[_signId].safeAddress , "msg.sender must be SafeContract Address");
    _;
  }

  /**
   * setUp SignContract
   */
  function setUpSignContract(
    string memory _appId,
    string memory _receipeId,
    string memory _initName,
    uint _initRequired, 
    string memory _initUri, 
    address[] memory _owners,
    address _safeAddress
  ) 
    public 
  {
    require(_owners.length > 0, "number of owner addresses must be more than zero!!");
    require(_initRequired > 0 && _initRequired <= _owners.length, "invalid required number of owners");
    
    uint256 newSignId = signIds.current();
    
    for(uint i; i < _owners.length; i++) {
      address owner = _owners[i];
      require(owner != address(0), "invalid address");
      require(!isOwner[newSignId][owner], "owner is not unique");
      // set
      isOwner[newSignId][owner] = true;
    }

    // init signatures
    string[] memory initSignatures;

    // create new SignContract Object
    signContracts[newSignId] = SignContractInfo({
      signName: _initName,
      safeAddress: _safeAddress,
      signOwners: _owners,
      required: _initRequired,
      approveStatus: false,
      signatures: initSignatures,
      fileUri: _initUri
    });

    signIds.increment();
    emit SignContractCreated(_appId, _receipeId, newSignId, _initName, _initRequired, _initUri, _owners, _safeAddress);
  }


  /** 
   * add signatures
   */
  function addSignature(
    string memory _appId, 
    string memory _receipeId, 
    uint256 _signId, 
    string memory _signature
  ) 
    public 
    notApproved(_signId) 
    notFromSafeContract(_signId) 
  {
    // add signature
    signContracts[_signId].signatures.push(_signature);

    if(signContracts[_signId].signatures.length >= signContracts[_signId].required){
      signContracts[_signId].approveStatus = true;
      emit ChangeApproveStatus(_appId, _receipeId, _signId, true);
    }

    emit SignatureAdded(_appId, _receipeId, _signId, _signature);
  }

  /**
   * getApproveStatus
   */
  function getApproveStatus(uint256 _signId) public view returns (bool) {
    return signContracts[_signId].approveStatus;
  }
}