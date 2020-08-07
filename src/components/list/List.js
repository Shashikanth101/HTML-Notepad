import styles from './List.module.css'
import ListItem from './ListItem'

export default function List({ list, handleDelete }) {

  if (list.length === 0) {
    return <p className={styles.emptyList}>You have no documents in your account.</p>
  } else return (
    <div className={styles.listContainer}>
      {list.map(listItem =>  {
        return (
          <ListItem 
            text={listItem.title} 
            redirectPage={listItem.redirectPage} 
            redirectTo={listItem.redirectTo} 
            handleDelete={handleDelete}
            id={listItem._id} 
            key={listItem._id} 
          />
        )})
      }
    </div>
  )
}