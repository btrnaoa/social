import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

interface PostSubmitButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean
}

export default function PostSubmitButton({
  isPending,
  onClick,
}: PostSubmitButton) {
  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      className="grid justify-items-center"
    >
      {isPending && <Loader2 className="animate-spin" />}
      <span className={cn({ invisible: isPending })}>Submit</span>
    </Button>
  )
}
