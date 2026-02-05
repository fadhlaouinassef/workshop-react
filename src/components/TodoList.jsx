import { useState } from 'react';

const TodoList = ({ initialTasks = [] }) => {
  const [tasks, setTasks] = useState(
    initialTasks.map((t, index) => ({
      id: index + 1,
      name: typeof t === 'string' ? t : t.name || '',
      priority: t.priority || 'Moyenne',
      completed: false,
    }))
  );

  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('Moyenne');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newTask.trim(),
        priority: newPriority,
        completed: false,
      },
    ]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;

  

  return (
    <div className="todo-app">
      <style>{`
        .todo-app {
          max-width: 620px;
          margin: 30px auto;
          background: white;
          border: 2px solid #2c3e50;
          border-radius: 12px;
          overflow: hidden;
          font-family: Arial, Helvetica, sans-serif;
        }

        .header {
          background: #2c3e50;
          color: white;
          padding: 18px;
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .content {
          padding: 20px;
        }

        h3 {
          margin: 0 0 15px 0;
          color: #2c3e50;
          border-bottom: 2px solid #ecf0f1;
          padding-bottom: 8px;
        }

        .task-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #eee;
          background: #f9f9f9;
        }

        .task-row:last-child {
          border-bottom: none;
        }

        .task-text {
          flex: 1;
          font-size: 1.05rem;
          color: #000000;           /* ← Nom de la tâche en noir */
        }

        .task-completed {
          text-decoration: line-through;
          color: #7f8c8d;
        }

        .priority {
          min-width: 80px;
          text-align: center;
          font-size: 0.95rem;
        }

        .btn {
          padding: 6px 14px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          margin-left: 8px;
        }

        .btn-complete {
          background: #3498db;
          color: white;
        }

        .btn-complete:hover {
          background: #2980b9;
        }

        .btn-delete {
          background: #e74c3c;
          color: white;
        }

        .btn-delete:hover {
          background: #c0392b;
        }

        .stats {
          margin: 25px 0;
          padding: 15px;
          background: #ecf0f1;
          border-radius: 8px;
          color: #000000;           /* ← Statistiques en noir */
        }

        .stats p {
          margin: 8px 0;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .add-section {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 25px;
          align-items: center;
        }

        .add-section input[type="text"] {
          flex: 1;
          min-width: 180px;
          padding: 10px;
          border: 1px solid #bdc3c7;
          border-radius: 5px;
          font-size: 1rem;
        }

        .add-section select {
          padding: 10px;
          border: 1px solid #bdc3c7;
          border-radius: 5px;
          background: white;
        }

        .add-section button {
          padding: 10px 24px;
          background: #2ecc71;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .add-section button:hover {
          background: #27ae60;
        }

        .label {
          font-size: 0.9rem;
          color: #7f8c8d;
          margin-bottom: 4px;
        }
          
        .priority {
            min-width: 80px;
            text-align: center;
            font-size: 0.95rem;
            color: #000;          /* ← noir */
            font-weight: bold;    /* optionnel : si tu veux qu'il soit en gras */
        }

        .choix {
            min-width: 80px;
            text-align: center;
            font-size: 0.95rem;
            color: #000;          /* ← noir */
            font-weight: bold;    /* optionnel : si tu veux qu'il soit en gras */
        }
      `}</style>

      <div className="header">Todo List avec Priorités</div>

      <div className="content">
        <h3>Tâches :</h3>

        {tasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#95a5a6' }}>
            Aucune tâche pour le moment
          </p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-row">
              <div 
                className={`task-text ${task.completed ? 'task-completed' : ''}`}
              >
                {task.name}
              </div>

              <div className="priority" >
                {task.priority}
              </div>

              <div>
                <button
                  className="btn btn-complete"
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed ? 'Annuler' : 'Terminé'}
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteTask(task.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}

        <div className="stats">
          <p>Total des tâches : {total}</p>
          <p>Tâches terminées : {done}</p>
        </div>

        <div className="add-section">
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div className="label">Nom de la tâche</div>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Ajouter une tâche..."
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
          </div>

          <div style={{ minWidth: '140px' }}>
            <div className="label">Priorité</div>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option className='choix' value="Haute">Haute</option>
              <option className='choix' value="Moyenne">Moyenne</option>
              <option className='choix' value="Basse">Basse</option>
            </select>
          </div>

          <button onClick={addTask}>Ajouter</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;