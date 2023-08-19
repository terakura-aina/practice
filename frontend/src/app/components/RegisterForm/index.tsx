"use client"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../Button"
import { Form } from "../Form"
import styles from "./index.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../../validations/schema"
import { useState } from "react"

type Inputs = {}

type NewMessage = {
  type?: string
  message?: string
}

export function RegisterForm() {
  const methods = useForm({ mode: "onChange", resolver: zodResolver(schema) })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log({ data })
  const [isEmptyValue, setIsEmptyValue] = useState<boolean>(true)
  const [isInvalidValue, setIsInvalidValue] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<NewMessage[]>([])

  const handleErrorMessage = (newMessage: NewMessage) => {
    // TODO: 一つの項目に対してエラーメッセージは1つだけ出るように修正する
    if (newMessage.message) {
      setErrorMessage((prevState) => [...prevState, newMessage])
      console.log({ errorMessage })
    }
  }

  const handleClick = () => {
    // TODO: 登録処理を書く
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
          onClick={() => handleClick()}
        />
        {errorMessage && (
          <ul className={styles.errorMessages}>
            {errorMessage.map((message) => (
              <li className={styles.errorMessage}>{message.message}</li>
            ))}
          </ul>
        )}
      </form>
    </FormProvider>
  )
}
