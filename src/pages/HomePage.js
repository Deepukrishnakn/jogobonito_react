import React from 'react'
import Category from '../components/Category'
import { Col,Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nave from '../components/Nave';

function HomePage() {
  return (
    <div>
 <Nave/>
 <Container>
<Row className=''>
    <Col xs={12} lg={12} md={12}>
    <Category/>
    </Col>
</Row>
</Container>

    </div>
  )
}

export default HomePage