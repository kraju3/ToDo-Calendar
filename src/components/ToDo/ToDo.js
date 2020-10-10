import React, { useContext, useReducer } from "react";
import { TasksContext } from "../../context/TaskContextProvider";
import Task from "../Task/Task";
import TaskStatistic from "../Task/TaskStatistic";
import "./ToDo.css";
import ToDoButton from "./ToDoButton";
import Today from "./Today";
import ToDoForm from "./ToDoForm";

import { ACTIONS, sortByToday } from "../../helpers/TaskHelpers";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DISPLAY_FORM:
      return {
        toAdd: !state.toAdd,
        togglePending: state.togglePending,
        toggleCompleted: state.toggleCompleted,
      };
    case ACTIONS.CLOSE_FORM:
      return {
        toAdd: !state.toAdd,
        togglePending: state.togglePending,
        toggleCompleted: state.toggleCompleted,
      };
    case "toggle-pending":
      console.log(state);
      return {
        togglePending: !state.togglePending,
        toggleCompleted: false,
        toAdd: state.toAdd,
      };
    case "toggle-completed":
      console.log(state);
      return {
        toggleCompleted: !state.toggleCompleted,
        togglePending: false,
        toAdd: state.toAdd,
      };
    default:
      return state;
  }
}

export default function ToDo(props) {
  const [state, dispatch] = useReducer(reducer, {
    toAdd: false,
    togglePending: false,
    toggleCompleted: false,
  });

  const [{ pending, finished }, Task_Dispatch] = useContext(TasksContext);

  return (
    <React.Fragment>
      <div>
        <Today />
        <ToDoButton dispatch={dispatch} />
        {state.toAdd ? (
          <div className="ui active tiny modal">
            <div className="content">
              <ToDoForm dispatch={dispatch} />
            </div>
          </div>
        ) : null}
      </div>
      <TaskStatistic finished={finished} pending={pending} />
      <br></br>

      <div id="ui left small rail">
        <div
          onMouseEnter={(e) => {
            e.preventDefault();
            dispatch({ type: "toggle-pending" });
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            dispatch({ type: "toggle-pending" });
          }}
          className="ui segment"
        >
          <button className="ui yellow ribbon huge label">
            <i className="tasks icon"></i> Pending
          </button>

          {state.togglePending ? (
            <div className="ui segment">
              <br></br>
              <div className="ui divided items">
                {sortByToday(pending).map((task, index) => {
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
          ) : (
            ""
          )}
        </div>
      </div>

      <div id="ui right small rail">
        <div
          onMouseEnter={(e) => {
            e.preventDefault();
            dispatch({ type: "toggle-completed" });
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            dispatch({ type: "toggle-completed" });
          }}
          className="ui segment"
        >
          <button className="ui green ribbon huge label">
            <i className="tasks icon"></i> Completed
          </button>

          {state.toggleCompleted ? (
            <div className="ui segment">
              <br></br>
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
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
