import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import styles from './styles.module.css'

export default function DeleteAccount() {
  // Component states
  const [dropDown, setDropDown] = useState(false)
  const [deleteAccountError, setDeleteAccountError] = useState({ isError: false, message: '' })
  const [password, setPassword] = useState('')

  function toggleDropDown() {
    setDropDown(previousState => !previousState)
  }

  function handleOnChange(event) {
    setDeleteAccountError({ isError: false, message: '' })
    const { value } = event.target
    setPassword(value)
  }

  function cancelAccountDeletion() {
    setDeleteAccountError({ isError: false, message: '' })
    setPassword('')
    setDropDown(false)
  }

  // Delete account
  async function deleteAccount(event) {
    event.preventDefault()
    try {
      console.log(password)
      const response = await axios.post('/api/user/delete', { password })

      if (response.status === 201) {
        // Logout the user
        const logoutResponse = await axios.get('/api/auth/logout')

        // Upon Successfull logout
        if (logoutResponse.status === 201) {
          localStorage.clear()

          // Redirect to home page
          Router.push('/')
        } else {
          setPassword('')
          setDeleteAccountError({ isError: true, message: 'Something went wrong. Try again later' })
        }
      } else {
        setPassword('')
        setDeleteAccountError({ isError: true, message: 'Something went wrong. Try again later' })
      }
    } catch (err) {
      console.log(err)
      setPassword('')
      setDeleteAccountError({ isError: true, message: err.response.data.message })
    }
  }

  return(
    <div className={styles.container}>
      <div className={styles.selector}>
        <span className={styles.title}>Delete Account</span>
        <button className={styles.closeButton} onClick={toggleDropDown}>{dropDown ? '>' : '<'}</button>
      </div>
      {dropDown && 
        <form className={styles.dropDown} method={'POST'}>
          <p className={styles.confirmationMessage}>Enter password for security reasons</p>
          <input className={styles.input} type={'password'} name={'password'} value={password.oldPassword} onChange={handleOnChange} placeholder={'Current password'} />
          <div className={styles.choiceBox}>
            <button className={`${styles.button} ${styles.danger}`} onClick={deleteAccount} type={'submit'}>Yes</button>
            <button className={`${styles.button} ${styles.no}`} onClick={cancelAccountDeletion} type={'reset'}>No</button>
          </div>
          {deleteAccountError.isError && <span className={styles.error}>{deleteAccountError.message}</span>}
        </form>
      }
    </div>
  )
}