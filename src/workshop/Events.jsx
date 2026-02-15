import React from 'react'
import Event from './Event'
import eventsJson from '../data/events.json'
import { Col, Row, Container } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function Events() {
    const [isShowBuyAlert, setIsShowBuyAlert] = useState(false)
    const [isWelcomeAlert, setIsWelcomeAlert] = useState(true)

    const showBuyAlert = () => {
        setIsShowBuyAlert(true)
        setTimeout(() => {
            setIsShowBuyAlert(false)
        }, 2000)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsWelcomeAlert(false)
        }, 3000)
    })


    return (
        <Container>
            {isShowBuyAlert &&
                <Alert variant="success">
                    you have booked an event
                </Alert>
            }

            {isWelcomeAlert &&
                <Alert variant="info">
                    Welcome to our events page
                </Alert>
            }


            <Row>
                {eventsJson.map((eventItem, index) => {
                    return (
                        <Col key={`col-${index}`}>
                            <Event
                                key={`event-${index}`}
                                event={eventItem}
                                showBuyAlert={showBuyAlert}
                            />
                        </Col>
                    )

                })}
            </Row>
        </Container>
    )
}