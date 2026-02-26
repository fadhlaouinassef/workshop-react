import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';
import { getallEvents } from '../service/api';
import './EventDetails.css';

export default function EventDetails() {
    const { eventName } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getallEvents();
                const allEvents = response.data;
                const found = allEvents.find(
                    e => e.name.toLowerCase() === decodeURIComponent(eventName).toLowerCase()
                );
                if (found) {
                    // Fetch by ID to get single event
                    const detailResponse = await getallEvents(found.id);
                    setEvent(detailResponse.data);
                } else {
                    setNotFound(true);
                }
            } catch (err) {
                console.error(err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventName]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status" />
                <p>Loading event...</p>
            </div>
        );
    }

    // If event not found, show error message
    if (notFound || !event) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
                <Alert variant="danger">
                    <h4>Event does not exist</h4>
                </Alert>
                <Button variant="primary" onClick={() => navigate('/events')}>
                    Back to Events
                </Button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Button
                variant="outline-secondary"
                style={{ marginBottom: '20px' }}
                onClick={() => navigate('/events')}
            >
                ← Back to Events
            </Button>

            <Card className="event-details-card">
                <Row className="g-0">
                    <Col md={6}>
                        <Card.Img
                            variant="top"
                            src={`/images/${event.img}`}
                            alt={event.name}
                            className="event-details-image"
                        />
                    </Col>
                    <Col md={6}>
                        <Card.Body className="event-details-body">
                            <Card.Title className="event-details-title">
                                {event.name}
                            </Card.Title>

                            <Card.Text className="event-description">
                                {event.description}
                            </Card.Text>

                            <div className="event-info-section">
                                <div className="info-item">
                                    <strong>Price:</strong>
                                    <Badge bg="success" className="ms-2">{event.price} TND</Badge>
                                </div>

                                <div className="info-item">
                                    <strong>Available Tickets:</strong>
                                    <Badge
                                        bg={event.nbTickets > 0 ? 'primary' : 'danger'}
                                        className="ms-2"
                                    >
                                        {event.nbTickets}
                                    </Badge>
                                </div>

                                <div className="info-item">
                                    <strong>Participants:</strong>
                                    <Badge bg="info" className="ms-2">{event.nbParticipants}</Badge>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-100"
                                    disabled={event.nbTickets === 0}
                                >
                                    {event.nbTickets === 0 ? 'Sold Out' : 'Book Now'}
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}
