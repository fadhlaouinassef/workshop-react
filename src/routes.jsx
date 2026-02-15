import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Lazy load all components
const Routelayout = lazy(() => import("./pages/RouteLayout.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Events = lazy(() => import("./workshop/Events.jsx"));
const EventDetails = lazy(() => import("./components/EventDetails.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Routelayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "events", element: <Events /> },
            { path: "events/:eventName", element: <EventDetails /> },
            { path: "*", element: <NotFound /> }
        ]
    }
]);