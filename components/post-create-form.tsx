import { postCreateSchema } from "@/lib/validations/post"
import { type UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"

interface PostCreateFormProps {
  form: UseFormReturn<z.infer<typeof postCreateSchema>>
}

export default function PostCreateForm({ form }: PostCreateFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
