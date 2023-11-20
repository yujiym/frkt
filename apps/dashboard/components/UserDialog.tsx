/* eslint-disable */
'use client'

import { LogOut, Save } from 'lucide-react'
import { signOut } from 'next-auth/react'
import WalletDialog from '~/components/WalletDialog'
import { Dialog, DialogContent, DialogTrigger } from '@@/components/ui/Dialog'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@@/components/ui/AlertDialog'
import { DASHBOARD_HOST } from '@@/lib/const'

export default function UserDialog({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger className="flex h-full w-full items-center">
        {children}
      </DialogTrigger>
      <DialogContent>
        <div className="pb-12 pt-16">
          <div className="mx-auto h-20 w-20 rounded-full bg-slate-300" />
        </div>
        <div className="border-foreground border-b border-t px-8 py-6">
          <label>name</label>
          <input className="mb-4 w-full" />
          <label>bio</label>
          <input className="mb-4 w-full" />
          <label>wallet</label>
          <WalletDialog>
            <a className="btn-outline w-full">Connect</a>
          </WalletDialog>
          <a className="btn flex h-14 w-full items-center justify-center py-2">
            <Save />
            <span className="ml-6">Save</span>
          </a>
        </div>
        {/* <div className="px-8 py-6">
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <a className="btn-outline flex h-14 w-full items-center justify-center py-2">
                <LogOut />
                <span className="ml-6">Logout</span>
              </a>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure to logout from FRKT Dashboard?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <a
                  className="hover:bg-primary flex h-full w-full items-center justify-center"
                  onClick={() =>
                    signOut({ callbackUrl: `${DASHBOARD_HOST}/login` })
                  }
                >
                  <LogOut />
                  <span className="ml-3">Logout</span>
                </a>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}
