/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { ACTIONS } from "../ToDo/ToDo";
import { TasksContext } from "../../context/TaskContextProvider";

function isFinished(tasks, task) {
  return tasks.find(
    (task_) => task_.taskID === task.taskID && task_.taskName === task.taskName
  );
}

function checkTime(task, now) {
  console.log(task);
  console.log(now);
  return (
    parseInt(task.taskHr) <= parseInt(now.hr) &&
    parseInt(task.taskMin) <= parseInt(now.min)
  );
}

function IsExpired(task) {
  const [taskHr, taskMin] = new Date(`${task.date} ${task.time}`)
    .toTimeString()
    .split(":");

  const [hr, min] = new Date().toTimeString().split(":");

  return checkTime({ taskHr, taskMin }, { hr, min });
}

export default function Task(props) {
  const [{ finished }] = useContext(TasksContext);

  const isDone = isFinished(finished, props.task);
  const isExpired = IsExpired(props.task);

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
        <span
          className={`ui ${
            isExpired ? "red" : isDone ? "green" : "yellow"
          }  tag label`}
        >
          {isExpired ? "Expired" : isDone ? "Finished" : "Upcoming"}
        </span>
        <div
          className={`ui big ${
            props.task.description === "Work" ? "red" : "orange"
          } label`}
        >
          {props.task.taskName}
        </div>
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
