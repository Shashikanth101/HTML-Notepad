import styles from './FormBody.module.css'

export default function FormBody({ children, handleFormSubmit }) {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
}