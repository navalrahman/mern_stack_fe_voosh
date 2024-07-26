import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Section from '../Section/Section';

function Task({tasks, setTasks}) {
  
  const [todos, setTodos] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [done, setDone] = useState([])


  useEffect(() => {
    const filteredTasks = tasks.filter(task => task.status == 'todo');
    setTodos(filteredTasks);
  }, [tasks]);

  useEffect(() => {
    const filteredTasks = tasks.filter(task => task.status == 'inprogress');
    setInProgress(filteredTasks);
  }, [tasks]);

  useEffect(() => {
    const filteredTasks = tasks.filter(task => task.status == 'done');
    setDone(filteredTasks);
  }, [tasks]);

  // console.log(todos);

  const statuses = ["todo", "inprogress", "done"]

  return (

    <div style={{marginLeft:'200px', display:'flex', flexDirection:'row', backgroundColor: 'white', padding: '20px', borderRadius: '10px',  width:'1000px' }}>
      {statuses.map((status, index) => {
        return (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            done={done}
          />
        )
      })}
    </div>

  );
}

export default Task;
