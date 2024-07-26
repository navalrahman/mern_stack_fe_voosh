import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { baseurl } from '../../../url';


function List({ task, tasks, setTasks }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('');
    const handleEditClose = () => setEdit(false);
    const handleEdit = (id) => {
        setId(id);
        setEdit(true);
    };

    const [updatedTask, setUpdatedTask] = useState({
        taskname: '',
        description: '',
        status: 'todo',
    });

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { _id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`${baseurl}/api/notes/deleteone/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const response = await axios.get(`${baseurl}/api/notes/getone/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUpdatedTask(response.data.notesData);
            };
            fetchData();
        }
    }, [id]);

    const handleSubmit = async () => {
        await axios.put(`${baseurl}/api/notes/updateone/${id}`, updatedTask, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setTasks((prevTasks) => prevTasks.map((task) => task._id === id ? updatedTask : task));
            handleEditClose();
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div ref={drag} style={{ width: '300px', marginBottom: '10px', height: '180px', overflowY: 'auto', backgroundColor: 'white', padding: '0px', borderRadius: '10px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p>{task.taskname}</p>
            <p>{task.description}</p>
            <p>{task.createdAt}</p>
            <button onClick={() => handleEdit(task._id)}>edit</button>
            <button onClick={handleShow}>view</button>
            <button onClick={() => handleDelete(task._id)}>delete</button>

            <Modal show={show} onHide={handleClose}>
                <h4 style={{ textAlign: 'center', padding: '5px' }}>Details</h4>
                <Modal.Body>Title: {task.taskname}</Modal.Body>
                <Modal.Body>Description: {task.description}</Modal.Body>
                <Modal.Body>Created time: {task.createdAt}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={edit} onHide={handleEditClose}>
                <Modal.Header>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                name="taskname"
                                value={updatedTask.taskname}
                                onChange={inputChangeHandler}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                name="description"
                                value={updatedTask.description}
                                onChange={inputChangeHandler}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                            <Button variant="primary" onClick={handleSubmit}>Update</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default List;
