import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import styles from './styles.module.css'

export default function ChangePassword() {
  // Component states
  const [dropDown, setDropDown] = useState(false)
  const [passwordChangeError, setPasswordChangeError] = useState({ isError: false, message: '' })
  const [password, setPassword] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  function toggleDropDown() {
    setDropDown(previousState => !previousState)
  }

  function handleOnChange(event) {
    setPasswordChangeError({ isError: false, message: '' })
    const { name, value } = event.target
    setPassword(previousState => {
      return {
        ...previousState,
        [name]: value
      }
    })
  }

  function resetPassword() {
    setPassword({ oldPassword: '', newPassword: '', confirmPassword: '' })
  }

  function cancelPasswordChange() {
    resetPassword()
    setPasswordChangeError({ isError: false, message: '' })
    setDropDown(false)
  }
  
  async function changePassword(event) {
    event.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = password
    if (newPassword !== confirmPassword) {
      return setPasswordChangeError({ isError: true, message: 'New password and confirm password don\'t match'})
    }
    try {
      const response = await axios.patch('/api/user/password', { oldPassword, newPassword })

      if (response.status === 201) {
        // Logout the user
        const logoutResponse = await axios.get('/api/auth/logout')

        // Upon Successfull logout
        if (logoutResponse.status === 201) {
          localStorage.clear()

          // Redirect to login page
          Router.push('/login')
        } else {
          setPasswordChangeError({ isError: true, message: 'Something went wrong. Try again later' })
          resetPassword()
        }
      } else {
        setPasswordChangeError({ isError: true, message: 'Something went wrong. Try again later' })
        resetPassword()
      }
    } catch (err) {
      console.log(err)
      setPasswordChangeError({ isError: true, message: err.response.data.message })
      resetPassword()
    }
  }
  
  return(
    <div className={styles.container}>
      <div className={styles.selector}>
        <span className={styles.title}>Change Password</span>
        <button className={styles.closeButton} onClick={toggleDropDown}>{dropDown ? '>' : '<'}</button>
      </div>
      {dropDown && 
        <form className={styles.dropDown} method={'POST'}>
          <input className={styles.input} type={'password'} name={'oldPassword'} value={password.oldPassword} onChange={handleOnChange} placeholder={'Old password'} />
          <input className={styles.input} type={'password'} name={'newPassword'} value={password.newPassword} onChange={handleOnChange} placeholder={'New password'} />
          <input className={styles.input} type={'password'} name={'confirmPassword'} value={password.confirmPassword} onChange={handleOnChange} placeholder={'Confirm password'} />
          <div className={styles.choiceBox}>
            <button className={`${styles.button} ${styles.yes}`} onClick={changePassword} type={'submit'}>save</button>
            <button className={`${styles.button} ${styles.no}`} onClick={cancelPasswordChange} type={'reset'}>cancel</button>
          </div>
          {passwordChangeError.isError && <span className={styles.error}>{passwordChangeError.message}</span>}
        </form>
      }
    </div>
  )
}