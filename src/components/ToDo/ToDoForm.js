import React, { useContext, useState } from "react";
import { TasksContext } from "../../context/TaskContextProvider";
import { ACTIONS } from "../ToDo/ToDo";

const PMorAM = (time) => {
  const [hour, min] = time.split(":");

  return parseInt(hour) > 11 && parseInt(hour) < 24
    ? `${parseInt(hour) > 12 ? `${parseInt(hour) - 12}` : "12"}:${min} PM`
    : `${hour}:${min} AM`;
};

const transformDate = ([year, month, day]) => {
  return `${parseInt(month)}/${parseInt(day)}/${year}`;
};

export default function ToDoForm(props) {
  const [taskName, setTaskName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const [tasks, Task_Dispatch] = useContext(TasksContext);

  const onTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const onLocation = (e) => {
    setLocation(e.target.value);
  };

  const onDate = (e) => {
    setDate(e.target.value);
  };

  const onTime = (e) => {
    setTime(e.target.value);
  };

  const onDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const onToDoSubmit = (e) => {
    e.preventDefault();
    const task_ = {
      taskName,
      location,
      time: PMorAM(time),
      date: transformDate(date.split("-")),
      description,
    };
    Task_Dispatch({ type: ACTIONS.ADD_TASK, payload: { task: task_ } });
    props.dispatch({ type: ACTIONS.CLOSE_FORM });
  };

  return (
    <form onSubmit={onToDoSubmit} className="ui form">
      <div className="field">
        <label>Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={onTaskName}
          placeholder="To do Task"
        />
      </div>
      <div className="field">
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={onLocation}
          placeholder="Location"
        />
      </div>
      <div className="field">
        <label>Date</label>
        <input type="date" value={date} onChange={onDate} placeholder="Date" />
      </div>
      <div className="field">
        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={onTime}
          placeholder="Time(H:MM:00 PM/AM)"
        />
      </div>
      <div className="field">
        <label>Description</label>
        <select onChange={onDescription} className="ui dropdown">
          <option value="">Description</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <button className="ui negative button" type="submit">
        <i className="plus icon"></i>ToDo
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.dispatch({ type: ACTIONS.CLOSE_FORM });
        }}
        className="ui negative button"
        type="button"
      >
        <i className="times icon"></i>Close
      </button>
    </form>
  );
}
