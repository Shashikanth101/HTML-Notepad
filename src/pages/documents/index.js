import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import AuthLayout from '../../components/layouts/AuthLayout'
import List from '../../components/list/List'
import AlertBox from '../../components/alertBox/AlertBox'
import ErrorBox from '../../components/errorBox/ErrorBox'
import Loader from '../../components/loadingAnimation/Loader'
import ItemInput from '../../components/newItem/ItemInput'

const LoginPage = dynamic(() => import('../login'))

export default function Documents({ loggedIn }) {
  // Component states 
  const [loadingScreen, setLoadingScreen] = useState(true)
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState({ isError: false, message: '' })
  const [itemToDelete, setItemToDelete] = useState('')
  const [alertBox, setAlertBox] = useState({ alert: false, message: '', handler: null })

  // If not logged in, change route to '/login'
  useEffect(() => {
    if (!loggedIn) Router.replace('/documents', '/login') 
    else getDocuments()
  }, [loggedIn])

  // Render login page
  if (!loggedIn) return <LoginPage />
 
  // BreadCrumbs data
  const bread = [{ text: 'Documents', redirectPage: '/documents', redirectTo: '/documents', _id: 1 }]

  // GET all user documents
  async function getDocuments() {
    setLoadingScreen(true)
    try {
      const response = await axios.get('/api/note')

      if (response.status === 200) {
        setLoadingScreen(false)
        formatList(response.data)
      } else {
        setLoadingScreen(false)
        setError({ isError: true, message: 'Something went wrong. Try again later'})
      }
    } catch (err) {
      console.log(err)
      setLoadingScreen(false)
      setError({ isError: true, message: err.response.data.message })
    }
  }

  // Format document list
  async function formatList(documents) {
    const formattedDocumetsList = await documents.map(document => {
      return {
        title: document.title,
        redirectPage: '/documents/d/[documentID]',
        redirectTo: `/documents/d/${document._id}`,
        _id: document._id
      }
    })

    // Change documents list State
    setDocuments(formattedDocumetsList)
  }

  async function addNewItem(text) {
    try {
      const response = await axios.post('/api/note', { title: text })

      if (response.status === 201) {
        setLoadingScreen(false)
        getDocuments()
      } else {
        setLoadingScreen(false)
        setError({ isError: true, message: 'Something went wrong. Try again later'})
      }
    } catch (err) {
      console.log(err)
      setLoadingScreen(false)
      setError({ isError: true, message: err.response.data.message })
    }
  }

  // Handle document deletion
  function handleDeleteItem(itemID) {
    setItemToDelete(itemID)
    setAlertBox({ alert: true, message: 'Are you sure you want to delete ?', handler: deleteItem })
  }

  // Delete the selected document
  async function deleteItem() {
    setLoadingScreen(true)
    try {
      const response = await axios.delete(`/api/note/${itemToDelete}`)

      if (response.status === 201) {
        setAlertBox({ alert: false, message: '', handler: null })
        setLoadingScreen(false)
        getDocuments()
      } else {
        setLoadingScreen(false)
        setError({ isError: true, message: 'Something went wrong. Try again later'})
      }
    } catch (err) {
      setLoadingScreen(false)
      setError({ isError: true, message: err.response.data.message })
    }
  }

  // Render Documents page
  return (
    <>
      <AuthLayout title={'Documents'} heading={'Documents'} breadCrumbsList={bread}>
        <ItemInput 
          placeholderText={'New Document'} 
          handleNewInput={addNewItem} 
          inputTitle={'Name of the documet'} 
          buttonTitle={'Create new document'}
        />
        {loadingScreen && <Loader />}
        {error.isError 
          ? <ErrorBox text={error.message} /> 
          : <List list={documents} handleDelete={handleDeleteItem}/>
        }
      </AuthLayout>
      {alertBox.alert && <AlertBox text={alertBox.message} onYes={alertBox.handler} onNo={() => setAlertBox(false)} />}
    </>
  )
}

// Check if logged in
export async function getServerSideProps({ req }) {
  const cookies = new Cookies(req.headers.cookie)
  return { props: { loggedIn: (cookies.get('loggedIn') === 'YES') } }
}