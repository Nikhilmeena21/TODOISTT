import { useState } from 'react'
import './App.css'

function App() {

  const [todolist,setTodolist] = useState([])
  const [newtask,setNewtask] = useState("")
  const [editedTask, setEditedTask] = useState(null)

  const handlechange = (event) =>{
     setNewtask(event.target.value)
  }

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const addtask = () => {
    if (!newtask.trim()) return; 
    const task = {
      id: todolist.length === 0 ? 1 : todolist[todolist.length - 1].id + 1,
      taskname: newtask,
      color: generateRandomColor(), 
    }
    setTodolist([...todolist,task])
    setNewtask('')
  }

  const handleEditTask = (id) => {
    setEditedTask(id);
    setNewtask(todolist.find((task) => task.id === id).taskname);
  };
  

  const deletetask =(id)=> {
    if (editedTask !== null && editedTask === id) {
      setEditedTask(null);
    }
    setTodolist(todolist.filter((task) => task.id !== id))
  }

  return (
    <div className='App'>
    <div className='addtask'>
      <input onChange={handlechange} value={newtask}  placeholder='Add task ....📝'></input>
      <button onClick={addtask}>Add Task</button>
    </div>
    <div className='list'>
    {todolist.map((task) => (
          <li key={task.id} style={{ backgroundColor: task.color }}>  {/* Set background color based on task.color */}
            <h1>{task.taskname}</h1>
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={() => deletetask(task.id)} className="delete-button"></button>
          </li>
        ))}
    </div>
    </div>
    )
}

export default App
