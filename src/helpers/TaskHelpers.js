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

export function sortByToday(pending) {
  const todaysTasks = pending.filter((task) => checkToday(task) === true);

  console.log(todaysTasks);

  return todaysTasks;
}

export const PMorAM = (time) => {
  const [hour, min] = time.split(":");

  return parseInt(hour) > 11 && parseInt(hour) < 24
    ? `${parseInt(hour) > 12 ? `${parseInt(hour) - 12}` : "12"}:${min} PM`
    : `${hour}:${min} AM`;
};

export const transformDate = ([year, month, day]) => {
  return `${parseInt(month)}/${parseInt(day)}/${year}`;
};

export function isFinished(tasks, task) {
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

export function IsExpired(task) {
  const [taskHr, taskMin] = new Date(`${task.date} ${task.time}`)
    .toTimeString()
    .split(":");

  const [hr, min] = new Date().toTimeString().split(":");

  return checkTime({ taskHr, taskMin }, { hr, min });
}

export function mapTaskToSchedule(tasks) {
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

export function UpdateTask(pending, updatedTask) {
  return pending.map((task) => {
    return task.taskID === updatedTask.taskID
      ? Object.assign({}, task, {
          taskName: updatedTask.taskName,
          description: updatedTask.description,
          date: updatedTask.date,
          time: updatedTask.time,
          location: updatedTask.location,
        })
      : task;
  });
}

export function sortTasks(tasks) {
  return tasks.sort((a, b) => {
    return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
  });
}
