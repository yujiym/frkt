import { ethers } from 'hardhat'

import {
  // MUMBAI_NFT_FACTORY_ADDRESS,
  OPGOERLI_DES_FACTORY_ADDRESS,
  OPGOERLI_NFT_FACTORY_ADDRESS,
  OPGOERLI_ROUTER_ADDRESS,
} from './../../utils/addresses'

async function main() {
  // set contract address
  const nftFactoryAddress = OPGOERLI_NFT_FACTORY_ADDRESS
  // const nftFactoryAddress = MUMBAI_NFT_FACTORY_ADDRESS;
  const desFactoryAddress = OPGOERLI_DES_FACTORY_ADDRESS
  // const desFactoryAddress = MUMBAI_DES_FACTORY_ADDRESS;
  const routerAddress = OPGOERLI_ROUTER_ADDRESS
  // const routerAddress = MUMBAI_ROUTER_ADDRESS;

  // receipe ID
  const receipeId = '0001'
  // nft address
  var nftAddress

  // get Contract info
  const nftFactory = await ethers.getContractAt('NftFactory', nftFactoryAddress)
  const desFactory = await ethers.getContractAt(
    'DestinationMinterFactory',
    desFactoryAddress
  )

  console.log(
    ` ======================= receiver side deploy start ========================= `
  )

  nftFactory.on('NftCreated', (res) => {
    console.log(` NFT deployed to ${res}`)
    nftAddress = res
  })

  const resonse = await nftFactory.createNft(
    receipeId,
    'FrktNFT',
    'FNFT',
    'this is a Sample FRKT NFT',
    'https://ipfs.io/ipfs/bafkreia34hl3lhr2z6n577miz3ibhb2sximvmv2gufxgrslu4q3jj2zkri'
  )

  desFactory.on('DestinationMinterCreated', (res) => {
    console.log(` DestinationMinter deployed to ${res}`)
    nftAddress = res
  })

  const resonse2 = await desFactory.createDestinationMinter(
    receipeId,
    ethers.getAddress(routerAddress),
    ethers.getAddress(nftAddress!)
  )

  nftFactory.removeAllListeners()
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
