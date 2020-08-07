import styles from './EditBox.module.css'

export default function EditBox({ rows, value, handleOnChange }) {
  return (
    <div className={styles.textBoxContainer}>
      <textarea name={'content'} rows={rows} cols={75} className={styles.textBox} value={value} onChange={handleOnChange} />
    </div>
  )
}