import Link from 'next/link'
import styles from './styles.module.css'

export default function NavigationButton({ text, title, redirectPage, redirectTo }) {
  return (
    <div className={styles.buttonContainer}>
      <Link href={redirectPage} as={redirectTo}><a>
        <button className={styles.button} title={title}>{text}</button>
      </a></Link>
    </div>
  )
}