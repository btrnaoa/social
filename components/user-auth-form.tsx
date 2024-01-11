"use client"

import { userAuthSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

interface UserAuthFormProps {
  action: string
  submitButtonText: string
  headerText: string
  footerText: string
  footerLink: string
  footerLinkText: string
}

export default function UserAuthForm({
  action,
  submitButtonText,
  headerText,
  footerText,
  footerLink,
  footerLinkText,
}: UserAuthFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof userAuthSchema>>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof userAuthSchema>) => {
    const formData = new FormData()
    formData.append("username", values.username)
    formData.append("password", values.password)

    const res = await fetch(action, {
      method: "POST",
      body: formData,
      redirect: "manual",
    })
    if (res.status === 0) {
      return router.refresh()
    }
  }

  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <Card className="w-80">
        <CardHeader className="text-lg font-medium">{headerText}</CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              action={action}
              method="post"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">
                      User Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {submitButtonText}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground">{footerText}</p>
            <Button className="ml-1 h-auto p-0 text-xs" variant="link" asChild>
              <Link href={footerLink}>{footerLinkText}</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
