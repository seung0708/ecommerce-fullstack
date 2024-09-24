import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import {FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';

const CartItem = ({item, onQuantityChange, onDelete}) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const handleDecrease = () => {
        if(item.quantity > 0) {
           const quantityDecrease = onQuantityChange(item.id, item.quantity - 1)
           setQuantity(quantityDecrease)
        }
    }

    const handleIncrease = () => {
        const quantityIncrease = onQuantityChange(item.id, item.quantity + 1)
        setQuantity(quantityIncrease)
    }

  return (
    <>
    <Card.Body>
        <Row className='d-flex align-items-center mb-4'>
            <Col lg={3} md={12}>
                <Card.Img className='hover-overlay hover-zoom ripple rounded w-100 object-fit-contain' src={item.images[1]}  style={{height: '150px'}}/>
            </Col>
            <Col md={6} className='d-flex align-items-center justify-content-between'>
                <p className="mb-0" style={{ lineHeight: '1.5' }}><strong>{item.name}</strong></p>
                <InputGroup className="mb-0 text-center cartItem-quantity'" style={{ maxWidth: "125px" }}>
                    <Button variant="primary" size='sm' onClick={handleDecrease} disabled={item.quantity === 1}><FaMinus /></Button>
                    <Form.Control type="number" value={item.quantity} onChange={(e => setQuantity(e.target.value))} style={{textAlign: 'center', width: '60px'}} />
                    <Button variant="primary" size='sm' onClick={handleIncrease}><FaPlus /></Button>
                </InputGroup>
            </Col>
            <Col>
                <p className='mb-0'><strong>{Math.round(item.quantity * item.price * 100) / 100}</strong></p>
                <Button variant='danger' size='sm' onClick={() => onDelete(item.id)}><FaTrash /></Button>
            </Col>
        </Row>
    </Card.Body>
    <hr className='w-75 mx-auto' />
    </>
  )
}

export default CartItem