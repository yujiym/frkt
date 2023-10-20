import { ethers } from 'hardhat'

async function main() {
  // Router address
  const router_address = '0x70499c328e1E2a3c41108bd3730F6670a44595D1'
  // nft address
  const nft_address = '0x96bbeD9989387Bb512EA29A8FA54F03d33BAD169'

  const Minter = await ethers.getContractFactory('DestinationMinter')

  const minter = await Minter.deploy(router_address, nft_address, {
    gasPrice: 5000000,
  })

  await minter.waitForDeployment()

  console.log(`deployed to ${minter.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
