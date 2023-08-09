import { Button } from '../Button'
import { Form } from '../Form'
import styles from './index.module.css'

export function RegisterForm() {
  return (
    <form className={styles.form}>
      <Form label='携帯電話番号またはメールアドレス' type='text' />
      <Form label='フルネーム' type='text' />
      <Form label='ユーザーネーム' type='text' />
      <Form label='パスワード' type='password' />
      <div className={styles.formNotes}>
        <span>
          サービスの利用者があなたの連絡先情報をInstagramにアップロードしている場合があります。
        </span>
        <a href='https://www.facebook.com/help/instagram/261704639352628'>
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
      <Button label='登録する' type='submit' disabled />
    </form>
  )
}