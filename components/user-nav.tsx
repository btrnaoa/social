import { getPageSession } from "@/lib/auth"
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
  const session = await getPageSession()
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 w-9 rounded-full">
            <UserAvatar name={session?.user.username} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="text-sm font-medium leading-none">
              {session?.user.username}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form action="/api/signout" method="post">
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
