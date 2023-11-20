'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from './ui/Input'
import { Label } from './ui/Label'

const formSchema = z.object({
  name: z.string(),
})

export default function AppForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb-6 text-xl font-bold">Basic</h3>
      <div className="mb-4">
        <Label>Name</Label>
        <Input
          {...register('name')}
          placeholder="Your app name"
          defaultValue="My Awesome App"
        />
      </div>
      <div className="mb-4">
        <Label>Deploy chain</Label>
        <div className="flex">
          <label className="mx-4 my-2 flex cursor-pointer items-center justify-center rounded-xl">
            <input
              type="radio"
              {...(register('chainId'), { name: 'chainId' })}
              value={84531}
            />
            <img
              src="https://icons.llamao.fi/icons/chains/rsz_base.jpg"
              width="32"
              height="32"
              className="mx-2 rounded-full"
            />
            Base Goerli
          </label>
          <label className="mx-4 my-2 flex cursor-pointer items-center justify-center rounded-xl">
            <input
              type="radio"
              {...(register('chainId'), { name: 'chainId' })}
              value={43113}
            />
            <img
              src="https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg"
              width="32"
              height="32"
              className="mx-2 rounded-full"
            />
            Avalanche Fuji Testnet
          </label>
        </div>
      </div>
      <button className="btn mt-6 w-full px-6 py-2" type="submit">
        Save
      </button>
    </form>
  )
}
