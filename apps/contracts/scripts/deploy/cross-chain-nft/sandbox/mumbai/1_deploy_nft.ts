import { ethers } from 'hardhat'

/**
 * deploy NFT script
 */
async function main() {
  const MyNFT = await ethers.getContractFactory('FrktNFT')
  // NFT's base URI
  const baseURI =
    'https://ipfs.io/ipfs/bafkreia34hl3lhr2z6n577miz3ibhb2sximvmv2gufxgrslu4q3jj2zkri'

  const nft = await MyNFT.deploy('FrktNFT', 'FNFT', baseURI)

  await nft.waitForDeployment()

  console.log(`deployed to ${nft.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
