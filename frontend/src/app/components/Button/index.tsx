import { ReactNode } from 'react'
import styles from './index.module.css'

type Props = {
  logo?: ReactNode,
  label: string,
} & JSX.IntrinsicElements['button']

export function Button({logo, label, ...rest}: Props) {
  return (
    <button {...rest} className={logo != undefined ? `${styles.secondary} ${styles.withLogo}` : `${styles.secondary}`}>
      {logo}
      {label}
    </button>
  )
}