import React from 'react';
import {ACTIONS} from '../../helpers/TaskHelpers'

export default function ToDoButton(props){

    return(
        <>
         <button
          onClick={(e) => {
            e.preventDefault();
            props.dispatch({ type: ACTIONS.DISPLAY_FORM });
          }}
          className=" circular ui negative button"
          type="submit"
        >
          <i className="plus icon"></i>ToDo
        </button>
        </>
    )
}