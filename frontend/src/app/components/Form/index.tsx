import styles from "./index.module.css"
import { useFormContext } from "react-hook-form"
import { useState } from "react"

type Props = {
  label: string
  type: string
  value: string
  setIsEmptyValue: React.Dispatch<React.SetStateAction<boolean>>
  setIsInvalidValue?: React.Dispatch<React.SetStateAction<boolean>>
  handleErrorMessage?: (newMessage: object) => void
}

type ValidateResult = {
  result: string
  message?: string
}

export function Form({
  label,
  type,
  value,
  setIsEmptyValue,
  setIsInvalidValue,
  handleErrorMessage,
}: Props) {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
  } = useFormContext()

  const [ng, setNg] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)

  const onBlur = async () => {
    if (!setIsInvalidValue) {
      // login
      setIsEmptyValue(
        Object.values(getValues()).filter((value) => value === "").length > 0
      )
    } else {
      // regstar
      const params = { type: value, value: getValues(value) }
      const query = new URLSearchParams(params)
      const res = await fetch(`http://localhost:8000/validate?${query}`, {
        cache: "no-store",
      })
      const result = (await res.json()) as ValidateResult
      if (result.result === "failure") {
        setError(value, { message: result.message })
      }
      setIsEmptyValue(
        Object.values(getValues()).filter((value) => value === "").length > 0
      )
      setIsInvalidValue(Object.keys(errors).length > 0)
      errors[value] ? setNg(true) : setNg(false)
    }
  }

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} htmlFor={label}>
        <input
          id={label}
          autoComplete="off"
          className={styles.formInput}
          type={type}
          placeholder=" "
          {...register(value)}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
            onBlur()

            if (!handleErrorMessage) return
            if (errors[value]) {
              handleErrorMessage({
                type: value,
                message: `${label}は${errors[value]?.message}`,
              })
            } else {
              handleErrorMessage({
                type: value,
              })
            }
          }}
        />
        <span className={styles.formInputDescription}>{label}</span>
        {ng && !focus ? <span className={styles.ngBtn} /> : null}
        {!ng && getValues(value) ? <span className={styles.check} /> : null}
      </label>
    </div>
  )
}
