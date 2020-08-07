import styles from './BreadCrumbs.module.css'
import Link from 'next/link'

export default function BreadCrumb({ item, itemStyle }) {
  const { text, redirectPage, redirectTo } = item
  return (
    <div className={styles.itemBody}>
      <Link href={redirectPage} as={redirectTo}><a>
        <span className={`${styles.item} ${itemStyle}`} title={text}>
          {text.substring(0, 20)}{text.length >= 20 && '...'}
        </span>
      </a></Link>
      <span className={`${styles.item} ${styles.nextItemIndicator}`}>{'>'}</span>
    </div>
  )
}