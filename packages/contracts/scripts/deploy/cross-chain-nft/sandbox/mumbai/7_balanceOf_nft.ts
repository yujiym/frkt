import { ethers } from 'hardhat'

/**
 * get nft's balance
 */
async function main() {
  // nft address (mumbai)
  const nft_address = '0x0B02f4E617B2c9Ee58AE33B403075fa96Be0b07A'

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
