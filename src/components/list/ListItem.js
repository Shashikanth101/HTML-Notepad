import styles from './List.module.css'
import Link from 'next/link'

export default function ListItem({ text, id, redirectPage, redirectTo, handleDelete }) {
  return (
    <div className={styles.listItem}>
      <Link href={redirectPage} as={redirectTo}><a className={styles.redirectLink}>
        {text.substring(0, 30)}{text.length > 30 && '...'}
      </a></Link>
      <span className={styles.deleteButton} title='Delete' onClick={() => handleDelete(id)}>
        <img className={styles.iconSvg} src={'/svg_icons/trash.svg'} alt={'Delete Icon'} />
      </span>
    </div>
  )
}