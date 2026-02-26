import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Lazy load all components
const Routelayout = lazy(() => import("./pages/RouteLayout.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Events = lazy(() => import("./workshop/Events.jsx"));
const EventDetails = lazy(() => import("./components/EventDetails.jsx"));
const Formulaire = lazy(() => import("./workshop/Formulaire.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));
const AddEvent = lazy(() => import("./components/AddEvent.jsx"));
const UpdateEvent = lazy(() => import("./components/UpdateEvent.jsx"));

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Routelayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "events", element: <Events /> },
            { path: "events/add", element: <AddEvent /> },
            { path: "events/update/:id", element: <UpdateEvent /> },
            { path: "/events/formulaire", element: <Formulaire /> },
            { path: "events/:eventName", element: <EventDetails /> },
            { path: "*", element: <NotFound /> }
        ]
    }
]);