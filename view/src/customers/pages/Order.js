import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import PaymentDetails from '../../components/PaymentDetails';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'


const Order = ({order, onCheckout}) => {
  const [currentOrder, setCurrentOrder] = useState([]);

  useEffect(() => {
    if (order) {
      setCurrentOrder(order);
    }
  }, [order]);

  const handleCheckout = (orderId, orderItems, methodType) => {
    onCheckout(orderId, orderItems, methodType)
  }
  
  const navigate = useNavigate();
 

  return (
    <>
    {order.length < 1 ? 
    (
      <Container className='text-center mt-5'>
        <h3>No order found. Please add items to your Cart</h3>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    ) 
    :
    (
    <Container className='mt-5'>
    <Row> 
      <Col>
        <Card>
          <Card.Header>Order Summary</Card.Header>
          <Card.Body>
             
            <ListGroup>  
                
                 <>
                <ListGroup.Item>
                  <strong>Order ID:</strong> {order[1].id}
                </ListGroup.Item>
                {/*
                <ListGroup.Item>
                  <strong>Order Date:</strong> {order.date}
                </ListGroup.Item>
                 <ListGroup.Item>
                   <strong>Shipping Address:</strong>
                   <br />
                   {order.shippingAddress}
                  </ListGroup.Item>
                 <ListGroup.Item>
                   <strong>Billing Address:</strong>
                   <br />
                   {order.billingAddress}
                 </ListGroup.Item>
                */}
                <ListGroup.Item>
                  <strong>Items:</strong>
                  <ListGroup>
                    {order[0].map((item) => (  
                    <ListGroup.Item key={item.id}>
                      {item.name} x {item.quantity} - ${item.price}
                    </ListGroup.Item>
                     ))}
                  </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                 <strong>Total:</strong> ${order[1].total_amount}
                </ListGroup.Item>
                </>
            </ListGroup>
         
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <PaymentDetails orderCheckout={handleCheckout} />           
      </Col>
    </Row>
  </Container>
  )
  }
  </>
  )
}

export default Order