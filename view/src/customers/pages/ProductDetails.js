import React, {useState} from 'react'
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/esm/Row';
import InputGroup from 'react-bootstrap/esm/InputGroupText';
import Form from 'react-bootstrap/Form';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'

const ProductDetails = ({onAddToCart}) => {
    const [quantity, setQuantity] = useState(0)
    const location = useLocation();
    const {dataToPass} = location.state || {}; 
    const {name, description, price, images} = dataToPass

    const handleAddToCart = () => {
        onAddToCart(dataToPass.id, quantity)
    }

  return (
    <Container className='mx-auto'>
        <Row>
            <Col xs={4}>
                <Carousel indicators={false} controls={false}>
                    {images.map((image,index) => 
                        <Carousel.Item key={index}>
                            <Image src={image} className='object-fit-contain me-3' style={{height: '500px'}}/>
                        </Carousel.Item>
                    )}
                </Carousel>
            </Col>
            <Col xs={5}>
                <h3 className='fs-2 mb-5'>{name}</h3>
                <h6>{description}</h6>

                <h6 className='fs-4'>{price}</h6>
                <div className='d-flex mb-1'>
                    <Form.Control className='productDetails-quantity' type="number" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}style={{width: '60px'}} />
                    <Button onClick={() => handleAddToCart()}>Add to Cart</Button>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default ProductDetails