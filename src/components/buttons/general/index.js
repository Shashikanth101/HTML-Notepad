import styles from './styles.module.css'
import { useState } from 'react'

export default function FunctionalButton({ text, title, handleOnClick, type }) {
  let buttonType = styles.default
  switch (type) {
    case 1:
      buttonType = styles.calm
      break
    case 2:
      buttonType = styles.danger
      break
    case 3:
      buttonType = styles.green
      break
    default:
      buttonType = styles.default
  }

  return (
    <div className={styles.buttonContainer}>
      <button className={`${styles.button} ${buttonType}`} onClick={handleOnClick} title={title}>{text}</button>
    </div>
  )
}