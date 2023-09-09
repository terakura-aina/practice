import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Props } from "./mypage"

export function useMypage(): Props {
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

  return {
    email: data.email,
    userName: data.userName,
    fullName: data.fullName,
  }
}
