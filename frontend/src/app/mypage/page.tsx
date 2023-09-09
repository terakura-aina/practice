"use client"
import { Presentation } from "./mypage"
import { useMypage } from "./useMypage"

export default function Mypage() {
  const props = useMypage()
  return <Presentation {...props} />
}
