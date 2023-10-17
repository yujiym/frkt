import { ethers } from 'hardhat'

/**
 * setUpSignContract script
 */
async function main() {
  // create SignContract Contract
  const signContractAddress = '0x0a2839ffacA8424b0532b2BC214F9Ea8B45268Fc'
  const signContract = await ethers.getContractAt(
    'SignContract',
    signContractAddress
  )

  console.log(
    ` ======================= set up start ========================= `
  )

  const tx = await signContract.setUpSignContract(
    '0002',
    '0002',
    'FrktSampleSignContract',
    2,
    'https://bafybeifw2wc4m3k6sfwbegldppbimyme6pkhs6scifqmlpkwy4numw43wm.ipfs.dweb.link/SIMPLE_CONTRACT_AGREEMENT.pdf',
    [
      ethers.getAddress('0x1a29B04E144e0EC9ECA49851e65F589877a47268'),
      ethers.getAddress('0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072'),
    ],
    ethers.getAddress('0x0a2839ffacA8424b0532b2BC214F9Ea8B45268Fc'),
    {
      gasPrice: 400000,
    }
  )

  await tx.wait()

  console.log(` set up ${tx.toJSON()}`)
  console.log(` ======================== set up end  ======================== `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
