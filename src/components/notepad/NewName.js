import styles from './NewName.module.css'

export default function NewName({ value, handleOnChange }) {
  return (
    <div className={styles.textInputContainer}>
      <input name={'title'} placeholder={'Document Name'} className={styles.textInput} value={value} onChange={handleOnChange} />
    </div>
  )
}