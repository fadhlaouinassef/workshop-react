import './App.css'
import Home from './components/Home.jsx'
import Class from './components/Class.jsx'
import Component from './components/Component.jsx'
import Counter from './components/Counter.jsx'
import ListManager from './components/ListManager.jsx'
import ColorBox from './components/ColorBox.jsx'
import NotesManager from './components/NotesManager.jsx'
import TodoList from './components/TodoList.jsx'
import Events from './workshop/Events.jsx'
import { routes } from './routes.jsx'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App