// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Sample NFT Contract
 */
contract FrktNFT is ERC721URIStorage, Ownable {
  uint256 internal tokenId;
  string tokenBaseUri;

  constructor(string memory name, string memory symbol, string memory baseUri) ERC721(name, symbol) {
    tokenBaseUri = baseUri;
  }

  function mint(address to) public onlyOwner {
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenBaseUri);
    unchecked {
      tokenId++;
    }
  }
}