import { useEffect } from 'react'
import Router from 'next/router'
import Cookies from 'universal-cookie'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import AuthLayout from '../../../../components/layouts/AuthLayout'
import FunctionalButton from '../../../../components/buttons/general'
import ButtonContainer from '../../../../components/buttons/ButtonContainer'
import PreviewBox from '../../../../components/preview/PreviewBox'
import { HOST } from '../../../../../config/keys'

const LoginPage = dynamic(() => import('../../../login'))

export default function Document({ loggedIn, document, error, status }) {
  
  // If not logged in, change route to '/login'
  useEffect(() => {
    if (!loggedIn) Router.replace('/documents', '/login') 
    else return
  }, [loggedIn])

  // Render login page
  if (!loggedIn) return <LoginPage />

  // Navigate to Edit page
  function editDocument() {
    Router.push('/documents/d/[documentID]/edit', `/documents/d/${document._id}/edit`)
  }

  // Download the file in Markdown format
  function downloadFile() {
    console.log('download: ' + document.content)
  }

  if (error) {
    return (
      <AuthLayout title={'Error'} heading={error}>
        <p style={{ textAlign: 'center' }}>{status} | {document.message}</p> 
      </AuthLayout>
    )
  } else {
    // BreadCrumbs data
    const bread = [
      { text: 'Documents', redirectPage: '/documents', redirectTo: '/documents', _id: 1 },
      { text: document.title, redirectPage: '/documents/d/[documentID]', redirectTo: `/documents/d/${document._id}`, _id: 2 }
    ]

    // Render the document page
    return (
      <AuthLayout title={document.title} heading={document.title} breadCrumbsList={bread}>
        <ButtonContainer>
          <FunctionalButton text={'EDIT'} title={'edit'} handleOnClick={editDocument} type={4} />
          <FunctionalButton text={'DOWNLOAD'} title={'download .md file'} handleOnClick={downloadFile} type={3} />
        </ButtonContainer>
        <div style={{maxWidth: '900px', margin: '0 auto'}}>
          <PreviewBox text={document.content}/>
        </div>
      </AuthLayout>
    )
  }
}

// Check if logged in
export async function getServerSideProps({ req, params }) {
  const cookies = new Cookies(req.headers.cookie)
  const token = cookies.cookies['token']
  const { documentID } = params

  const response = await fetch(`${HOST}/api/next/note/${documentID}`, { headers: { Authorization: `Bearer ${token}` } })
  const document = await response.json()

  if (response.status === 200) {
    return {
      props: { 
        loggedIn: (cookies.get('loggedIn') === 'YES'), 
        status: response.status,
        document: document
      } 
    }
  } else {
    return {
      props: { 
        loggedIn: (cookies.get('loggedIn') === 'YES'), 
        status: response.status,
        error: true,
        document: document
      } 
    }
  }
}