import React, { useReducer ,useEffect } from 'react';
import ToDoForm from './ToDoForm'
import Task from '../Task/Task'

import './ToDo.css';


export const ACTIONS = {
    ADD_TASK:'add-task',
    REMOVE_TASK:'remove-task',
    COMPLETE_TASK:'complete-task',
    DISPLAY_FORM:'display-form',
    CLOSE_FORM:'close-form'
}


function sortTasks(tasks){

   return tasks.sort((a,b)=> {return new Date(`${a.date} ${a.time}`)-new Date(`${b.date} ${b.time}`)})

}


function reducer(state,action){
    switch(action.type){
        case ACTIONS.ADD_TASK:
            return {
                    tasks:sortTasks([...state.tasks,action.payload.task]),
                    finished:[...state.finished],
                    toAdd:false

                    }
        case ACTIONS.REMOVE_TASK:
            return {
                        tasks:sortTasks(state.tasks.filter(task=>task.taskName!==action.payload.task.taskName)),
                        finished:[...state.finished],
                        toAdd:state.toAdd
                    }
        case ACTIONS.COMPLETE_TASK:
            return {
                        tasks:sortTasks(state.tasks.filter(task=>task.taskName!==action.payload.task.taskName)),

                        finished:[...state.finished,action.payload.task],

                        toAdd:state.toAdd
                    }
        case ACTIONS.DISPLAY_FORM:
            return {
                    tasks:[...state.tasks],
                    finished:[...state.finished],
                    toAdd:true
                    }
        case ACTIONS.CLOSE_FORM:
            return {
                    tasks:[...state.tasks],
                    finished:[...state.finished],
                    toAdd:false
            }
        default:
            return state
    }
}

export default function ToDo(props){

    const [state,dispatch] = useReducer(reducer,{ 
        tasks:props.tasks.sort((a,b)=> {return new Date(`${a.date} ${a.time}`)-new Date(`${b.date} ${b.time}`)}), 
        finished:[] , 
        toAdd:false 
    })

    const AppDispatcher = props.dispatch


    useEffect(()=>{
        AppDispatcher({type:'sync',payload:{tasks:state.tasks}})
    },[state.tasks,AppDispatcher])

    return (
        <React.Fragment>
        
        {state.toAdd? <div className="ui active tiny modal">
                            <div className="content">
                                <ToDoForm dispatch={dispatch}/>
                            </div>     
                        </div> :
                        null

        }


        <div className="center-screen">
            <h2 className="ui bloack center aligned icon header">
                    <i className="circular tasks icon"></i>
                        Tasks
            </h2>
            <button onClick={(e)=>{
                e.preventDefault()
                dispatch({type:ACTIONS.DISPLAY_FORM})
            }}  className="ui negative button" type="submit"><i className="plus icon"></i>ToDo</button>
            <div className="ui statistics">
                <div className="yellow statistic">
                    <div className="value">
                        {state.tasks.length}
                    </div>
                    <div className="label">
                        Pending
                    </div>
                </div>
                <div className="green statistic">
                    <div className="value">
                        {state.finished.length}
                    </div>
                    <div className="label">
                        Completed
                    </div>
                </div>
            </div>
            <div className="ui segment">

                <div className="ui two column very relaxed grid">
                    <div className="column">
                        <h3 className="ui center aligned yellow header">
                                Pending
                        </h3>
                        <div className="ui divided items">
                                {state.tasks.map((task,index)=>{
                                    return <Task key={task.taskName+index} task={task} dispatch={dispatch}/>
                                })}
                        </div>  
                    </div>
                    <div className="column">
                        <h3 className="ui center aligned green header">
                                Completed
                        </h3>
                        <div className="ui divided items">
                                {state.finished.map((task,index)=>{
                                    return <Task key={task.taskName+index} task={task} dispatch={dispatch}/>
                                })}
                        </div>  
                    </div>
                </div>
                <div className="ui vertical divider">
                    
                    AND
                </div>
            </div>
             
        </div>
    
        </React.Fragment>
    )
}

