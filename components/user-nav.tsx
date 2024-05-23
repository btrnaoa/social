import { signout } from "@/lib/actions/auth"
import { validateRequest } from "@/lib/auth"
import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import UserAvatar from "./user-avatar"

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default async function UserNav({ className }: UserNavProps) {
  const { user } = await validateRequest()

  if (!user) return null

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 w-9 rounded-full">
            <UserAvatar name={user.username} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="text-sm font-medium leading-none">{user.username}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form action={signout}>
            <DropdownMenuItem asChild>
              <button type="submit" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
