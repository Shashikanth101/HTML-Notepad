import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import AuthLayout from '../components/layouts/AuthLayout'
import ChangePassword from '../components/account/ChangePassword'
import DeleteAccount from '../components/account/DeleteAccount'

const LoginPage = dynamic(() => import('./login'))

export default function Settings({ loggedIn }) {

  // If not logged in, change route to '/login'
  useEffect(() => {
    if (!loggedIn) Router.replace('/settings', '/login') 
    else return
  }, [loggedIn])

  // Render login page
  if (!loggedIn) return <LoginPage />

  return (
    <AuthLayout title={'Settings'} heading={'Settings'}>
      <ChangePassword />
      <DeleteAccount />
    </AuthLayout>
  )
}

// Check if logged in
export async function getServerSideProps({ req }) {
  const cookies = new Cookies(req.headers.cookie)
  return { props: { loggedIn: (cookies.get('loggedIn') === 'YES') } }
}