import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import PublicAuth from '../components/layouts/PublicLayout'
import FormBody from '../components/loginForm/FormBody'
import FormHeader from '../components/loginForm/FormHeader'
import TextInput from '../components/loginForm/formElements/TextInput'
import SubmitButton from '../components/loginForm/formElements/SubmitButton'
import FormFooter from '../components/loginForm/FormFooter'

export default function Register() {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingAnimation, setLoadingAnimation] = useState(false)
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  async function registerUser(event) {
    // Form submit event
    event.preventDefault()
    setLoadingAnimation(true)

    // Check if both input fields match
    if (input.password === input.confirmPassword) {
      try {
        const { name, email, password } = input

        // Make a new user entry on the database
        const response = await axios.post('/api/auth/register', { name, email, password })

        if (response.status === 201) {
          // On successfull registration
          Router.push('/login')
        } else {
          setLoadingAnimation(false)

          setErrorMessage('Something went wrong. Try again later')
          setError(true)
        }
      } catch (err) {
        setLoadingAnimation(false)
        
        setErrorMessage(err.response.data.message)
        setError(true)
      }
    } else {
      // Display if there is any error
      setErrorMessage('Both password fields should match')
      setError(true)
    }
  }
 
  return (
    <PublicAuth title={'Register'} isloginPage={false}>
      <FormBody handleFormSubmit={registerUser}>
        <FormHeader text={'Create new account'} />
        <TextInput type={'text'} name={'name'} placeholder={'Name'} value={input.text} handleOnChangeFunction={handleOnChange} />
        <TextInput type={'email'} name={'email'} placeholder={'Email'} value={input.email} handleOnChangeFunction={handleOnChange} />
        <TextInput type={'password'} name={'password'} placeholder={'Password'} value={input.password} handleOnChangeFunction={handleOnChange} />
        <TextInput type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'} value={input.confirmPassword} handleOnChangeFunction={handleOnChange} />
        <SubmitButton text={'Signup'} loading={loadingAnimation} />
        {error && <p style={{color: 'var(--udemy-red)', fontSize: '0.8rem', marginTop: '-20px', textAlign: 'center'}}>{errorMessage}</p>}
        <FormFooter text={'Already have an account? '} redirectText={'Login'} redirectTo={'/login'} />
      </FormBody>
    </PublicAuth>
  )
}