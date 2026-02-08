import Event from "./Event";
import EventsList from "../data/events.json";
import { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

const Events = () => {
    const [eventList, setEventList] = useState(EventsList);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);

    // Fonction buy pour réserver un événement
    const buy = (index) => {
        const updatedEvents = [...eventList];
        if (updatedEvents[index].nbTickets > 0) {
            updatedEvents[index].nbTickets -= 1;
            updatedEvents[index].nbParticipants += 1;
            setEventList(updatedEvents);

            // Afficher le message de confirmation
            setAlertMessage('You have booked an event');
            setShowAlert(true);

            // Masquer le message après 2 secondes
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    // Fonction pour gérer le Like/Dislike
    const toggleLike = (index) => {
        const updatedEvents = [...eventList];
        updatedEvents[index].like = !updatedEvents[index].like;
        setEventList(updatedEvents);
    };

    // Cycle de vie : Montage du composant
    useEffect(() => {
        console.log("Composant Events monté");

        // Afficher le message de bienvenue après le montage
        setShowWelcome(true);

        // Masquer le message de bienvenue après 3 secondes
        const welcomeTimer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);

        // Nettoyage : Démontage du composant
        return () => {
            console.log("Composant Events démonté");
            clearTimeout(welcomeTimer);
        };
    }, []);

    // Cycle de vie : Mise à jour du composant
    useEffect(() => {
        console.log("Composant Events mis à jour");
    });

    return (
        <Container>
            {/* Message de bienvenue */}
            {showWelcome && (
                <Alert variant="info" className="mt-3">
                    <Alert.Heading>Bienvenue !</Alert.Heading>
                    <p>Découvrez nos événements et réservez vos billets dès maintenant !</p>
                </Alert>
            )}

            {/* Message de confirmation de réservation */}
            {showAlert && (
                <Alert variant="success" className="mt-3">
                    {alertMessage}
                </Alert>
            )}

            <Row className="mt-3">
                {eventList.map((event, index) => (
                    <Event
                        key={index}
                        index={index}
                        name={event.name}
                        price={event.price}
                        tickets={event.nbTickets}
                        participants={event.nbParticipants}
                        img={event.img}
                        like={event.like}
                        buy={buy}
                        toggleLike={toggleLike}
                    />
                ))}
            </Row>
        </Container>
    );
}

export default Events;