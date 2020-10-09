import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import TaskCalendar from "./components/Calendar/Calendar";
import Navigation from "./components/Navbar";
import ToDo from "./components/ToDo/ToDo";
import { TasksProvider } from "./context/TaskContextProvider";

export default function App() {
  return (
    <React.Fragment>
      <Navigation />
      <div className="ui segment">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <TasksProvider>
                  <ToDo />
                </TasksProvider>
              );
            }}
          ></Route>
          <Route
            exact
            path="/calendar"
            render={() => {
              return (
                <TasksProvider>
                  <TaskCalendar />
                </TasksProvider>
              );
            }}
          ></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}
