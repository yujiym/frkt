import { ethers } from 'hardhat'

async function main() {
  // get Contract info
  const nft = await ethers.getContractAt(
    'FrktNFT',
    '0x96bbeD9989387Bb512EA29A8FA54F03d33BAD169'
  )

  console.log(
    ` ======================= transfer ownerShip start ========================= `
  )

  var desAddress = '0x9327a0fCaFe14aAafBEE80BBD0799Cb2BEAFaeC5'

  // transfer ownership
  const tx = await nft.transferOwnership(ethers.getAddress(desAddress), {
    gasPrice: 5000000,
  })

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
