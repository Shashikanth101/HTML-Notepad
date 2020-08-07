import styles from './MarkdownDemo.module.css'
import {useState} from 'react';

export default function MarkdownDemo() {
  // Editor text
  const [normalText, setNormalText] = useState('')

  // Markdown Output Text
  const [outputText, setOutputText] = useState('')

  

  return (
    <div className={styles.parentContainer}>
      <span className={styles.heading}>
        <a href='' target='blank'>Learn Markdown</a>
      </span>
      <div className={styles.subContainer}>
        <div className={styles.editor}>
          <span>{normalText}</span>
        </div>
        <div className={styles.output}>
          <span>{outputText}</span>
        </div>
      </div>
    </div>
  )
}