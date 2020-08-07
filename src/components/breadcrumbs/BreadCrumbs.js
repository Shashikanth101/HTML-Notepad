import styles from './BreadCrumbs.module.css'
import BreadCrumb from './BreadCrumb'

export default function BreadCrumbs({ list }) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {list.map((item, index) => {
          // Final item
          if (index === list.length - 1) return <BreadCrumb item={item} key={item._id} itemStyle={styles.activeItem} />
          else return <BreadCrumb item={item} key={item._id} itemStyle={styles.prevItem} />
        })}
      </div>
    </div>
  )
}