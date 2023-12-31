'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Label } from './ui/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@@/components/ui/Select'

const formSchema = z.object({
  appId: z.string(),
})

export default function RecipeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appId: 'app1',
      authMethod: 'webauthn',
      contractName: 'Sample FRKT NFT',
      contractSymbol: 'FRKT',
      contractDescription: 'This is a sample NFT for FRKT',
      tokenBaseUri:
        'https://ipfs.io/ipfs/bafkreihqr3gsngvujcyz3kfvq3v35cijvnj7acyydiaqvzvsg6s453mzxq',
      chainId: 43113,
    },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label>Target app</Label>
          <Select defaultValue="app1">
            <SelectTrigger className="w-full">
              <SelectValue {...register('appId')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="app1">App1</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-red-300">{}</span>
        </div>
        <div className="mb-4">
          <Label>Auth method</Label>
          <div className="flex">
            <label className="mx-4 my-2 flex cursor-pointer items-center justify-center rounded-xl">
              <input
                type="radio"
                className="mr-2"
                {...(register('authMethod'), { name: 'authMethod' })}
                value="webauthn"
                defaultChecked={true}
              />
              Webauthn
            </label>
            <label className="mx-4 my-2 flex cursor-pointer items-center justify-center rounded-xl">
              <input
                type="radio"
                className="mr-2"
                {...(register('authMethod'), { name: 'authMethod' })}
                value="google"
                defaultChecked={false}
              />
              Bypass Google Oauth
            </label>
          </div>
          <div className="mb-4">
            <Label>ChainId</Label>
            <Input {...register('chainId')} />
          </div>
          <div className="mb-4">
            <Label>Contract Name</Label>
            <Input {...register('contractName')} />
          </div>
          <div className="mb-4">
            <Label>Contract Symbol</Label>
            <Input {...register('contractSymbol')} />
          </div>
          <div className="mb-4">
            <Label>Contract Description</Label>
            <Input {...register('contractDescription')} />
          </div>
          <div className="mb-4">
            <Label>Token Base URL</Label>
            <Input {...register('tokenBaseUri')} />
          </div>
        </div>
        <button className="btn mt-6 w-full px-6 py-2" type="submit">
          Save
        </button>
      </form>
    </>
  )
}
