import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CartItem from '../../components/CartItem'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const Cart = ({cart, onUpdate, onDelete, onOrder}) => {
  const navigate = useNavigate();
  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cart.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    )

    onUpdate(id, updatedItems);
  }

  const handleCheckout = () => {
    onOrder();
    navigate('/order')
  }


  if(!cart) {
    return <h2 className='text-center'>No items in cart</h2>
  }

  return (
    <Container className='w-75'>
      
      <Row>
        <Col className='md-8'>
          <Card className='mb-4'>
            <Card.Header className='py-3'>
              <h5 className='mb-0'>Cart - {cart.length} items</h5>
            </Card.Header>
            {cart.map((item,index) =>
            <>
              <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} onDelete={onDelete} />
            </>
            )}
          </Card>
        </Col>     
      
       <Col md={4}>
            <Card >
                <Card.Header className='py-3'>
                  <h5>Summary</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item className='d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                      SubTotal
                      <span>{cart.reduce((total, item) => {
                        return (total + (Math.round(item.quantity * item.price * 100)/100));
                      }, 0)}</span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button onClick={handleCheckout}>Go to Checkout</Button>
                </Card.Body>
            </Card>
          </Col>
      </Row>
    </Container>
  )
}

export default Cart