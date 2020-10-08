import React from 'react';
import {ACTIONS} from '../ToDo/ToDo'



export default function Task(props){

    const finishTask=(e)=>{
        e.preventDefault()
        props.dispatch({ type:ACTIONS.COMPLETE_TASK, payload:{task:props.task} })
    }

    const removeTask = (e)=>{
        e.preventDefault()
        props.dispatch({ type:ACTIONS.REMOVE_TASK, payload:{task:props.task} })
    }


    return(

        <div className="item">
        <div className="content">
            <div className="ui big red label">
                {props.task.taskName}
            </div>
            <div className="ui big label">
            <i className="location arrow icon"></i>{props.task.location}
            </div>
            <div className="ui big label">
            <i className="calendar icon"></i>{props.task.date}
            </div>
            <div className="ui big label">
            <i className="clock icon"></i>{props.task.time}
            </div>
        </div>
        <div className="image">
          <div className="ui buttons">
            <button onClick={finishTask} className="circular ui icon positive button">
            <i className="calendar check icon"></i>
            </button>
            <div className="or"></div>
            <button onClick={removeTask} className="circular ui icon negative button">
            <i className="calendar times icon"></i>
            </button>
          </div>
         
        </div>
      </div>



    )
}