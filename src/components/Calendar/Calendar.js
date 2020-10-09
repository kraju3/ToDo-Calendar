import Calendar from "@toast-ui/react-calendar";
import React, { useContext, useReducer, useRef, useEffect } from "react";
import "../../../node_modules/tui-calendar/dist/tui-calendar.css";
// If you use the default popups, use this.
import "../../../node_modules/tui-date-picker/dist/tui-date-picker.css";
import "../../../node_modules/tui-time-picker/dist/tui-time-picker.css";
import { TasksContext } from "../../context/TaskContextProvider";
import { ACTIONS } from "../ToDo/ToDo";
import { MONTHLY_CUSTOM_THEME, templates } from "./CalendarConfig";

function reducer(state, action) {
  switch (action.type) {
    case "change-month":
      return {
        tasks: state.tasks,
        month: action.payload.month,
      };
    case "sync-pending":
      return {
        tasks: mapTaskToSchedule(action.payload.tasks),
        month: state.month,
      };
    default:
      return state;
  }
}

function mapTaskToSchedule(tasks) {
  return tasks.map((task, index) => {
    let newObject = {
      ...task,
      id: task.taskID,
      calendarId: "0",
      title: task.taskName,
      category: "time",
      dueDateClass: "",
      bgColor: task.description === "Work" ? "red" : "orange",
      start: new Date(task.date + ` ${task.time}`),
      isReadOnly: false,
    };
    return newObject;
  });
}

export default function TaskCalendar(props) {
  const [{ pending }, Task_Dispatch] = useContext(TasksContext);
  const [state, dispatch] = useReducer(reducer, {
    tasks: mapTaskToSchedule(pending),
    month: new Date().toLocaleString("default", { month: "long" }),
  });

  const calendarRef = useRef();

  const handleClickNextButton = (e) => {
    e.preventDefault();
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.next();
    dispatch({
      type: "change-month",
      payload: {
        month: calendarInstance
          .getDate()
          .toDate()
          .toLocaleString("default", { month: "long" }),
      },
    });
  };

  const handleClickPrevButton = (e) => {
    e.preventDefault();
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.prev();
    dispatch({
      type: "change-month",
      payload: {
        month: calendarInstance
          .getDate()
          .toDate()
          .toLocaleString("default", { month: "long" }),
      },
    });
  };

  const handleBeforeDeleteSchedule = (e) => {
    const calendarInstance = calendarRef.current.getInstance();

    Task_Dispatch({
      type: ACTIONS.REMOVE_TASK,
      payload: {
        task: state.tasks.find(
          (task_) =>
            task_.taskName === e.schedule.title && task_.id === e.schedule.id
        ),
      },
    });

    calendarInstance.deleteSchedule(
      e.schedule.id,
      e.schedule.calendarId,
      false
    );
  };

  const handleBeforeUpdateSchedule = (e) => {
    const calendarInstance = calendarRef.current.getInstance();

    const updatedSchedule = { ...e.schedule, ...e.changes };

    // eslint-disable-next-line array-callback-return
    const [updatedTask] = state.tasks.filter(
      (task_) => task_.taskID === parseInt(e.schedule.id)
    );

    let [
      hour,
      min,
      PMorAM,
    ] = updatedSchedule.start.toDate().toLocaleTimeString().split(":");
    let [, pm_am] = PMorAM.split(" ");

    const newTask = {
      ...updatedTask,
      taskName: updatedSchedule.title,
      date: updatedSchedule.start.toDate().toLocaleDateString(),
      time: `${hour}:${min} ${pm_am}`,
      location: updatedSchedule.location,
    };


    Task_Dispatch({
      type: ACTIONS.UPDATE,
      payload: {
        task: newTask,
      },
    });

    calendarInstance.updateSchedule(
      e.schedule.id,
      e.schedule.calendarId,
      e.changes
    );
  };

  const handleBeforeCreateSchedule = (e) => {
    const { location, start, title } = e;

    let [hour, min, PMorAM] = start.toDate().toLocaleTimeString().split(":");
    let [, pm_am] = PMorAM.split(" ");

    const newSchedule = {
      id: state.tasks.length + 1,
      title,
      location,
      taskName: title,
      calendarId: "0",
      date: start.toDate().toLocaleDateString(),
      time: `${hour}:${min} ${pm_am}`,
      description: e.state,
    };

    Task_Dispatch({
      type: ACTIONS.ADD_TASK,
      payload: {
        task: {
          taskName: newSchedule.taskName,
          date: newSchedule.date,
          time: newSchedule.time,
          description: newSchedule.description,
          location: newSchedule.location,
        },
      },
    });
  };

  useEffect(() => {
    dispatch({ type: "sync-pending", payload: { tasks: pending } });
    console.log("On tasks")
  }, [pending]);

  return (
    <React.Fragment>
      <div>
        <span>
          <button
            onClick={handleClickPrevButton}
            className="ui left labeled icon button"
          >
            <i className="left arrow icon"></i>Prev
          </button>
        </span>
        <span>
          <button
            onClick={handleClickNextButton}
            className="ui right labeled icon button"
          >
            <i className="right arrow icon"></i>Next
          </button>
        </span>
        <h5 className="ui bloack center aligned icon header">
          <i className="calendar alternate icon"></i>
          {state.month}
        </h5>
      </div>
      <Calendar
        ref={calendarRef}
        view={"month"}
        theme={MONTHLY_CUSTOM_THEME}
        schedules={state.tasks}
        scheduleView
        template={templates}
        useCreationPopup={true}
        useDetailPopup={true}
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        onBeforeDeleteSchedule={handleBeforeDeleteSchedule}
        onBeforeUpdateSchedule={handleBeforeUpdateSchedule}
        onBeforeCreateSchedule={handleBeforeCreateSchedule}
      ></Calendar>
    </React.Fragment>
  );
}
