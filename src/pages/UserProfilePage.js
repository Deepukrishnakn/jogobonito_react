import React from 'react'
import { Col, Row } from 'react-bootstrap'
import UserProfile from '../components/UserProfile'

function UserProfilePage() {
  return (
    <div>
        <Row>
            <Col lg={12}>
                <UserProfile/>
            </Col>
        </Row>

    </div>
  )
}

export default UserProfilePage