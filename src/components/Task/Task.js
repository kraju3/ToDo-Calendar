/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { ACTIONS } from "../ToDo/ToDo";
import { TasksContext } from "../../context/TaskContextProvider";

function isFinished(tasks, task) {
  return tasks.find(
    (task_) => task_.taskID === task.taskID && task_.taskName === task.taskName
  );
}

export default function Task(props) {
  const [{ finished }] = useContext(TasksContext);

  const isDone = isFinished(finished, props.task);

  const finishTask = (e) => {
    e.preventDefault();
    props.dispatch({
      type: ACTIONS.COMPLETE_TASK,
      payload: { task: props.task },
    });
  };

  const removeTask = (e) => {
    e.preventDefault();
    props.dispatch({
      type: ACTIONS.REMOVE_TASK,
      payload: { task: props.task },
    });
  };

  return (
    <div className="item">
      <div className="content">
        <span className={`ui ${isDone ? "green" : "yellow"}  tag label`}>
          {isDone ? "Finished" : "Upcoming"}
        </span>
        <div className="ui big red label">{props.task.taskName}</div>
        <div className="ui big label">
          <i className="location arrow icon"></i>
          {props.task.location}
        </div>
        <div className="ui big label">
          <i className="calendar icon"></i>
          {props.task.date}
        </div>
        <div className="ui big label">
          <i className="clock icon"></i>
          {props.task.time}
        </div>
      </div>
      <div className="image">
        {isDone ? (
          ""
        ) : (
          <div className="ui buttons">
            <button
              onClick={finishTask}
              className="circular ui icon positive button"
            >
              <i className="calendar check icon"></i>
            </button>
            <div className="or"></div>
            <button
              onClick={removeTask}
              className="circular ui icon negative button"
            >
              <i className="calendar times icon"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
