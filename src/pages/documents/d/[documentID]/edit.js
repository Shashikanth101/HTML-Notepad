import { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import dynamic from 'next/dynamic'
import AuthLayout from '../../../../components/layouts/AuthLayout'
import FunctionalButton from '../../../../components/buttons/general'
import ButtonContainer from '../../../../components/buttons/ButtonContainer'
import ErrorBox from '../../../../components/errorBox/ErrorBox'
import Loader from '../../../../components/loadingAnimation/Loader'
import NewName from '../../../../components/notepad/NewName'
import EditBox from '../../../../components/notepad/EditBox'
import PreviewBox from '../../../../components/preview/PreviewBox'
import { HOST } from '../../../../../config/keys'

const LoginPage = dynamic(() => import('../../../login'))

export default function EditDocument({ loggedIn, document, error, status }) {
  // Component states
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [clientError, setClientError] = useState({ isError: false, message: '' })
  const [title, setTitle] = useState(error ? 'Error' : document.title)
  const [documentName, setDocumentName] = useState(error ? '' : document.title)
  const [documentContent, setDocumentContent] = useState(error ? '' : document.content)
  const [previewMode, setPreviewMode] = useState(false)
  const [prevState, setPrevState] = useState({title: error ? '' : document.title, content: error ? '' : document.content})

  const documentID = error ? '' : document._id

  // If not logged in, change route to '/login'
  useEffect(() => {
    if (!loggedIn) Router.replace('/documents', '/login') 
    else return
  }, [loggedIn])

  // Render login page
  if (!loggedIn) return <LoginPage />
  
  // Toggle between edit and preview mode
  function handlePreview() {
    setPreviewMode(previousState => !previousState)
  }

  // Update the document
  async function handleSave() {
    if (prevState.title === documentName && prevState.content === documentContent) {
      return setClientError({ isError: true, message: 'No changes made' })
    }
    try {
      setLoadingScreen(true)
      const response = await axios.patch(`/api/note/${documentID}`, { title: documentName, content: documentContent })

      if (response.status === 201) {
        setTitle(documentName)
        setLoadingScreen(false)
      } else {
        setLoadingScreen(false)
        setClientError({ isError: true, message: 'Something went wrong. Try again later'})
      }
    } catch (err) {
      setLoadingScreen(false)
      setClientError({ isError: true, message: err.response.data.message })
    }
  }

  // Download file in Markdown format
  function downloadFile() {
    console.log('download: ' + documentName + ', ' + documentContent)
  }

  // Update documentName state
  function handleNameChange(event) {
    const { value } = event.target
    setClientError({ error: false, message: '' })
    setDocumentName(value)
  }

  // Update documentContent state
  function handleContentChange(event) {
    const { value } = event.target
    setClientError({ error: false, message: '' })
    setDocumentContent(value)
  }

  // Server error
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
      { text: title, redirectPage: '/documents/d/[documentID]', redirectTo: `/documents/d/${document._id}`, _id: 2 },
      { text: 'edit', redirectPage: '/documents/d/[documentID]/edit', redirectTo: `/documents/d/${document._id}/edit`, _id: 3 }
    ]

    return (
      <AuthLayout title={title} heading={title} breadCrumbsList={bread}>
        <ButtonContainer>
          <FunctionalButton text={previewMode ? 'EDIT' : 'PREVIEW'} title={previewMode ? 'edit' : 'preview'} handleOnClick={handlePreview} type={1} />
          <FunctionalButton text={'SAVE'} title={'save document'} handleOnClick={handleSave} type={4} />
          <FunctionalButton text={'DOWNLOAD'} title={'download .md file'} handleOnClick={downloadFile} type={3} />
        </ButtonContainer>
        {clientError.isError && <ErrorBox text={clientError.message} />}
        {loadingScreen ? <Loader /> :
          <div style={{maxWidth: '900px', margin: '0 auto'}}>
            <NewName value={documentName} handleOnChange={handleNameChange} />
            {previewMode 
              ? <PreviewBox text={documentContent} /> 
              : <EditBox rows={'20'} value={documentContent} handleOnChange={handleContentChange} />
            }
          </div>
        }
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