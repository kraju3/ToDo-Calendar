import React, { useContext, useReducer } from "react";
import { TasksContext } from "../../context/TaskContextProvider";
import Task from "../Task/Task";
import "./ToDo.css";
import ToDoForm from "./ToDoForm";

export const ACTIONS = {
  ADD_TASK: "add-task",
  REMOVE_TASK: "remove-task",
  COMPLETE_TASK: "complete-task",
  DISPLAY_FORM: "display-form",
  CLOSE_FORM: "close-form",
  SYNC: "sync",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DISPLAY_FORM:
      return {
        toAdd: !state.toAdd,
      };
    case ACTIONS.CLOSE_FORM:
      return {
        toAdd: !state.toAdd,
      };
    default:
      return state;
  }
}

export default function ToDo(props) {
  const [state, dispatch] = useReducer(reducer, {
    toAdd: false,
  });

  const [{ pending, finished }, Task_Dispatch] = useContext(TasksContext);

  return (
    <React.Fragment>
      {state.toAdd ? (
        <div className="ui active tiny modal">
          <div className="content">
            <ToDoForm dispatch={dispatch} />
          </div>
        </div>
      ) : null}

      <div className="center-screen">
        <h2 className="ui bloack center aligned icon header">
          <i className="circular tasks icon"></i>
          Tasks
        </h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: ACTIONS.DISPLAY_FORM });
          }}
          className="ui negative button"
          type="submit"
        >
          <i className="plus icon"></i>ToDo
        </button>

        <div className="ui statistic">
          <div className="label">Today</div>
          <div className="value">
            <i className="calendar outline icon"></i>{" "}
            {`${new Date().getDate()}/${new Date().getDay()}/${new Date().getFullYear()}`}
          </div>
        </div>
        <div className="ui statistics">
          <div className="yellow statistic">
            <div className="value">{pending.length}</div>
            <div className="label">Pending</div>
          </div>
          <div className="green statistic">
            <div className="value">{finished.length}</div>
            <div className="label">Completed</div>
          </div>
        </div>
        <div className="ui segment">
          <div className="ui two column very relaxed grid">
            <div className="column">
              <h3 className="ui center aligned yellow header">Pending</h3>
              <div className="ui divided items">
                {pending.map((task, index) => {
                  return (
                    <Task
                      key={task.taskName + index}
                      task={task}
                      dispatch={Task_Dispatch}
                    />
                  );
                })}
              </div>
            </div>
            <div className="column">
              <h3 className="ui center aligned green header">Completed</h3>
              <div className="ui divided items">
                {finished.map((task, index) => {
                  return (
                    <Task
                      key={task.taskName + index}
                      task={task}
                      dispatch={Task_Dispatch}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="ui vertical divider">AND</div>
        </div>
      </div>
    </React.Fragment>
  );
}
