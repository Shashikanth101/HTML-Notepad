import styles from './ErrorBox.module.css'

export default function ErrorBox({ text }) {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.box}>
        <span className={styles.errorSymbol}>i</span> 
        <span>{text}</span>
      </div>
    </div>
  )
}