import React from 'react'
import '../interpreter-card/interpreterCard.style.css'
import { withRouter } from "react-router-dom";

const InterpreterCard =(props)=>{
    const interpreterId = props.interpreter.id;
    return(    
        <div className='interpreter-card' onClick={()=>{props.history.push(`/interpreter/${interpreterId}`)}} >
            <h3>{props.interpreter.name}</h3>
            <span>{props.interpreter.id}</span>
        </div>
    )
}



export default withRouter(InterpreterCard);


