import { ethers } from 'hardhat'

async function main() {
  const factory = await ethers.deployContract('SourceMinterFactory')

  console.log(` ======================= start ========================= `)
  await factory.waitForDeployment()

  console.log(` SourceMinterFactory deployed to ${factory.target}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
