import React,{useState} from 'react';
// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { baseurl } from '../../../url';


import './Addtask.css'
import { Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Addtask({tasks,setTasks}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [task,setTask] = useState({
    id: uuidv4(),
    taskname:"",
    description:'',
    status: "todo",
  })

  const navigate = useNavigate()

  const inputHandler = (e) => {
    const {name, value} = e.target
    setTask({...task,[name]:value})
}

  // console.log(task);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(task);
    await axios.post(`${baseurl}/api/notes/create`, task,{
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }
  })
  .then((response) => {
      console.log(response);
  //     // toast.success(response.data.message, {position:"top-right"})
      setTasks((prev) => {
        const list = [...prev, response.data.savedData ]
        
        // localStorage.setItem('tasks', JSON.stringify(list))
        return list
        // window.location.reload()
      })
      navigate('/dashboard')
      window.location.reload()
  })
  .catch((err) => {
      console.log(err);
  })
    setTasks({
      id:'',
      taskname:'',
      description:'',
      status: 'todo'
    })
  }

    return (
    <div className='addtask-main-div'>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="taskname"
                  className='addtask-input'
                  placeholder="Task Name"
                  value={task.taskname}
                  onChange={inputHandler}
                  
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="description"
                  placeholder="Task Description"
                  value={task.description}
                  onChange={inputHandler}
                  className='addtask-input'
                />
              </div>
              <div className='addtask-button-div' >
                <Button variant="secondary"  onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary"  onClick={handleSubmit}>
                  Save
                </Button>
              </div>
            </form>
        </Modal.Body>
      </Modal>

      <div className='addtask-second-div' >
        <span>
          <div>
            <label>Search: </label>
            <input className='addtask-input-secondary' type="text" placeholder='search' />
            <label style={{ marginLeft: '450px' }}>Sort By:  </label>
            <select className='addtask-input-secondary' >
              <option>Recent</option>
            </select>
          </div>
        </span>
      </div>      
    </div>
  );
}

export default Addtask;
