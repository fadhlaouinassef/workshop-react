import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getallEvents, editEvent } from '../service/api';
import { eventSchema } from '../service/validation';

export default function UpdateEvent() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        img: '',
        price: '',
        nbTickets: '',
        nbParticipants: '',
        like: false,
    });

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getallEvents(id);
                const ev = response.data;
                setFormData({
                    name: ev.name,
                    description: ev.description,
                    img: ev.img,
                    price: ev.price,
                    nbTickets: ev.nbTickets,
                    nbParticipants: ev.nbParticipants,
                    like: ev.like,
                });
            } catch (err) {
                setServerError('Failed to load event data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setServerError(null);

        // Zod validation
        const result = eventSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach(issue => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setSubmitting(true);
        try {
            await editEvent(id, {
                ...result.data,
                like: formData.like // preserved since it's not in the simple schema for numeric fields but we want to keep it
            });
            navigate('/events');
        } catch (err) {
            setServerError('Failed to update event. Please try again.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" />
                <p>Loading event data...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <Card className="shadow-sm">
                <Card.Header className="bg-warning text-dark">
                    <h4 className="mb-0">✏️ Update Event</h4>
                </Card.Header>
                <Card.Body>
                    {serverError && <Alert variant="danger">{serverError}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                placeholder="Enter event name"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                isInvalid={!!errors.description}
                                placeholder="Enter event description"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image filename</Form.Label>
                            <Form.Control
                                type="text"
                                name="img"
                                value={formData.img}
                                onChange={handleChange}
                                placeholder="e.g. event1.jpg"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price (TND)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                isInvalid={!!errors.price}
                                placeholder="Enter price"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Number of Tickets</Form.Label>
                            <Form.Control
                                type="number"
                                name="nbTickets"
                                value={formData.nbTickets}
                                onChange={handleChange}
                                isInvalid={!!errors.nbTickets}
                                placeholder="Enter number of tickets"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nbTickets}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Number of Participants</Form.Label>
                            <Form.Control
                                type="number"
                                name="nbParticipants"
                                value={formData.nbParticipants}
                                onChange={handleChange}
                                isInvalid={!!errors.nbParticipants}
                                placeholder="Enter number of participants"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nbParticipants}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex gap-2 mt-4">
                            <Button
                                variant="secondary"
                                onClick={() => navigate('/events')}
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="warning"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Saving...' : 'Update Event'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
