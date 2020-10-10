import React, { createContext, useReducer } from "react";
import { ACTIONS, UpdateTask , sortTasks } from ".././helpers/TaskHelpers"

export const TasksContext = createContext({});

const Tasks = [
  {
    taskID: 1,
    taskName: "ICD-9-CM",
    location: "Huanglin",
    time: "1:16 AM",
    description: "Personal",
    date: "10/10/2020",
  },
  {
    taskID: 2,
    taskName: "PFMEA",
    location: "Huangdi",
    time: "11:10 PM",
    description: "Personal",
    date: "2/18/2020",
  },
  {
    taskID: 3,
    taskName: "OLEDB",
    location: "Cambas",
    time: "6:37 PM",
    description: "Personal",
    date: "10/10/2020",
  },
  {
    taskID: 4,
    taskName: "vBlock",
    location: "Vällingby",
    time: "1:59 PM",
    description: "Personal",
    date: "4/7/2020",
  },
  {
    taskID: 5,
    taskName: "BWA",
    location: "Frýdlant",
    time: "7:11 AM",
    description: "Work",
    date: "10/10/2020",
  },
  {
    taskID: 6,
    taskName: "iLife",
    location: "Gangkou",
    time: "3:18 PM",
    description: "Work",
    date: "10/28/2019",
  },
  {
    taskID: 7,
    taskName: "UTRAN",
    location: "Bell Ville",
    time: "5:37 PM",
    description: "Work",
    date: "3/3/2020",
  },
  {
    taskID: 8,
    taskName: "IT Project &amp; Program Management",
    location: "Puerto San José",
    time: "1:11 PM",
    description: "Work",
    date: "11/3/2019",
  },
  {
    taskID: 9,
    taskName: "React",
    location: "Puerto San José",
    time: "1:11 PM",
    description: "Work",
    date: "10/9/2020",
  },
];



function reducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      console.log(action.payload.task)
      return {
        pending: sortTasks([
          ...tasks.pending,
          { ...action.payload.task, taskID: tasks.pending.length + 1 },
        ]),
        finished: tasks.finished,
      };
    case ACTIONS.REMOVE_TASK:
      return {
        pending: sortTasks(
          tasks.pending.filter(
            (task) => task.taskName !== action.payload.task.taskName
          )
        ),
        finished:tasks.finished
      };
    case ACTIONS.COMPLETE_TASK:
      return {
        pending: sortTasks(
          tasks.pending.filter(
            (task) => task.taskName !== action.payload.task.taskName
          )
        ),
        finished:[...tasks.finished,action.payload.task]
      };
    case ACTIONS.UPDATE:
      const updatedTask = action.payload.task;
      console.log(updatedTask);
      return {
        pending: sortTasks(UpdateTask(tasks.pending, updatedTask)),
        finished:tasks.finished
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
