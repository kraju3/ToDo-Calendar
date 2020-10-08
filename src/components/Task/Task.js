import React from 'react';


export default function Task(props){

    return(

        <div className="item">
        <div className="image">
          <i className="tasks icon"></i>
        </div>
        <div className="content">
            <div className="ui big red label">
                {props.task.taskName}
            </div>
            <div className="ui big label">
                {props.task.location}
            </div>
            <div className="ui big label">
            <i className="calendar icon"></i>{props.task.date}
            </div>
            <div className="ui big label">
            <i className="clock icon"></i>{props.task.time}
            </div>
        </div>
      </div>



    )
}