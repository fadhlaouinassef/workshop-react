import React, { useState, useEffect } from 'react'
import Event from './Event'
import { Col, Row, Container, Alert, Spinner } from 'react-bootstrap'
import { getallEvents } from '../service/api'

export default function Events() {
    const [events, setEvents] = useState([])
    const [isShowBuyAlert, setIsShowBuyAlert] = useState(false)
    const [isWelcomeAlert, setIsWelcomeAlert] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
    }, [])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getallEvents()
                setEvents(response.data)
            } catch (err) {
                setError('Failed to load events. Please try again later.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" />
                <p>Loading events...</p>
            </Container>
        )
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        )
    }

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
                {events.map((eventItem) => {
                    return (
                        <Col key={`col-${eventItem.id}`}>
                            <Event
                                key={`event-${eventItem.id}`}
                                event={eventItem}
                                showBuyAlert={showBuyAlert}
                                onDelete={(deletedId) =>
                                    setEvents(prev => prev.filter(e => e.id !== deletedId))
                                }
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}