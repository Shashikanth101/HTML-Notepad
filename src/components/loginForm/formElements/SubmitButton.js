import styles from './SubmitButton.module.css'

export default function SubmitButton({ text, loading }) {
  return (
    <button className={styles.loginButton} type={'submit'} >
      {loading ? '...' : text}
    </button>
  )
}