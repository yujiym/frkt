import { ethers } from 'hardhat'

async function main() {
  // get Contract info
  const nft = await ethers.getContractAt(
    'FrktNFT',
    '0x0B02f4E617B2c9Ee58AE33B403075fa96Be0b07A'
  )

  console.log(
    ` ======================= transfer ownerShip start ========================= `
  )

  var desAddress = '0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a'

  // transfer ownership
  const tx = await nft.transferOwnership(ethers.getAddress(desAddress))

  await tx.wait()

  console.log(`transfer ownership result: ${tx}`)

  console.log(
    ` ======================== transfer ownerShip end  ======================== `
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
