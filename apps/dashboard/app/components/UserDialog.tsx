import { Form } from '@remix-run/react'
import { LogOut, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@@/components/ui/Dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@@/components/ui/AlertDialog'

export default function UserDialogContent({
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
        <div className="bg-gray-200 pt-16 pb-12">
          <div className="mx-auto rounded-full bg-orange-400 h-20 w-20" />
        </div>
        <div className="pt-8 px-8 pb-6">
          <button className="btn flex items-center w-full py-2 justify-center h-14 mb-4">
            <Save />
            <span className="ml-6">Save</span>
          </button>
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="btn-outline flex items-center w-full py-2 justify-center h-14">
                <LogOut />
                <span className="ml-6">LogOut</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Logout?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Form
                  method="post"
                  action="/auth/logout"
                  className="flex-1 border-t border-l border-foreground"
                >
                  <button className="flex items-center justify-center w-full h-full hover:bg-primary">
                    <LogOut />
                    <span className="ml-6">LogOut</span>
                  </button>
                </Form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}
