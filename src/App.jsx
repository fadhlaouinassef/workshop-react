import './App.css'
import Home from './components/Home.jsx'
import Class from './components/Class.jsx'
import Component from './components/Component.jsx'
import Counter from './components/Counter.jsx'
import ListManager from './components/ListManager.jsx'
import ColorBox from './components/ColorBox.jsx'
import NotesManager from './components/NotesManager.jsx'
import TodoList from './components/TodoList.jsx'

function App() {
  return (
    <div className="App">
      <h1>Exercice 1</h1>
      <Counter />
      <h1>Exercice 2</h1>
      <ListManager />
      <h1>Exercice 3</h1>
      <ColorBox />
      <h1>Exercice 4</h1>
      <NotesManager initialNotes={[12, 15.5, 8, 17]} />
      <h1>Exercice 5</h1>
      <TodoList initialTasks={[
        { name: "Préparer le TD React", priority: "Haute" },
        { name: "Faire les courses", priority: "Moyenne" },
        { name: "Appeler le dentiste", priority: "Basse" },
      ]} />
    </div>
  )
}

export default App