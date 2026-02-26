import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../service/api';
import { eventSchema } from '../service/validation';

export default function AddEvent() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        img: '',
        price: '',
        nbTickets: '',
        nbParticipants: 0,
        like: false,
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user changes field
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
            await addEvent(result.data); // result.data contains preprocessed/cleaned data
            navigate('/events');
        } catch (err) {
            setServerError('Failed to add event. Please try again.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h4 className="mb-0">➕ Add New Event</h4>
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

                        <div className="d-flex gap-2 mt-4">
                            <Button
                                variant="secondary"
                                onClick={() => navigate('/events')}
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? 'Adding...' : 'Add Event'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
