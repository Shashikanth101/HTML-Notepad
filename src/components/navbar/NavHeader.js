import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import styles from './NavHeader.module.css'

export default function NavHeader({ publicPage, loginPage }) {

  async function handleLogout() {
    try {
      // This request clears all the cookies on the server
      const response = await axios.get('/api/auth/logout')

      // Upon Successfull logout
      if (response.status === 201) {
        localStorage.clear()
        Router.push('/')
      } else {
        console.log('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.appTitleComponent}>
          <Link href='/'><a>
            <span className={styles.appLogo}>📄</span>
          </a></Link>
          <Link href='/'><a>
            <span className={styles.appName}>HTML Notepad</span>
          </a></Link>
        </div>
        {publicPage ? 
          (loginPage ? (
              <div className={styles.navIconsContainer}>
                <Link href='/register'><a>
                  <button className={styles.loginButton} title='Create new account'>
                    <span>Sign up</span>
                  </button>
                </a></Link>
              </div>
            ) : (
              <div className={styles.navIconsContainer}>
                <Link href='/login'><a>
                  <button className={styles.loginButton} title='Login to an existing account'>
                    <span>Login</span>
                  </button>
                </a></Link>
              </div>
            )
          ) : (
            <div className={styles.navIconsContainer}>
              <Link href='/documents'><a>
                <span>
                  <img src='/icons/Folder3.ico' className={styles.navIcon} alt='Folder Icon' title='Documents' />
                </span>
              </a></Link>
              <Link href='/settings'><a>
                <span>
                  <img src='/icons/Profile.ico' className={styles.navIcon} alt='Profile Icon' title='Account' />
                </span>
              </a></Link>
              {/* <Link href='/logout'><a> */}
                <span onClick={handleLogout}>
                  <img src='/icons/Logout.ico' className={styles.navIcon} alt='Logout Icon' title='Logout' />
                </span>
              {/* </a></Link> */}
            </div>
          )
        }
      </div>
    </div>
  )
}