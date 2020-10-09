import React, {useEffect, useReducer} from 'react';
import {Route,Switch} from 'react-router-dom';

import Navigation from './components/Navbar';

import ToDo from './components/ToDo/ToDo'

import './App.css';
import TaskCalendar from './components/Calendar/Calendar';

const Tasks = [
  {"taskName":"ICD-9-CM","location":"Huanglin","time":"1:16 AM","description":"Personal","date":"1/6/2020"},
  {"taskName":"PFMEA","location":"Huangdi","time":"11:10 PM","description":"Personal","date":"2/18/2020"},
  {"taskName":"OLEDB","location":"Cambas","time":"6:37 PM","description":"Personal","date":"3/5/2020"},
  {"taskName":"vBlock","location":"Vällingby","time":"1:59 PM","description":"Personal","date":"4/7/2020"},
  {"taskName":"BWA","location":"Frýdlant","time":"7:11 AM","description":"Work","date":"4/30/2020"},
  {"taskName":"iLife","location":"Gangkou","time":"3:18 PM","description":"Work","date":"10/28/2019"},
  {"taskName":"UTRAN","location":"Bell Ville","time":"5:37 PM","description":"Work","date":"3/3/2020"},
  {"taskName":"IT Project &amp; Program Management","location":"Puerto San José","time":"1:11 PM","description":"Work","date":"11/3/2019"},
  {"taskName":"React","location":"Puerto San José","time":"1:11 PM","description":"Work","date":"10/9/2020"}
]


function reducer (state,action) {
  switch(action.type){
    case 'sync':
      return {
        tasks:action.payload.tasks
      }
    default:
      return {
        tasks:state.tasks
      }
  }
}

export default function App(props) {
  
  const [state,dispatch] = useReducer(reducer,{tasks:Tasks})

  useEffect(()=>{
    console.log(state.tasks)
  },[state.tasks])

  return (
        <React.Fragment>

            <Navigation/>
            <div className="ui segment">
              <Switch>
                <Route exact path="/" render={(props)=>{return <ToDo {...props} dispatch={dispatch} tasks={state.tasks}/>}}></Route>
                <Route exact path="/calendar" render={(props)=>{return <TaskCalendar {...props} dispatch={dispatch}  tasks={state.tasks}/>}}></Route>
              </Switch>
            </div>


        </React.Fragment>
  );
}


