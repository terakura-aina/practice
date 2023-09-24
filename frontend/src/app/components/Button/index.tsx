"use client"
import { useRouter } from "next/navigation"
import { Result } from "@/app/mypage/useMypage"
import { ReactNode } from "react"
import styles from "./index.module.css"

export type Props = {
  logo?: ReactNode
  label: string
  logout?: () => Promise<Result>
} & JSX.IntrinsicElements["button"]

export function Button({ logo, label, logout, ...rest }: Props) {
  const router = useRouter()

  const handleClick = async () => {
    if (!logout) return
    const result = await logout()
    if (result.result === "success") {
      router.push("/login")
    }
  }

  return (
    <button
      {...rest}
      className={
        logo != undefined
          ? `${styles.secondary} ${styles.withLogo}`
          : `${styles.secondary}`
      }
      onClick={() => {
        handleClick()
      }}
    >
      {logo}
      {label}
    </button>
  )
}
