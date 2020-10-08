import React, {useReducer} from 'react';

import Calendar from '@toast-ui/react-calendar';
import '../../../node_modules/tui-calendar/dist/tui-calendar.css';

// If you use the default popups, use this.
import '../../../node_modules/tui-date-picker/dist/tui-date-picker.css';
import '../../../node_modules/tui-time-picker/dist/tui-time-picker.css';

var MONTHLY_CUSTOM_THEME = {
    // month header 'dayname'
    'month.dayname.height': '42px',
    'month.dayname.borderLeft': 'none',
    'month.dayname.paddingLeft': '8px',
    'month.dayname.paddingRight': '0',
    'month.dayname.fontSize': '13px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': '#f3acac',
    'month.dayExceptThisMonth.color': '#bbb',
    'month.weekend.backgroundColor': '#fafafa',
    'month.day.fontSize': '16px',

    // month schedule style
    'month.schedule.borderRadius': '5px',
    'month.schedule.height': '18px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '10px',
    'month.schedule.marginRight': '10px',

    // month more view
    'month.moreView.boxShadow': 'none',
    'month.moreView.paddingBottom': '0',
    'month.moreView.border': '1px solid #9a935a',
    'month.moreView.backgroundColor': '#f9f3c6',
    'month.moreViewTitle.height': '28px',
    'month.moreViewTitle.marginBottom': '0',
    'month.moreViewTitle.backgroundColor': '#f4f4f4',
    'month.moreViewTitle.borderBottom': '1px solid #ddd',
    'month.moreViewTitle.padding': '0 10px',
    'month.moreViewList.padding': '10px'
  };

const templates = {
  popupDetailLocation: function(schedule) {
    return 'Location : ' + schedule.location;
  },
  popupDetailTaskName: function(schedule) {
    return 'Task Name : ' + schedule.title;
  },
  popupDetailBody: function(schedule) {
    console.log(schedule)
    return 'Body : ' + schedule.description;
  },
  popupDetailTime: function(schedule) {
    
    return 'Time: ' +schedule.start.toString()
  },
  time(schedule) {
    return `<span style="color:#fff;background-color: red;">${
      schedule.title
    }</span>`;
  },
}

function reducer(tasks,action){


}

export default function TaskCalendar (props) {
    
    const [state,dispatch] = useReducer(reducer,{tasks:props.tasks.map((task,index)=>{
        let newObject = {...task,id:index.toString(),calendarId:'0',title:task.taskName,category:'time',dueDateClass:'',start:new Date(task.date+` ${task.time}`),isReadOnly:true}
        return newObject
    })})

  
    

    return(
            <React.Fragment>
                <Calendar
                    view={"month"} theme={MONTHLY_CUSTOM_THEME}
                    schedules={state.tasks}
                      scheduleView
                      taskView
                      template={templates}
                      useDetailPopup={true}
                      disableDblClick={true}
                      disableClick={false}
                      isReadOnly={true}
                ></Calendar>
            </React.Fragment>
    )
    
}