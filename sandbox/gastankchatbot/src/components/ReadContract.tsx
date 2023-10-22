'use client'

import * as PushAPI from '@pushprotocol/restapi';
import { NotificationItem, chainNameType } from '@pushprotocol/uiweb';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { BaseError } from 'viem';
import { useAccount, useContractRead } from 'wagmi';
import { getPushSigner } from './../utils/ethereum';
import { tokenPayMasterContractConfig } from './contracts';

export function ReadContract() {
  return (
    <div>
      <div>
        <BalanceOf />
      </div>
      <div>
        <Notifications/>
      </div>
    </div>
  )
}

function BalanceOf() {
  const { address } = useAccount()
  
  const { data, error, isSuccess } = useContractRead({
    ...tokenPayMasterContractConfig,
    functionName: 'paymasterIdBalances',
    args: [address!],
    enabled: Boolean(address),
  })

  let balance = '0'
  const env: any = 'staging'

  if (data != undefined) {
    balance = ethers.utils.formatEther(data!.toString())
  }

  useEffect(() => {
    // send notificate
    const sendNotificate = async() => {
      const signer = await getPushSigner();
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, 
        identityType: 2, 
        notification: {
          title: `[FRKT] TokenPaymaster's balance is very low!!`,
          body: `[FRKT] TokenPaymaster's balance is very low!! Please deposit!!`
        },
        payload: {
          title: `[FRKT] TokenPaymaster's balance is very low!!`,
          body: `[FRKT] TokenPaymaster's balance is very low!! Please deposit!!`,
          cta: '',
          img: ''
        },
        recipients: `eip155:5:${address}`, 
        channel: 'eip155:5:0xef902bbE4967ac7A5Ec22039cA2d994325A36dB9', 
        env: env
      });
      console.log('apiResponse:', apiResponse)
    }

    if(Number(balance) <= 0.005) {
      sendNotificate()
    }
  }, [balance])

  // TODO add send notification logic

  return (
    <div>
      balance: {isSuccess && balance} ETH
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  )
}

function Notifications() {
  const { address } = useAccount()
  const [theme, setTheme] = useState('light');
  const [spams, setSpams] = useState<PushAPI.ParsedResponseType[]>();

  const env: any = 'staging'

  const loadSpam = useCallback(async () => {
    try {
      // get channel data
      const channelData = await PushAPI.channels.getChannel({
        channel: `eip155:5:0xef902bbE4967ac7A5Ec22039cA2d994325A36dB9`, 
        env: env
      });
      console.log('channelData:', channelData)

      // get spams
      const spamDatas: PushAPI.ParsedResponseType[] = await PushAPI.user.getFeeds({
        user: `eip155:5:${address}`, 
        spam: true,
        env: env
      });
      console.log('spamData:', spamDatas)
      setSpams(spamDatas)
    } catch (e) {
      console.error(e);
    } 
  }, [address]);

  useEffect(() => {
    loadSpam();
  }, [address, loadSpam]);

  return (
    <div>
      <>
        {spams ? (
          <div>
            {spams.map((oneNotification:any, i:any) => {
              const { 
                cta,
                title,
                message,
                app,
                icon,
                image,
                url,
                blockchain,
                secret,
                notification
              } = oneNotification;

              return (
                <NotificationItem
                  key={`spam-${i}`}
                  notificationTitle={secret ? notification['title'] : title}
                  notificationBody={secret ? notification['body'] : message}
                  cta={cta}
                  app={app}
                  icon={icon}
                  image={image}
                  url={url}
                  theme={theme}
                  chainName={blockchain as chainNameType}
                  // optional parameters for rendering spambox
                  isSpam
                  subscribeFn={async () => console.log("yayy spam")}
                  isSubscribedFn={async () => false}
                />
              );
            })}
          </div>
        ): null}
      </>
    </div>
  );
}