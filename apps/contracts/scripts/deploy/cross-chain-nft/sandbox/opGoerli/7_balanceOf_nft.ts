import { ethers } from 'hardhat'

/**
 * get nft's balance
 */
async function main() {
  // nft address (OpGoerli)
  const nft_address = '0x96bbeD9989387Bb512EA29A8FA54F03d33BAD169'

  const nft = await ethers.getContractAt('FrktNFT', nft_address)

  // get pkpWallet's balance
  const balance = await nft.balanceOf(
    '0xF88A84e0fFaB69D4e3cA414204b6E54a6879c296'
  )

  console.log(`balanceOf: ${balance}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
