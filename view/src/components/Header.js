import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {FaShoppingCart} from 'react-icons/fa';

const Header = ({user, cart, logoutUser, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    const handleSearch = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        
    }

    const handleSubmit = e => {
        if(!searchTerm) return;
        e.preventDefault();
        onSearch(searchTerm)
        //navigate('/')
    }
    return (
        <header className='mb-5'>    
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={NavLink} to='/'className="me-auto">Amazona</Navbar.Brand>
                    <Form className="d-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }} onSubmit={handleSubmit}>
                        <Form.Control className='mx-auto' type="text" placeholder="Search Products" value={searchTerm} onChange={handleSearch} />
                        <Button type='submit' className='ms-2'>Submit</Button>
                    </Form>
                    
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    <Nav className="ms-auto justify-content-end">
                    {!user ?
                        <>
                        <Nav.Link as={NavLink} to='/register'>Register</Nav.Link>
                        <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
                        </> 
                    :
                        <>
                        <Nav.Link to={`user/${user.id}`}>Account</Nav.Link>
                        <Nav.Link onClick={() => logoutUser()}>Logout</Nav.Link>
                        </>

                    }
                    <Nav.Link as={NavLink} to='/cart'><FaShoppingCart />{!cart ? 0 : (cart.reduce((total, item) => total + item.quantity, 0))}</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header