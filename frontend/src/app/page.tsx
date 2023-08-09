import Image from 'next/image'
import data from './data'
import styles from './page.module.css'

export default async function Home() {
  const res: any = await data()
  console.log(res)
  {res.map((fruits: any) => {
    console.log(fruits.name)
  })}
  return (
    <main className={styles.main}>
        <div className={styles.signup}>
          <div className={styles.signupTitle} />
          <div className={styles.signupDescription}>
            登録して友達の写真や動画をチェックしよう
          </div>
          <button className={styles.signupFacebook}>
            <span className={styles.sugnupFacebookLogo} />
            Facebookでログイン
          </button>
          <div className={styles.signupOr}>または</div>
          <form className={styles.signupForm}>
            <div className={styles.signupInputUnity}>
              <label className={styles.signupLabel}>
                <input className={styles.signupInput} type='text' placeholder=' ' />
                <span className={styles.signupInputDescription}>携帯電話番号またはメールアドレス</span>
              </label>
            </div>
            <div className={styles.signupInputUnity}>
              <label className={styles.signupLabel}>
                <input className={styles.signupInput} type='text' placeholder=' ' />
                <span className={styles.signupInputDescription}>フルネーム</span>
              </label>
            </div>
            <div className={styles.signupInputUnity}>
              <label className={styles.signupLabel}>
                <input className={styles.signupInput} type='text' placeholder=' ' />
                <span className={styles.signupInputDescription}>ユーザーネーム</span>
              </label>
            </div>
            <div className={styles.signupInputUnity}>
              <label className={styles.signupLabel}>
                <input className={styles.signupInput} type='passward' placeholder=' ' />
                <span className={styles.signupInputDescription}>パスワード</span>
              </label>
            </div>
            <div className={styles.signupNotes}>
              <span>
                サービスの利用者があなたの連絡先情報をInstagramにアップロードしている場合があります。
              </span>
              <a className={styles.signupNotesReadMore} href='https://www.facebook.com/help/instagram/261704639352628'>
                詳しくはこちら
              </a>
            </div>
            <div className={styles.signupTermsOfUse}>
              <span>登録することで、</span>
              <a href='https://help.instagram.com/581066165581870/?locale=ja_JP'>Facebookの利用規約</a>
              <span>、</span>
              <a href='https://www.facebook.com/privacy/policy'>プライバシーポリシー</a>
              <span>、</span>
              <a href='https://help.instagram.com/1896641480634370/'>Cookieポリシー</a>
              <span>に同意するものとします。</span>
            </div>
            <input type='submit' value='登録する' className={styles.signupSubmit} disabled />
          </form>
        </div>
    </main>
  )
}
