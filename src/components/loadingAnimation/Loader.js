import styles from './Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loadingContainer}> 
      <div className={styles.ldsRing}>
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  )
}