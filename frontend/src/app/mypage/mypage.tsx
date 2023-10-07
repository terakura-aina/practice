import { Dispatch, SetStateAction } from "react"
import { Button } from "../components/Button"
import { Result, User } from "./useMypage"

export type Props = {
  data: User
  setData: Dispatch<SetStateAction<User>>
  handleDoubleClick: () => void
  isEditing: boolean
  logout: () => Promise<Result>
  updateUserData: (data: { email: string }) => void
}

export function Presentation({
  data,
  setData,
  handleDoubleClick,
  isEditing,
  logout,
  updateUserData,
}: Props) {
  return (
    <>
      {data.email !== "" && (
        <div>
          <h1>mypage</h1>
          {isEditing ? (
            <label>
              メールアドレス：
              <input
                type="text"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    updateUserData({ email: data.email })
                  }
                }}
              />
            </label>
          ) : (
            <div onDoubleClick={handleDoubleClick}>
              メールアドレス: {data.email}
            </div>
          )}
          <div>ユーザーネーム: {data.userName}</div>
          <div>フルネーム: {data.fullName}</div>
          <Button label="ログアウト" type="submit" logout={logout} />
        </div>
      )}
    </>
  )
}
