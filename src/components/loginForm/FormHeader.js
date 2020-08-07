import styles from  './FormBody.module.css'

export default function FormHeader({ text }) {
  return <p className={styles.formHeading}>{text}</p>
}