
import { Biconomy } from '@/hooks/biconomy';
import styles from '@/styles/Home.module.css';
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ethers } from "ethers";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nftAddress = "0x0a7755bDfb86109D9D403005741b415765EAf1Bc";

interface Props {
  biconomyService: Biconomy,
  smartAccount: BiconomySmartAccountV2,
  address: string,
  provider: ethers.providers.Provider,
}

/**
 * Minter Component
 * @param param0 
 * @returns 
 */
const Minter: React.FC<Props> = ({ biconomyService, smartAccount, address, provider }) => {
  const [minted, setMinted] = useState<boolean>(false)

  /**
   * handleMint
   */
  const handleMint = async () => {
    toast.info('Minting your NFT...', {
      position: "top-right",
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     });

    // call mintNFT method
    const transactionHash = await biconomyService.mintNft(
      smartAccount, 
      address, 
      provider, 
      nftAddress
    );

    setMinted(true)

    toast.success(`Success! Here is your transaction:${transactionHash} `, {
      position: "top-right",
      autoClose: 18000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  /**
   * handleMint2
   */
  const handleMint2 = async () => {
    toast.info('Minting your CrossChain NFT...', {
      position: "top-right",
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     });

    // call mintNFT method
    const transactionHash = await biconomyService.crossMintNft(
      smartAccount, 
      provider, 
      address
    );

    setMinted(true)

    toast.success(`Success! Here is your transaction: https://ccip.chain.link/msg/${transactionHash} `, {
      position: "top-right",
      autoClose: 18000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  return(
    <>
      {address && <button onClick={handleMint} className={styles.connect}>Mint NFT</button>}
      {address && <button onClick={handleMint2} className={styles.connect}>Mint CrossChain NFT</button>}
      {minted && <a href={`https://testnets.opensea.io/${address}`}> Click to view minted nfts for smart account</a>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Minter;