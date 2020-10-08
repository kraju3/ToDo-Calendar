import React , {useState} from 'react';
import {ACTIONS} from '../ToDo/ToDo'

const timeZone = [13,14,15,16,17,18,19,20,21,22,23]


const PMorAM = (time)=>{
  const [hour,min] = time.split(":")
  let newTime = ''

  if(parseInt(hour) >11 && parseInt(hour)<24){
    newTime+=`${timeZone.includes(hour.toString)?timeZone.indexOf(hour)+1:'12'}:${min} PM`
  }
  else{
    newTime+=`${hour}:${min} AM`
  }

  return newTime
}

const transformDate = (date)=>{
  const [year,month,day] = date.split('-')
  return `${parseInt(month)}/${parseInt(day)}/${year}`
}

export default function ToDoForm(props){


    const [taskName,setTaskName] = useState('')
    const [location,setLocation] = useState('')
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [description,setDescription] = useState('')


    const onTaskName = (e)=>{
        setTaskName(e.target.value)
    }

    const onLocation = (e) =>{
        
        setLocation(e.target.value)
    
    }

    const onDate = (e)=>{
        
        setDate(e.target.value)
    }

    const onTime = (e)=>{
        
        setTime(e.target.value)
        
    }

    const onDescription = (e)=>{
        
        setDescription(e.target.value)
    }



    const onToDoSubmit = (e)=>{

        console.log(PMorAM(time))

        e.preventDefault()
        const task_={
          taskName,
          location,
          time:PMorAM(time),
          date:transformDate(date),
          description
      }
        props.dispatch({type:ACTIONS.ADD_TASK,payload:{task:task_}})

    }

    return(
        <form onSubmit={onToDoSubmit} className="ui form">
        <div className="field">
          <label>Task Name</label>
          <input type="text" value={taskName} onChange={onTaskName} placeholder="To do Task"/>
        </div>
        <div className="field">
          <label>Location</label>
          <input type="text" value={location} onChange={onLocation} placeholder="Location"/>
        </div>
        <div className="field">
          <label>Date</label>
          <input type="date" value={date} onChange={onDate} placeholder="Date"/>
        </div>
        <div className="field">
          <label>Time</label>
          <input type="time" value={time} onChange={onTime} placeholder="Time(H:MM:00 PM/AM)"/>
        </div>
      <div className="field">
        <label>Description</label>
        <textarea value={description} onChange={onDescription} rows="2"></textarea>
      </div>
        <button  className="ui negative button" type="submit"><i className="plus icon"></i>ToDo</button>
        <button onClick={(e)=>{
                e.preventDefault()
                props.dispatch({type:ACTIONS.CLOSE_FORM})
            }}  className="ui negative button" type="button"><i className="times icon"></i>Close</button>
      </form>
    );
}