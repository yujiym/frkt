import { ethers } from 'hardhat'
import { getPayFeesIn } from '../../../../utils/addresses'

/**
 * send メソッド実行メソッド
 */
async function main() {
  // destinationChainSelector(opGoerli)
  const chain_selector = '2664363617261496610'
  // sender address (fuji)
  const sender_address = '0x7de91d76b13440A69C54375c337828C6c64dc268'
  // receiver address (optimism)
  const receiver_address = '0x9327a0fCaFe14aAafBEE80BBD0799Cb2BEAFaeC5'

  const fee = getPayFeesIn('LINK')

  const sender = await ethers.getContractAt('SourceMinter', sender_address)

  const tx = await sender.mint(
    chain_selector,
    receiver_address,
    '0xF88A84e0fFaB69D4e3cA414204b6E54a6879c296',
    fee,
    {
      gasPrice: 30000000000,
    }
  )

  await tx.wait()

  console.log(`result: ${tx.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
