import { z } from "zod"

export const schema = z.object({
  phoneOrEmail: z.string().min(2, { message: "2文字以上で入力してください" }),
  fullName: z.string().max(20, { message: "20文字以下で入力してください" }),
  userName: z.string().max(20, { message: "20文字以下で入力してください" }),
  password: z.string().min(6, { message: "6文字以上で入力してください" }),
})

export type Schema = z.infer<typeof schema>
