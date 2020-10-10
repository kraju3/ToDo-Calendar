import React from 'react'
import {sortByToday} from '../../helpers/TaskHelpers'


export default function TaskStatistic(props){

    return(
        <div className="ui three statistics">
        <div className="yellow statistic">
          <div className="value">{props.pending.length}</div>
          <div className="label">Pending Total</div>
        </div>
        <div className="red statistic">
          <div className="value">{sortByToday(props.pending).length}</div>
          <div className="label">Pending Today</div>
        </div>
        <div className="green statistic">
          <div className="value">{props.finished.length}</div>
          <div className="label">Completed Today</div>
        </div>
      </div>
    )
}