/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { TasksContext } from "../../context/TaskContextProvider";
import { ACTIONS,isFinished, IsExpired } from "../../helpers/TaskHelpers";

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
