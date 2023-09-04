"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Mypage() {
  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    fullName: "",
    userName: "",
  })
  const fetchData = async () => {
    const res: any = await fetch(`http://localhost:8000/profile`, {
      credentials: "include",
      cache: "no-store",
    })
    const result = await res.json()
    if (result.result === "no_session") {
      router.push("/login")
    } else if (result.result === "session_exists") {
      setData(result.user)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {data.email !== "" && (
        <div>
          <h1>mypage</h1>
          <div>メールアドレス: {data.email}</div>
          <div>ユーザーネーム: {data.userName}</div>
          <div>フルネーム: {data.fullName}</div>
        </div>
      )}
    </>
  )
}
