import styles from './ButtonContainer.module.css'

export default function ButtonContainer({ children }) {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}