'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string(),
})

export default function AppGasForm() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-6 text-xl font-bold">Deposit gas</h3>
        <button className="btn mt-6 w-full px-6 py-2" type="submit">
          Deposit
        </button>
      </form>
      <div className="mb-8 mt-12 border-b border-black" />
      <div>
        <h3 className="mb-6 text-xl font-bold">Notify gas is low</h3>
        <button className="btn mt-6 w-full px-6 py-2" type="submit">
          Set
        </button>
      </div>
    </>
  )
}
