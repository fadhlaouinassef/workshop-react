import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteEvent } from '../service/api'

export default function Event({ event, showBuyAlert, onDelete }) {

  const [eventInfo, setEventInfo] = useState(event)
  const navigate = useNavigate()

  const handleBuy = () => {
    setEventInfo((prevEventInfo) => {
      return {
        ...prevEventInfo,
        nbParticipants: prevEventInfo.nbParticipants + 1,
        nbTickets: prevEventInfo.nbTickets - 1
      }
    });
    showBuyAlert();
  }

  const handleLike = () => {
    setEventInfo((prevEventInfo) => {
      return {
        ...prevEventInfo,
        like: !prevEventInfo.like
      }
    });
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${eventInfo.name}"?`)) {
      try {
        await deleteEvent(eventInfo.id)
        if (onDelete) onDelete(eventInfo.id)
      } catch (err) {
        console.error('Failed to delete event:', err)
        alert('Failed to delete event.')
      }
    }
  }

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={`/images/${eventInfo.nbTickets === 0 ? 'sold_out.png' : eventInfo.img}`} />
      <Card.Body>
        <Card.Title>
          <Link
            to={`/events/${encodeURIComponent(eventInfo.name)}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {eventInfo.name}
          </Link>
        </Card.Title>
        <Card.Text> Price : {eventInfo.price}  </Card.Text>
        <Card.Text> Number of tickets : {eventInfo.nbTickets}  </Card.Text>
        <Card.Text> Number of participants :  {eventInfo.nbParticipants} </Card.Text>

        <div className="d-flex flex-wrap gap-1">
          <Button onClick={handleBuy} disabled={eventInfo.nbTickets === 0} variant="primary" size="sm">Book</Button>
          <Button onClick={handleLike} variant="outline-secondary" size="sm">{eventInfo.like ? "Dislike" : "Like"}</Button>
          <Button
            variant="warning"
            size="sm"
            onClick={() => navigate(`/events/update/${eventInfo.id}`)}
          >
            Update Event
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
          >
            Delete Event
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
