import { ethers } from 'hardhat'

import { MUMBAI_NFT_FACTORY_ADDRESS } from './../../utils/addresses'

async function main() {
  // set contract address
  //const nftFactoryAddress = OPGOERLI_NFT_FACTORY_ADDRESS
  const nftFactoryAddress = MUMBAI_NFT_FACTORY_ADDRESS

  // nft address
  var nftAddress
  var desAddress

  // get Contract info
  const nftFactory = await ethers.getContractAt('NftFactory', nftFactoryAddress)

  console.log(
    ` ======================= receiver side deploy start ========================= `
  )

  nftAddress = '0x2bE3ea3f1a3D5D668367F28Be3072573FfAc70F4'
  desAddress = '0x9bE9aC69125c5dEcd0BD14AC15A1872431aF7e15'

  // transfer ownership
  const tx = await nftFactory.transferOwnerShipDestinationMinter(
    ethers.getAddress(nftAddress),
    ethers.getAddress(desAddress!)
  )
  await tx.wait()

  console.log(`transfer ownership result: ${tx}`)

  console.log(
    ` ======================== receiver side deploy end  ======================== `
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
