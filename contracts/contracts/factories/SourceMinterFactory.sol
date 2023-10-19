// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './../cross-chain-nft/SourceMinter.sol';

/**
 * SourceMinterFactory Contract
 */
contract SourceMinterFactory {
  // SourceMinter's Array
  SourceMinter[] public minters;

  event SourceMinterCreated(SourceMinter indexed minter, string receipeId );

  function createSourceMinter (
    string memory receipeId,
    address router, 
    address link
  ) public returns (address){
    // create SourceMinter contract
    SourceMinter minter = new SourceMinter(router, link);
    // add to array
    minters.push(minter);
    // emit
    emit SourceMinterCreated (minter, receipeId);

    return address(minter);
  }

  /**
   * get all SourceMinters info
   */
  function getSourceMinters()public view returns (SourceMinter[] memory coll) {
    return minters;
  }

  function SourceMintersCount () public view returns (uint256) {
    return minters.length;
  }
}