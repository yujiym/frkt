import { ethers } from 'hardhat'

async function main() {
  // Router address
  const router_address = '0x70499c328e1E2a3c41108bd3730F6670a44595D1'
  // nft address
  const nft_address = '0x0B02f4E617B2c9Ee58AE33B403075fa96Be0b07A'

  const Minter = await ethers.getContractFactory('DestinationMinter')

  const minter = await Minter.deploy(router_address, nft_address)

  await minter.waitForDeployment()

  console.log(`deployed to ${minter.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
