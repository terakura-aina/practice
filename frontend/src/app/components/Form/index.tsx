import styles from "./index.module.css"

type Props = {
  label: string
  type: string
}
export function Form({ label, type }: Props) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>
        <input className={styles.formInput} type={type} placeholder=" " />
        <span className={styles.formInputDescription}>{label}</span>
      </label>
    </div>
  )
}
