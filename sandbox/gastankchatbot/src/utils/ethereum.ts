import { Wallet } from "ethers";

/**
 * getPushSinger Object
 */
export const getPushSigner = async(): Promise<any> => {
  const res = await fetch('/api/env')
  const { env } = await res.json()
  console.log('env:', env)
  // get env data
  const signer = new Wallet(env.PUSH_SIGNER_KEY);
  return signer;
};