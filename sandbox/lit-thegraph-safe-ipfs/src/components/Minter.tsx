
import styles from '@/styles/Home.module.css';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers';
import { ethers } from "ethers";
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pdfjsWorkerSrc from '../../pdf-worker';
import { addSigNature } from '../hooks/safe';
import { SignContractInfos } from '../utils/types';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc;


interface Props {
  address: string,
  signId: number,
  pkpWallet: PKPEthersWallet,
  chainId: number,
  provider: ethers.providers.Provider,
  data: SignContractInfos
}

/**
 * Minter Component
 * @param param0 
 * @returns 
 */
const Minter: React.FC<Props> = ({ address, pkpWallet, signId, provider, chainId, data }) => {
  const [minted, setMinted] = useState<boolean>(false)
  const [numPages, setNumPages] = useState(1);

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

    // get appId, receipeId
    const appId = data.signContractCreateds[0].appId;
    const receipeId = data.signContractCreateds[0].receipeId;
    const safeAddress = data.signContractCreateds[0].safeAddress;
    // get signature
    const signature  = await pkpWallet.signMessage(`I sign to ${appId}/${receipeId}/${signId.toString()}/${safeAddress} Contract!`);
    
    // call addSignature method
    const response = await addSigNature(
      appId,
      receipeId,
      signId,
      chainId,
      safeAddress,
      signature,
    );

    setMinted(true)

    console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`)
    toast.success(`Success! Here is your https://relay.gelato.digital/tasks/status/${response.taskId} `, {
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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };


  return(
    <>
      {address && <h2>SignName: {data.signContractCreateds[0].name}</h2>}
      {address && <h3>SafeAddress: {data.signContractCreateds[0].safeAddress}</h3>}
      {address && (
        <>
          { (data.changeApproveStatuses[0] == undefined) ? 
            <p>approveStatus: Not Appvoed</p> 
          : 
            <h3>approveStatus: Approved</h3> 
          }
        </>
      )}
      {address && <button onClick={handleMint} className={styles.connect}>Sign</button>}
      {address && (
        <div>
          <Document 
            file={data.signContractCreateds[0].uri} 
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <div style={{ border: 'solid 1px gray'}}>
              <Page height={2500} pageNumber={numPages} />
            </div>
          </Document>
        </div>
      )}
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