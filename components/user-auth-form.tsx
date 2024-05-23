"use client"

import { authSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
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
  submitButtonText: string
  headerText: string
  footerText: string
  footerLink: string
  footerLinkText: string
  handleSubmit: (formData: FormData) => void
}

export default function UserAuthForm({
  submitButtonText,
  headerText,
  footerText,
  footerLink,
  footerLinkText,
  handleSubmit,
}: UserAuthFormProps) {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    const formData = new FormData()
    formData.append("username", values.username)
    formData.append("password", values.password)

    handleSubmit(formData)
  }

  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <Card className="w-80">
        <CardHeader className="text-lg font-medium">{headerText}</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">
                      Username
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
