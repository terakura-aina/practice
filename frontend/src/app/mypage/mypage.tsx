export type Props = {
  email: string
  userName: string
  fullName: string
}

export function Presentation({ email, userName, fullName }: Props) {
  return (
    <>
      {email !== "" && (
        <div>
          <h1>mypage</h1>
          <div>メールアドレス: {email}</div>
          <div>ユーザーネーム: {userName}</div>
          <div>フルネーム: {fullName}</div>
        </div>
      )}
    </>
  )
}
