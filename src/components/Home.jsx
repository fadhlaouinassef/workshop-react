import { useState , useEffect } from 'react'

const Home = () => {
    const [test, setTest] = useState(0);

    useEffect(() => {
        console.log("Composant Home monté");
        return () => {
            console.log("Composant Home démonté");
        };
    }, [test]);

    return(
        <div>
            <h1>Bienvenue sur la page d'accueil</h1>
            <p>Ceci est le composant Home.</p>
            <h1>{test}</h1>
            <button onClick={() => setTest(test + 1)}>+</button>
            <button onClick={() => setTest(test - 1)}>-</button>
        </div>
    )
}
export default Home