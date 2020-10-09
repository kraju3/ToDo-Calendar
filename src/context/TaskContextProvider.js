import React, { createContext, useReducer } from "react";
import { ACTIONS } from "../components/ToDo/ToDo";

export const TasksContext = createContext({});

const Tasks = [
  {
    taskName: "ICD-9-CM",
    location: "Huanglin",
    time: "1:16 AM",
    description: "Personal",
    date: "1/6/2020",
  },
  {
    taskName: "PFMEA",
    location: "Huangdi",
    time: "11:10 PM",
    description: "Personal",
    date: "2/18/2020",
  },
  {
    taskName: "OLEDB",
    location: "Cambas",
    time: "6:37 PM",
    description: "Personal",
    date: "3/5/2020",
  },
  {
    taskName: "vBlock",
    location: "Vällingby",
    time: "1:59 PM",
    description: "Personal",
    date: "4/7/2020",
  },
  {
    taskName: "BWA",
    location: "Frýdlant",
    time: "7:11 AM",
    description: "Work",
    date: "4/30/2020",
  },
  {
    taskName: "iLife",
    location: "Gangkou",
    time: "3:18 PM",
    description: "Work",
    date: "10/28/2019",
  },
  {
    taskName: "UTRAN",
    location: "Bell Ville",
    time: "5:37 PM",
    description: "Work",
    date: "3/3/2020",
  },
  {
    taskName: "IT Project &amp; Program Management",
    location: "Puerto San José",
    time: "1:11 PM",
    description: "Work",
    date: "11/3/2019",
  },
  {
    taskName: "React",
    location: "Puerto San José",
    time: "1:11 PM",
    description: "Work",
    date: "10/9/2020",
  },
];

function sortTasks(tasks) {
  return tasks.sort((a, b) => {
    return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
  });
}

function reducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        pending: sortTasks([...tasks.pending, action.payload.task]),
        finished: tasks.finished,
      };
    case ACTIONS.REMOVE_TASK:
      return {
        pending: sortTasks(
          tasks.pending.filter(
            (task) => task.taskName !== action.payload.task.taskName
          )
        ),
        finished: tasks.finished,
      };
    case ACTIONS.COMPLETE_TASK:
      return {
        pending: sortTasks(
          tasks.pending.filter(
            (task) => task.taskName !== action.payload.task.taskName
          )
        ),
        finished: [...tasks.finished, action.payload.task],
      };
    case ACTIONS.SYNC:
      return {
        tasks: action.payload.tasks,
        finished: tasks.finished,
      };
    default:
      return tasks;
  }
}

export const TasksProvider = (props) => {
  const [tasks, Task_Dispatch] = useReducer(reducer, {
    pending: sortTasks(Tasks),
    finished: [],
  });

  return (
    <TasksContext.Provider value={[tasks, Task_Dispatch]}>
      {props.children}
    </TasksContext.Provider>
  );
};
