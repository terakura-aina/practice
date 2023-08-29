"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Mypage() {
  const router = useRouter()
  const [data, setData] = useState("")
  const fetchData = async () => {
    const res: any = await fetch(`http://localhost:8000/profile`, {
      cache: "no-store",
    })
    const result = await res.json()
    if (result.result === "no_session") {
      router.push("/login")
    } else if (result.result === "session_exists") {
      setData(result)
    }
  }

  useEffect(() => {
    fetchData()
  }, [data])

  return (
    <>
      {data && (
        <div>
          <h1>mypage</h1>
          {/* <div>email: {data.}</div> */}
        </div>
      )}
    </>
  )
}
