import Cookies from 'universal-cookie'
import PublicLayout from '../components/layouts/PublicLayout'
import AuthLayout from '../components/layouts/AuthLayout'
import styles from '../../styles/utils.module.css'

export default function Home({ loggedIn }) {

  const HomePageContent = (
    <div className={styles.landingPage}>
      <div className={styles.landingPageContent}>
        <h1 className={styles.landingPageHeading}>Start documenting your work without hassle</h1>
        <p className={styles.landingPageSubHeading}>Powered by Markdown editor</p>
      </div>
    </div>
  )

  return ( loggedIn
    ? <AuthLayout title={'HTML Notepad'}>
      {HomePageContent}
    </AuthLayout>
    : <PublicLayout title={'HTML Notepad'} isloginPage={false}>
      {HomePageContent}
    </PublicLayout>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = new Cookies(req.headers.cookie)
  return { props: { loggedIn: (cookies.get('loggedIn') === 'YES') } }
}