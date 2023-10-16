import { LogOut, Save } from 'lucide-react'
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
import WalletDialog from '~components/WalletDialog'

export default function UserDialog({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full h-full flex items-center">
        {children}
      </DialogTrigger>
      <DialogContent>
        <div className="pt-16 pb-12">
          <div className="mx-auto rounded-full bg-slate-300 h-20 w-20" />
        </div>
        <div className="px-8 py-6 border-t border-b border-foreground">
          <label>name</label>
          <input className="w-full mb-4" />
          <label>bio</label>
          <input className="w-full mb-4" />
          <label>wallet</label>
          <WalletDialog>
            <button className="btn-outline w-full">Connect</button>
          </WalletDialog>
          <button className="btn flex items-center w-full py-2 justify-center h-14">
            <Save />
            <span className="ml-6">Save</span>
          </button>
        </div>
        <div className="px-8 py-6">
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <button className="btn-outline flex items-center w-full py-2 justify-center h-14">
                <LogOut />
                <span className="ml-6">Logout</span>
              </button>
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
                <button className="flex items-center justify-center w-full h-full hover:bg-primary">
                  <LogOut />
                  <span className="ml-3">Logout</span>
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}
