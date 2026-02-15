import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Event({ event, showBuyAlert }) {

  const [eventInfo, setEventInfo] = useState(event)

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

  return (
    <Card style={{ width: '18rem' }}>
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

        <Button onClick={handleBuy} disabled={eventInfo.nbTickets === 0 ? true : false} variant="primary">Book an event</Button>
        <Button onClick={handleLike}>{eventInfo.like ? "Dislike" : "Like"}</Button>
      </Card.Body>
    </Card>
  )
}

