import { ethers } from 'hardhat'

async function main() {
  const signContract = await ethers.deployContract('SignContract')

  console.log(` ======================= start ========================= `)
  await signContract.waitForDeployment()

  console.log(` signContracty deployed to ${signContract.target}`)
  console.log(` ======================== end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
