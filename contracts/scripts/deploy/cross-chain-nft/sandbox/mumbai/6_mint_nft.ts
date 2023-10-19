import { ethers } from 'hardhat'
import { getPayFeesIn } from '../../../../utils/addresses'

/**
 * send メソッド実行メソッド
 */
async function main() {
  // destinationChainSelector
  const chain_selector = '12532609583862916517'
  // sender address (fuji)
  const sender_address = '0x7de91d76b13440A69C54375c337828C6c64dc268'
  // receiver address (mumbai)
  const receiver_address = '0x1d0841b8eDf79cAa822Cf7a834d47f096cA5E27a'

  const fee = getPayFeesIn('LINK')

  const sender = await ethers.getContractAt('SourceMinter', sender_address)

  const tx = await sender.mint(
    chain_selector,
    receiver_address,
    '0xF88A84e0fFaB69D4e3cA414204b6E54a6879c296',
    fee
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
