import React, { useReducer, useRef, useContext } from "react";

import { TasksContext } from "../../context/TaskContextProvider";
import Calendar from "@toast-ui/react-calendar";
import "../../../node_modules/tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "../../../node_modules/tui-date-picker/dist/tui-date-picker.css";
import "../../../node_modules/tui-time-picker/dist/tui-time-picker.css";
import { ACTIONS } from "../ToDo/ToDo";

const MONTHLY_CUSTOM_THEME = {
  // month header 'dayname'
  "month.dayname.height": "42px",
  "month.dayname.borderLeft": "none",
  "month.dayname.paddingLeft": "8px",
  "month.dayname.paddingRight": "0",
  "month.dayname.fontSize": "13px",
  "month.dayname.backgroundColor": "inherit",
  "month.dayname.fontWeight": "normal",
  "month.dayname.textAlign": "left",

  // month day grid cell 'day'
  "month.holidayExceptThisMonth.color": "#f3acac",
  "month.dayExceptThisMonth.color": "#bbb",
  "month.weekend.backgroundColor": "#fafafa",
  "month.day.fontSize": "16px",

  // month schedule style
  "month.schedule.borderRadius": "5px",
  "month.schedule.height": "18px",
  "month.schedule.marginTop": "2px",
  "month.schedule.marginLeft": "10px",
  "month.schedule.marginRight": "10px",

  // month more view
  "month.moreView.boxShadow": "none",
  "month.moreView.paddingBottom": "0",
  "month.moreView.border": "1px solid #9a935a",
  "month.moreView.backgroundColor": "#f9f3c6",
  "month.moreViewTitle.height": "28px",
  "month.moreViewTitle.marginBottom": "0",
  "month.moreViewTitle.backgroundColor": "#f4f4f4",
  "month.moreViewTitle.borderBottom": "1px solid #ddd",
  "month.moreViewTitle.padding": "0 10px",
  "month.moreViewList.padding": "10px",
};

function reducer(state, action) {
  switch (action.type) {
    case "change-month":
      return {
        tasks: state.tasks,
        month: action.payload.month,
      };
    default:
      return state;
  }
}

export default function TaskCalendar(props) {
  const [{ pending, finished }, Task_Dispatch] = useContext(TasksContext);
  const [state, dispatch] = useReducer(reducer, {
    tasks: pending.map((task, index) => {
      let newObject = {
        ...task,
        id: index.toString(),
        calendarId: "0",
        title: task.taskName,
        category: "time",
        dueDateClass: "",
        bgColor: task.description === "Work" ? "red" : "orange",
        start: new Date(task.date + ` ${task.time}`),
        isReadOnly: false,
      };
      return newObject;
    }),
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
      payload: { task: pending.find((task_) => task_.taskName === e.schedule.title) },
    });

    calendarInstance.deleteSchedule(
      e.schedule.id,
      e.schedule.calendarId,
      false
    );
  };

  const templates = {
    popupDetailLocation: function (schedule) {
      return "Location : " + schedule.location;
    },
    popupDetailTaskName: function (schedule) {
      return "Task Name : " + schedule.title;
    },
    popupDetailBody: function (schedule) {
      console.log(schedule);
      return "Body : " + schedule.description;
    },
    popupDetailTime: function (schedule) {
      return "Time: " + schedule.start.toString();
    },
    popupEdit: function () {
      return "Edit";
    },
    popupDelete: function (schedule) {
      return "Delete";
    },
    time(schedule) {
      return `<a class="ui ${schedule.bgColor} ribbon label"><i class="tag icon"></i>${schedule.title}</a>`;
    },
  };

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
        taskView
        template={templates}
        useDetailPopup={true}
        disableDblClick={true}
        disableClick={true}
        isReadOnly={false}
        onBeforeDeleteSchedule={handleBeforeDeleteSchedule}
      ></Calendar>
    </React.Fragment>
  );
}
