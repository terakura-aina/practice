import styles from "./page.module.css"
import { Button } from "./components/Button"
import { RegisterForm } from "./components/RegisterForm"

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.signup}>
        <div className={styles.signupTitle} />
        <div className={styles.signupDescription}>
          登録して友達の写真や動画をチェックしよう
        </div>
        <Button
          logo={<span className={styles.signupFacebookLogo} />}
          label="Facebookでログイン"
        />
        <div className={styles.signupOr}>または</div>
        <RegisterForm />
      </div>
    </main>
  )
}
