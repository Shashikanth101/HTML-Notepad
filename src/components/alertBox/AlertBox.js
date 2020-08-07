import styles from './AlertBox.module.css'

export default function AlertBox({ text, onYes, onNo }) {
  return (
    <div className={styles.alertBoxContainer}>
      <div className={styles.alertBox}>
        <p className={styles.message}>{text}</p>
        <div className={styles.optionsContainer}>
          <button className={`${styles.option} ${styles.yesOption}`} onClick={onYes}>yes</button>
          <button className={`${styles.option} ${styles.noOption}`} onClick={onNo}>no</button>
        </div>
      </div>
    </div>
  )
}