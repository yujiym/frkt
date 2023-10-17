import Loading from '@/components/Loading';
import Minter from '@/components/Minter';
import { Biconomy } from '@/hooks/biconomy';
import styles from '@/styles/Home.module.css';
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ChainId } from '@biconomy/core-types';
import { ethers } from 'ethers';
import Head from 'next/head';
import { useState } from "react";
import { Lit } from './../hooks/lit';
import { RPC_URL } from './../utils/constants';

// base Goerli RPC
const rpc_url = RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(rpc_url);

/**
 * Home Component
 * @returns 
 */
export default function Home() { 
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null);
  const [biconomyService, setbiconomyService] = useState<Biconomy | null>(null);
  const [litService, setLitService] = useState<Lit | null>(null);
  const [chainId, setChainId] = useState<number>(ChainId.AVALANCHE_TESTNET)

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
      } else {
        // authicate (SignInにあたる)
        const authMethod = await litService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await litService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await litService!.getPkpWallet(pkp[0].publicKey, authMethod!);
      }

      if(biconomyService == null || biconomyService == undefined) {
        // init Bicnomy isntance
        const biconomy = new Biconomy();
        const newBicocomyService = biconomy.create(chainId);
        setbiconomyService(newBicocomyService);
        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await newBicocomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
      } else {
        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await biconomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
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
      } else {
        // authicate (SignInにあたる)
        const authMethod = await litService!.authenticateWithWebAuthn();
        // get PKPS 
        const pkp = await litService!.getPKPs(authMethod!);
        // get new pkpWallet
        newPkpWallet = await litService!.getPkpWallet(pkp[0].publicKey, authMethod!);
      }

      if(biconomyService == null || biconomyService == undefined) {
        // init Bicnomy isntance
        const biconomy = new Biconomy();
        const newBicocomyService = biconomy.create(chainId);
        setbiconomyService(newBicocomyService);

        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await newBicocomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
      } else {
        // create smartWallet
        const {
          smartContractAddress: smartWalletAddress,
          biconomySmartAccount: smartAccount
        } = await biconomyService!.createSmartWallet(newPkpWallet);
        
        setAddress(smartWalletAddress)
        setSmartAccount(smartAccount)
      }   

      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Head>
        <title>Lit ✖️ biconomy</title>
        <meta name="description" content="Based Account Abstraction" />
      </Head>
      <main className={styles.main}>
        <h1>Lit ✖️ biconomy</h1>
        <h2>Connect and Mint your AA powered NFT now</h2>
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
        {loading && <p><Loading/></p>}
        {address && <h2>Smart Account: {address}</h2>}
        {smartAccount && provider && (
          <Minter 
            biconomyService={biconomyService!}
            smartAccount={smartAccount} 
            address={address} 
            provider={provider} 
          />
        )}
      </main>
    </>
  )
}
