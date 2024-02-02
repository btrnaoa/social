import { postMutateSchema } from "@/lib/validations/post"
import { type UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"

interface PostMutateFormProps {
  form: UseFormReturn<z.infer<typeof postMutateSchema>>
}

export default function PostMutateForm({ form }: PostMutateFormProps) {
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
