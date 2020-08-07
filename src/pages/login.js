import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import PublicAuth from '../components/layouts/PublicLayout'
import FormBody from '../components/loginForm/FormBody'
import FormHeader from '../components/loginForm/FormHeader'
import TextInput from '../components/loginForm/formElements/TextInput'
import SubmitButton from '../components/loginForm/formElements/SubmitButton'
import FormFooter from '../components/loginForm/FormFooter'

export default function Login() {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingAnimation, setLoadingAnimation] = useState(false)
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  function handleOnChange(event) {
    // Disable Error message when user modifies input credentials
    setErrorMessage('')
    setError(false)
    setLoadingAnimation(false)

    // Element that triggered onChange event
    const { name, value } = event.target;
    setInput(previousInput => {
      return {
        ...previousInput,
        [name]: value
      }
    })
  }

  async function loginUser(event) {
    // Form submit event
    event.preventDefault()
    setLoadingAnimation(true)

    try {
      // Get Access token from the server
      const response = await axios.post('/api/auth/login', { ...input })

      if (response.status === 200) {
        localStorage.setItem('loggedIn', true)

        // Redirect on successfull authentication
        Router.replace('/documents')
      } else {
        setLoadingAnimation(false)
  
        // display error message
        setErrorMessage('Something went wrong. Try again later')
        setError(true)
      }
    } catch (err) {
      console.log(err)
      setLoadingAnimation(false)

      // display error message
      setErrorMessage(err.response.data.message)
      setError(true)
    }
  }

  return (
    <PublicAuth title={'Login'} isloginPage={true}>
      <FormBody handleFormSubmit={loginUser}>
        <FormHeader text={'Login to your account'} />
        <TextInput type={'email'} name={'email'} placeholder={'Email'} value={input.email} handleOnChangeFunction={handleOnChange} />
        <TextInput type={'password'} name={'password'} placeholder={'Password'} value={input.password} handleOnChangeFunction={handleOnChange} />
        <SubmitButton text={'Login'} loading={loadingAnimation} />
        {error && <p style={{color: 'var(--udemy-red)', fontSize: '0.8rem', marginTop: '-20px', textAlign: 'center'}}>{errorMessage}</p>}
        <FormFooter text={'Don\'t have an account? '} redirectText={'Sign up'} redirectTo={'/register'} />
      </FormBody>
    </PublicAuth>
  )
}