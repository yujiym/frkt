import Loading from '@/components/Loading';
import Minter from '@/components/Minter';
import styles from '@/styles/Home.module.css';
import { ChainId } from '@biconomy/core-types';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers';
import { ethers } from 'ethers';
import Head from 'next/head';
import { useState } from "react";
import { useQuery } from 'urql';
import query from '../graphql/query';
import { Lit } from '../hooks/lit';
import { RPC_URL } from '../utils/constants';
import { SignContractInfos } from '../utils/types';

/**
 * Home Component
 * @returns 
 */
export default function Home() { 
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [litService, setLitService] = useState<Lit | null>(null);
  const [chainId, setChainId] = useState<number>(ChainId.BASE_GOERLI_TESTNET)
  const [pkpWallet, setPkpWallet] = useState<PKPEthersWallet | null>(null)

  // signId
  const signId = 1;

  // execute subgraph query
  const [result] = useQuery({ 
    query,
    variables: { signId },
  });
  const { data, fetching, error } = result;
  const queryResult: SignContractInfos = data;

  console.log("data:", queryResult)
  // base base Goerli RPC
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  /**
   * signUp
   */
  const signUp = async () => {
    setLoading(true);
    var newPkpWallet;
      
    try {
      if(litService == null || litService == undefined) {
        // init lit isntance
        const lit = new Lit();
        const newLitService = lit.create();
        setLitService(newLitService);

        // authicate (SignInにあたる)
        const authMethod = await newLitService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await newLitService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await newLitService!.getPkpWallet(pkp[0].publicKey, authMethod!);

        setAddress(pkp[0].ethAddress);
        setPkpWallet(newPkpWallet);
      } else {
        // authicate (SignInにあたる)
        const authMethod = await litService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await litService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await litService!.getPkpWallet(pkp[0].publicKey, authMethod!);

        setAddress(pkp[0].ethAddress);
        setPkpWallet(newPkpWallet);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false)
  }

  /**
   * signIn method
   */
  const signIn = async () => {
    try {
      setLoading(true);
      var newPkpWallet;

      if(litService == null || litService == undefined) {
        // init lit isntance
        const lit = new Lit();
        const newLitService = lit.create();
        setLitService(newLitService);

        // authicate (SignInにあたる)
        const authMethod = await newLitService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await newLitService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await newLitService!.getPkpWallet(pkp[0].publicKey, authMethod!);

        setAddress(pkp[0].ethAddress);
        setPkpWallet(newPkpWallet);
      } else {
        // authicate (SignInにあたる)
        const authMethod = await litService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await litService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await litService!.getPkpWallet(pkp[0].publicKey, authMethod!);

        setAddress(pkp[0].ethAddress);
        setPkpWallet(newPkpWallet);
      }

      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Lit ✖️ biconomy ✖️ The Graph</title>
        <meta name="description" content="Based Account Abstraction" />
      </Head>
      <main className={styles.main}>
        <h1>Lit ✖️ Safe ✖️ The Graph</h1>
        <h2>Connect and Sign Contract </h2>
        {!loading && !address && (
          <button 
            onClick={signUp} 
            className={styles.connect}
          >
            Sign Up
          </button>
        )}
        {!loading && !address && (
          <button 
            onClick={signIn} 
            className={styles.connect}
          >
            Sign In
          </button>
        )}
        {(loading || fetching ) && <Loading/>}
        {address && <h2>Smart Account: {address}</h2>}
        <>
          { data !== undefined && address && provider && (
            <Minter 
              address={address} 
              signId={signId}
              pkpWallet={pkpWallet!}
              chainId={chainId}
              provider={provider} 
              data={queryResult}
            />
          )}
        </>
      </main>
    </>
  )
}
