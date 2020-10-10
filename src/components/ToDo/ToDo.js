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
  UPDATE: "sync",
};

function checkToday(task) {
  return (
    new Date(task.date).toLocaleDateString() === new Date().toLocaleDateString()
  );
}

function sortByToday(pending) {
  const todaysTasks = pending.filter((task) => checkToday(task) === true);

  console.log(todaysTasks);

  return todaysTasks;
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DISPLAY_FORM:
      return {
        toAdd: !state.toAdd,
        ...state,
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
        <h2 className="ui block center aligned icon header">
          Today<i className="calendar outline icon"></i>{" "}
          {`${
            new Date().getMonth() + 1
          }/${new Date().getDay()}/${new Date().getFullYear()}`}
        </h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: ACTIONS.DISPLAY_FORM });
          }}
          className=" circular ui negative button"
          type="submit"
        >
          <i className="plus icon"></i>ToDo
        </button>
        {state.toAdd ? (
          <div className="ui active tiny modal">
            <div className="content">
              <ToDoForm dispatch={dispatch} />
            </div>
          </div>
        ) : null}
      </div>
      <div className="ui three statistics">
        <div className="yellow statistic">
          <div className="value">{pending.length}</div>
          <div className="label">Pending Total</div>
        </div>
        <div className="red statistic">
          <div className="value">{sortByToday(pending).length}</div>
          <div className="label">Pending Today</div>
        </div>
        <div className="green statistic">
          <div className="value">{finished.length}</div>
          <div className="label">Completed Today</div>
        </div>
      </div>

      <br></br>

      <div id="ui left small rail">
        <div  onMouseEnter={(e) => {
            e.preventDefault();
            dispatch({ type: "toggle-pending" });
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            dispatch({ type: "toggle-pending" });
          }} className="ui segment">
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
