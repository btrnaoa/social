import { getPageSession } from "@/lib/auth"
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default async function UserNav({ className }: UserNavProps) {
  const session = await getPageSession()
  if (!session) {
    return <p>Oops!</p>
  }
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relatiev h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="https://github.com/btrnaoa.png"
                alt="@btrnaoa"
              />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="text-sm font-medium leading-none">
              {session.user.username}
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
