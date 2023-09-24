import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Props } from "./mypage"

type ProfileResult = {
  result: string
  user: User
}

type User = {
  email: string
  fullName: string
  userName: string
}

export type Result = {
  result: string
}

export function useMypage(): Props {
  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    fullName: "",
    userName: "",
  })
  const fetchData = async () => {
    const res = await fetch(`http://localhost:8000/profile`, {
      credentials: "include",
      cache: "no-store",
    })
    const result = (await res.json()) as ProfileResult
    if (result.result === "no_session") {
      router.push("/login")
    } else if (result.result === "session_exists") {
      setData(result.user)
    }
  }

  const logout = async () => {
    const res = await fetch("http://localhost:8000/logout", {
      credentials: "include",
      cache: "no-store",
    })
    return (await res.json()) as unknown as Result
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    email: data.email,
    userName: data.userName,
    fullName: data.fullName,
    logout,
  }
}
