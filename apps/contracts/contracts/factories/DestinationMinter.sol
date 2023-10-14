// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { DestinationMinter } from "./../cross-chain-nft/DestinationMinter.sol";

/**
 * FactoryContract Contract
 */
contract FactoryContract {
  // SourceMinter's Array
  DestinationMinter[] public minters;

  event DestinationMinterCreated(DestinationMinter indexed minnter, string receipeId );

  /**
   * createDestinationMinter function
   */
  function createDestinationMinter(
    string memory receipeId, 
    address router, 
    address nftAddress
   ) public returns (address) {
    // create new contract
    DestinationMinter minter = new DestinationMinter(router, nftAddress);
    // add to array
    minters.push(minter);

    emit DestinationMinterCreated(minter, receipeId);

    return address(minter);
  }

  /**
   * get all DestinationMinters info
   */
  function getDestinationMinters()public view returns (DestinationMinter[] memory coll) {
    return minters;
  }

  function DestinationMintersCount () public view returns (uint256) {
    return minters.length;
  }
}
