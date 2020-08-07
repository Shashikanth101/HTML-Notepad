import styles from  './FormBody.module.css'
import Link from 'next/link'

export default function FormFooter({ text, redirectText, redirectTo }) {
  return (
    <p className={styles.formFoot}>
    {text} <Link href={redirectTo}><a className={'anchor-links'}>{redirectText}</a></Link>
    </p>
  )
}