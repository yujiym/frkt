// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import './../cross-chain-nft/FrktNFT.sol';

/**
 * NftFactory Contract
 */
contract NftFactory {
  // NFT's Array
  FrktNFT[] public nfts;

  event NftCreated(FrktNFT indexed nft, string receipeId, string name, string symbol, string description);

  /** */
  function createNft (
    string memory receipeId,
    string memory name,
    string memory symbol,
    string memory description,
    string memory baseUri
  ) public returns (address){
    // create NFT contract
    FrktNFT nft = new FrktNFT(name, symbol, baseUri);
    // add to array
    nfts.push(nft);
    // emit
    emit NftCreated (nft, receipeId, name, symbol, description);

    return address(nft);
  }

  /**
   * transfer ownership to DestinationMinter
   */
  function transferOwnerShipDestinationMinter(address nft, address desMinter) public {
    // call transferOwnerShipmethod
    FrktNFT nftContract = FrktNFT(nft);
    nftContract.transferOwnership(desMinter);
  }

  /**
   * get all NFTs info
   */
  function getNfts()public view returns (FrktNFT[] memory coll) {
    return nfts;
  }

  function nftsCount () public view returns (uint256) {
    return nfts.length;
  }
}