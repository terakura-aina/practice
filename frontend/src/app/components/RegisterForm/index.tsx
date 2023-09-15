"use client"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../Button"
import { Form } from "../Form"
import styles from "./index.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../../validations/schema"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Inputs = {}

type NewMessage = {
  type?: string
  message?: string
}

export function RegisterForm() {
  const router = useRouter()
  const methods = useForm({ mode: "onChange", resolver: zodResolver(schema) })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res: any = await fetch("http://localhost:8000/registar", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await res.json()
    if (result.result === "success") router.push("/mypage")
  }
  const [isEmptyValue, setIsEmptyValue] = useState<boolean>(true)
  const [isInvalidValue, setIsInvalidValue] = useState<boolean>(true)
  const [errorMessages, setErrorMessages] = useState<NewMessage[]>([])

  const handleErrorMessage = (newError: NewMessage) => {
    setErrorMessages(
      (prevState) => buildErrorMessages(prevState, newError) as NewMessage[]
    )
  }

  const buildErrorMessages = (
    prevState: NewMessage[],
    newError: NewMessage
  ) => {
    // prevState(以前から存在しているエラー)がなければそのままnewErrorを返す
    if (prevState.length === 0) return [newError]
    const newErrorMessages = prevState.filter((p) => p.type !== newError.type)
    // newErrorのmessageがundefindの場合はその項目はエラーではなくなっているため、その項目を除いたエラーを返す
    if (!newError.message) return newErrorMessages
    // newErrorのmessageが存在する場合はその項目の前回のエラーを除いた結果に今回のエラーを追加して返す
    return [...newErrorMessages, newError]
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <Form
          label="携帯電話番号またはメールアドレス"
          type="text"
          value="email"
          setIsEmptyValue={setIsEmptyValue}
          setIsInvalidValue={setIsInvalidValue}
          handleErrorMessage={handleErrorMessage}
        />
        <Form
          label="フルネーム"
          type="text"
          value="fullName"
          setIsEmptyValue={setIsEmptyValue}
          setIsInvalidValue={setIsInvalidValue}
          handleErrorMessage={handleErrorMessage}
        />
        <Form
          label="ユーザーネーム"
          type="text"
          value="userName"
          setIsEmptyValue={setIsEmptyValue}
          setIsInvalidValue={setIsInvalidValue}
          handleErrorMessage={handleErrorMessage}
        />
        <Form
          label="パスワード"
          type="password"
          value="password"
          setIsEmptyValue={setIsEmptyValue}
          setIsInvalidValue={setIsInvalidValue}
          handleErrorMessage={handleErrorMessage}
        />
        <div className={styles.formNotes}>
          <span>
            サービスの利用者があなたの連絡先情報をInstagramにアップロードしている場合があります。
          </span>
          <a href="https://www.facebook.com/help/instagram/261704639352628">
            詳しくはこちら
          </a>
        </div>
        <div className={styles.signupTermsOfUse}>
          <span>登録することで、</span>
          <a href="https://help.instagram.com/581066165581870/?locale=ja_JP">
            Facebookの利用規約
          </a>
          <span>、</span>
          <a href="https://www.facebook.com/privacy/policy">
            プライバシーポリシー
          </a>
          <span>、</span>
          <a href="https://help.instagram.com/1896641480634370/">
            Cookieポリシー
          </a>
          <span>に同意するものとします。</span>
        </div>
        <Button
          label="登録する"
          type="submit"
          disabled={isEmptyValue || isInvalidValue}
        />
        {errorMessages && (
          <ul className={styles.errorMessages}>
            {errorMessages.map((message) => (
              <li key={message.type} className={styles.errorMessage}>
                {message.message}
              </li>
            ))}
          </ul>
        )}
      </form>
    </FormProvider>
  )
}
