import styles from "./index.module.css"
import { useFormContext } from "react-hook-form"
import { useEffect, useState } from "react"

type Props = {
  label: string
  type: string
  value: string
  setIsEmptyValue: React.Dispatch<React.SetStateAction<boolean>>
  setIsInvalidValue: React.Dispatch<React.SetStateAction<boolean>>
}

export function Form({
  label,
  type,
  value,
  setIsEmptyValue,
  setIsInvalidValue,
}: Props) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext()

  const [ng, setNg] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)

  useEffect(() => {
    setIsEmptyValue(
      Object.values(getValues()).filter((value) => value === "").length > 0
    )
    setIsInvalidValue(Object.keys(errors).length > 0)
  }, [ng, getValues(value)])

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>
        <input
          className={styles.formInput}
          type={type}
          placeholder=" "
          {...register(value)}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
            errors[value] ? setNg(true) : setNg(false)
          }}
        />
        <span className={styles.formInputDescription}>{label}</span>
        {ng && !focus ? <span className={styles.ngBtn} /> : null}
        {!ng && getValues(value) ? <span className={styles.check} /> : null}
      </label>
    </div>
  )
}
