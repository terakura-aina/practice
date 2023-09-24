import { Button } from "../components/Button"
import { Result } from "./useMypage"

export type Props = {
  email: string
  userName: string
  fullName: string
  logout: () => Promise<Result>
}

export function Presentation({ email, userName, fullName, logout }: Props) {
  return (
    <>
      {email !== "" && (
        <div>
          <h1>mypage</h1>
          <div>メールアドレス: {email}</div>
          <div>ユーザーネーム: {userName}</div>
          <div>フルネーム: {fullName}</div>
          <Button label="ログアウト" type="submit" logout={logout} />
        </div>
      )}
    </>
  )
}
