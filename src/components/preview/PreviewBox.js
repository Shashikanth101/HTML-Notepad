import styles from './PreviewBox.module.css'
import ReactMarkdown from 'react-markdown'

export default function PreviewBox({ text }) {
  return (
    <div className={styles.previewBox}>
      <ReactMarkdown source={text}/>
    </div>
  )
}