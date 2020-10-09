import React from "react";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  return (
    <div className="ui tabular menu">
      <Link to="/">
        <h5 className="ui center aligned icon header item">
          <i className="circular calendar plus outline icon"></i>
          ToDo
        </h5>
      </Link>

      <Link className="item" to="/calendar">
        Calendar
      </Link>

      <div className="right menu">
        <Link className="item" to="/logout">
          Logout
        </Link>
      </div>
    </div>
  );
}
