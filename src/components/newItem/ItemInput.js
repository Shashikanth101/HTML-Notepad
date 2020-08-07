import { useState } from 'react'
import styles from './ItemInput.module.css'

export default function ItemInput({ placeholderText, handleNewInput, inputTitle, buttonTitle }) {
  const [input, setInput] = useState('')

  function handleOnChange(event) {
    setInput(event.target.value)
  }

  function formSubmission(event) {
    event.preventDefault()
    handleNewInput(input)
    setInput('')
  }

  return (
    <form className={styles.form} onSubmit={formSubmission}>
      <input 
        className={styles.input} 
        type={'text'} 
        placeholder={placeholderText} 
        onChange={handleOnChange} 
        value={input} 
        required={true} 
        title={inputTitle}
      />
      <button className={styles.button} type={'submit'} title={buttonTitle}>+</button> 
    </form>
  )
}