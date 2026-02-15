import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import eventsJson from '../data/events.json';
import './EventDetails.css';

export default function EventDetails() {
    const { eventName } = useParams();
    const navigate = useNavigate();

    // Find the event by name (decode URI component to handle special characters)
    const event = eventsJson.find(
        e => e.name.toLowerCase() === decodeURIComponent(eventName).toLowerCase()
    );

    // If event not found, show error message
    if (!event) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
                <h2>Event not found</h2>
                <p>The event you are looking for does not exist.</p>
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
