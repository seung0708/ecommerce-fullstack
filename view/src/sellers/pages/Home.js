import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import FormComponent from '../../components/Form';
import Button from 'react-bootstrap/esm/Button';

const Home = () => {
  const [isUser, setIsUser] = useState(true)

  const handleOnClick = () => {
    setIsUser(false);
  }
  return ( 
    <Container className='mt-5'>
      {isUser ? (
        <FormComponent action='Login' />
      )
      :
      (
        <FormComponent action='Register' />
      )
    }
    <span>Not registered?</span><Button variant='link' onClick={handleOnClick}>Register Here</Button>
    </Container>
    
  )
}

export default Home