import React from 'react'
import FormComponent from '../../components/Form'
import Container from 'react-bootstrap/esm/Container'


const Register = ({registerUser}) => {
  const handleRegister = (firstName, lastName, email, password) => {
    registerUser(firstName, lastName, email, password)
  }
  return (
    <Container>
      <FormComponent action='Register'  onSubmit={handleRegister}/>
    </Container> 
  )
}

export default Register