import React,{useState, useEffect} from 'react';
import Addtask from '../Addtask/Addtask';
import Task from '../Tasks/Task';
import axios from 'axios';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { baseurl } from '../../../url';


import './Dashboard.css'

function TaskManager() {

  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseurl}/api/notes/getall`
      ,{
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }
    }
    )
      setTasks(response.data.notesData)
      // console.log(response.data);
    }
    fetchData()
  },[localStorage.getItem('token')])



  return (
    <DndProvider backend={HTML5Backend}>
    <div className='dashboard' >
      <Addtask tasks={tasks} setTasks={setTasks}/>
      <Task tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>
  );
}

export default TaskManager;
