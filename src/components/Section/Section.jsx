import React from 'react'
import Header from '../Header/Header'
import List from '../List/List'

import { useDrag, useDrop } from 'react-dnd'
import axios from 'axios'
import { baseurl } from '../../../url';



function Section({key, status, tasks, setTasks, todos, inProgress, done}) {

    // console.log("tasks",todos);
    
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item._id) ,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
        }))

    let text = "Todo"
    let taskToMap = todos

    if(status === 'inprogress'){
        text = "In Progress"
        taskToMap = inProgress
    }

    if(status === 'done'){
        text = "Done"
        taskToMap = done
    }


    // console.log(typeof taskToMap);
    const addItemToSection = async (_id) => {
        console.log("dropped",_id);
        setTasks(prev => {
            console.log('prev',prev);
            const mtasks = prev.map((t) => {
                if(t._id === _id){
                    return {...t, status: status}
                }
                return t
            })
            console.log(mtasks.fil);
            return mtasks.filter((ele) => {
                if(ele._id === _id){
                    axios.put(`${baseurl}/api/notes/updateone/`+_id, ele, {
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }
                 })
                 .then((response) => {
                    window.location.reload()
                 })
                }
            })
        })
    }

    
  return (

    <div ref={drop} style={{ backgroundColor: 'white', padding: '20px',margin:'10px',marginTop:'80px',height:'60vh', borderRadius: '10px', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', width: '140%', }}>
        {/* <div > */}
        <Header text={text} count={taskToMap.length} />
        {taskToMap.map(task => <List key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
    {/* </div> */}
    </div>
  )
}

export default Section