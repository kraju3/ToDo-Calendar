import React , {useState} from 'react';



export default function ToDoForm(props){


    const [taskName,setTaskName] = useState('')
    const [location,setLocation] = useState('')
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [description,setDescription] = useState('')


    const onTaskName = (e)=>{
        e.preventDefault()
        setTaskName(e.target.value)
    }

    const onLocation = (e) =>{
        e.preventDefault()
        setLocation(e.target.value)
    
    }

    const onDate = (e)=>{
        e.preventDefault()
        setDate(e.target.value)
    }

    const onTime = (e)=>{
        e.preventDefault()
        setTime(e.target.value)
    }

    const onDescription = (e)=>{
        e.preventDefault()
        setDescription(e.target.value)
    }

    const onToDoSubmit = (e)=>{
        e.preventDefault()
        props.onToDoSubmitForm({
            taskName,
            location,
            time,
            date,
            description
        })
    }

    return(
        <form className="ui form">
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
        <button onSubmit={onToDoSubmit} className="ui button" type="submit">ToDo</button>
      </form>
    );
}