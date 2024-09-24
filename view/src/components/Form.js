import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const FormComponent = ({action, onSubmit}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(action === 'Login') {
      onSubmit(email, password)
    } 

    if(action === 'Register') {
      onSubmit(firstName, lastName, email, password)
    }

    // setFirstName('');
    // setLastName('');

    // setEmail('')
    // setPasword('')

  }
  
  return (
    <>
    {action === 'Register' ? (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
          </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPasword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          {action}    
        </Button>
    </Form>
    )
    :
    (
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPasword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
      {action}    
      </Button>
    </Form>
    )
  }
    
    </>
  )
}

export default FormComponent