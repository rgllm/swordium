import Link from 'next/link'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import SignButton from '../signbutton'

export function MembersOnlyDialog() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Members Only Content
          </DialogTitle>
          <DialogDescription className="pt-2 text-center">
            Only signin users can read the article.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-3 py-4">
          <SignButton />
        </div>
        <DialogFooter className="flex justify-center">
          <Link href="/">
            <Button variant="ghost">Return to Homepage</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
