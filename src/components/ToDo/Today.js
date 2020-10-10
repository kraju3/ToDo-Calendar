import React from 'react';


export default function Today (){
    
    return(
        <>
        <h2 className="ui block center aligned icon header">
          Today<i className="calendar outline icon"></i>{" "}
          {`${
            new Date().getMonth() + 1
          }/${new Date().getDay()}/${new Date().getFullYear()}`}
        </h2>
        </>
    )
}
    