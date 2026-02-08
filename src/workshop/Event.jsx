import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Event(props) {
  const isSoldOut = props.tickets === 0;

  const handleBookEvent = () => {
    props.buy(props.index);
  };

  const handleToggleLike = () => {
    props.toggleLike(props.index);
  };

  return (
    <Col md={4} className="mb-4">
      <Card>
        <div style={{ position: 'relative' }}>
          <Card.Img variant="top" src={`/images/${props.img}`} alt={props.img} />
          {isSoldOut && (
            <img
              src="/images/sold_out.png"
              alt="Sold Out"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '150px',
                opacity: 0.9
              }}
            />
          )}
        </div>

        <Card.Body>
          <Card.Title>{props.name}</Card.Title>

          <Card.Text>
            <strong>Price:</strong> {props.price} DT
          </Card.Text>

          <Card.Text>
            <strong>Number of tickets:</strong> {props.tickets}
          </Card.Text>

          <Card.Text>
            <strong>Number of participants:</strong> {props.participants}
          </Card.Text>

          <div className="d-flex gap-2">
            <Button
              variant="primary"
              onClick={handleBookEvent}
              disabled={isSoldOut}
            >
              Book an event
            </Button>

            <Button
              variant={props.like ? "danger" : "outline-danger"}
              onClick={handleToggleLike}
            >
              {props.like ? "Dislike" : "Like"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Event;
