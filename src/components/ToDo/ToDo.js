import React, { useEffect,useState } from 'react';
import {readData,writeData} from '../../helpers/crud'
import ToDoForm from './ToDoForm'
import Task from '../Task/Task'

import './ToDo.css';


export default function ToDo(props){

    const [tasks,setTasks] = useState([])

    useEffect(()=>{

        setTasks(readData())
        console.log(tasks)

    },[tasks])




    const AddToDo = (task)=>{
        
        setTasks(tasks=>[...tasks,task])

        writeData(tasks)
    }

    return (
        <React.Fragment>

        <div className="center-screen">
            <div className="ui yellow statistic">
                <div className="value">
                    {tasks.length}
                </div>
                <div className="label">
                    Pending
                </div>
            </div>  
            <div className="ui card">
               <ToDoForm onToDoSubmitForm={AddToDo}/>
            </div>
            
        </div>
        <h3 className="ui center aligned yellow header">
            PENDING
        </h3>
        <div className="ui divided items">
                {tasks.map((task,index)=>{
                    return <Task key={task.taskName+index} task={task}/>
                })}
        </div>  

        </React.Fragment>
    )
}