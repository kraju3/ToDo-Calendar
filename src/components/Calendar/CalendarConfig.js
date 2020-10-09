export const MONTHLY_CUSTOM_THEME = {
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

export const templates = {
  titlePlaceholder: function () {
    return "Subject";
  },
  locationPlaceholder: function () {
    return "Location";
  },
  startDatePlaceholder: function () {
    return "Start date";
  },
  endDatePlaceholder: function () {
    return "End date";
  },
  popupStateFree: function () {
    return "Work";
  },
  popupStateBusy: function () {
    return "Personal";
  },
  popupSave: function () {
    return "Save";
  },
  popupUpdate: function () {
    return "Update";
  },
  popupDetailLocation: function (schedule) {
    return "Location : " + schedule.location;
  },
  popupDetailTaskName: function (schedule) {
    return "Task Name : " + schedule.title;
  },
  popupDetailBody: function (schedule) {
    return "Body : " + schedule.body;
  },
  popupDetailTime: function (schedule) {
    return "Time: " + schedule.start.toString();
  },
  popupEdit: function () {
    return "Edit";
  },
  popupDelete: function () {
    return "Delete";
  },
  time(schedule) {
    return `<a class="ui ${schedule.bgColor} ribbon label"><i class="tag icon"></i>${schedule.title}</a>`;
  },
};
