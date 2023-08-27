"use client"
import styles from "./page.module.css"
import { LoginForm } from "../components/LoginForm"

export default async function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.login}>
        <div className={styles.loginTitle} />
        <LoginForm />
      </div>
    </main>
  )
}
