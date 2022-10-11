import React from 'react'
import { Col, Row } from 'react-bootstrap'
import GetSlot from '../components/slot/GetSlot'

function SlotPage() {
  return (
    <div>
        <Row>
            <Col lg={12}>
                <GetSlot/>
            </Col>
        </Row>

    </div>
  )
}

export default SlotPage