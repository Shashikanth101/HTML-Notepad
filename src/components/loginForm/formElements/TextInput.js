import styles from './TextInput.module.css'

export default function TextInput({ type, name, placeholder, value, handleOnChangeFunction }) {
  return (
    <input 
      className={styles.textInput}
      name={name}
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={handleOnChangeFunction}
      required={true}
    />
  )
}