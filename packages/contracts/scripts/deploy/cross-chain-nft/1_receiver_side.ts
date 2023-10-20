import { ethers } from 'hardhat'

import {
  MUMBAI_DES_FACTORY_ADDRESS,
  MUMBAI_NFT_FACTORY_ADDRESS,
  //OPGOERLI_DES_FACTORY_ADDRESS,
  //OPGOERLI_NFT_FACTORY_ADDRESS,
  //OPGOERLI_ROUTER_ADDRESS,
  MUMBAI_ROUTER_ADDRESS,
} from './../../utils/addresses'

async function main() {
  // set contract address
  //const nftFactoryAddress = OPGOERLI_NFT_FACTORY_ADDRESS
  const nftFactoryAddress = MUMBAI_NFT_FACTORY_ADDRESS
  //const desFactoryAddress = OPGOERLI_DES_FACTORY_ADDRESS
  const desFactoryAddress = MUMBAI_DES_FACTORY_ADDRESS
  //const routerAddress = OPGOERLI_ROUTER_ADDRESS
  const routerAddress = MUMBAI_ROUTER_ADDRESS

  // receipe ID
  const receipeId = '0001'
  // nft address
  var nftAddress
  var desAddress
  // NFT's base URI
  const baseURI =
    'https://ipfs.io/ipfs/bafkreia34hl3lhr2z6n577miz3ibhb2sximvmv2gufxgrslu4q3jj2zkri'

  // get Contract info
  const nftFactory = await ethers.getContractAt('NftFactory', nftFactoryAddress)
  const desFactory = await ethers.getContractAt(
    'DestinationMinterFactory',
    desFactoryAddress
  )

  console.log(
    ` ======================= receiver side deploy start ========================= `
  )

  console.log(
    ` ======================= NFT deploy start ========================= `
  )

  nftFactory.on(`NftCreated`, (res: any) => {
    console.log(` NFT deployed to ${res}`)
    nftAddress = res
  })

  const resonse = await nftFactory.createNft(
    receipeId,
    'FrktNFT',
    'FNFT',
    'this is a Sample FRKT NFT',
    baseURI
  )

  await resonse.wait()

  console.log(` NFT deployed to ${nftAddress}`)
  nftFactory.removeAllListeners()
  console.log(
    ` ======================= NFT deploy end ========================= `
  )

  console.log(
    ` ======================= DestinationMinter deploy start ========================= `
  )

  desFactory.on('DestinationMinterCreated', (res: any) => {
    console.log(` DestinationMinter deployed to ${res}`)
    desAddress = res
  })

  nftAddress = '0x2bE3ea3f1a3D5D668367F28Be3072573FfAc70F4'

  const resonse2 = await desFactory.createDestinationMinter(
    receipeId,
    ethers.getAddress(routerAddress),
    ethers.getAddress(nftAddress) // nft address (mumbai)
  )

  await resonse2.wait()

  console.log(`resonse2 ${resonse2}`)

  console.log(
    ` ======================= DestinationMinter deploy end ========================= `
  )

  desFactory.removeAllListeners()

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
