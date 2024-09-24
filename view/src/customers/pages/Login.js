import React from 'react'
import FormComponent from '../../components/Form'
import Container from 'react-bootstrap/esm/Container'

const Login = ({loginUser}) => {

  const handleLogin = (email, password) => {
    loginUser(email, password)
  }
 
  return (
    <Container>
      <FormComponent action='Login'  onSubmit={handleLogin}/>
    </Container>    
  )
}

export default Login