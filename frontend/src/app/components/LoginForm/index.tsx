"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../Button"
import { Form } from "../Form"
import styles from "./index.module.css"

type Inputs = {}

export function LoginForm() {
  const router = useRouter()
  const methods = useForm({ mode: "onChange" })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res: any = await fetch("http://localhost:8000/login", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = res.json()
    result.then((data: any) => {
      console.log({ data })
      if (data.result === "success") {
        router.push("/mypage")
      } else {
        setErrorMessage("メールアドレスまたはパスワードが間違っています")
      }
    })
  }

  const [isEmptyValue, setIsEmptyValue] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>("")

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <Form
          label="メールアドレス"
          type="text"
          value="email"
          setIsEmptyValue={setIsEmptyValue}
        />
        <Form
          label="パスワード"
          type="password"
          value="password"
          setIsEmptyValue={setIsEmptyValue}
        />
        <Button label="ログイン" type="submit" disabled={isEmptyValue} />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </form>
    </FormProvider>
  )
}
