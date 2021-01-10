import React from 'react'
import './interpreterCardContainer.style.css'
import InterpreterCard from '../interpreter-card/interpreterCard.compo'




function InterpreterCardContainer(props) {    
    console.log('from InterpreterCardContainer func')
    return(
    <div className='interpreter-card-container'>
        {props.theState.interpreters.filter((intp)=>{return(intp.name.toLowerCase().includes(props.searchField.toLowerCase()))}).map((intp)=><InterpreterCard key={intp.email} theUser={props.theState.theUser} interpreter={intp} setTheInterpreter={props.setTheInterpreter}/>)}

    </div>
)}

export default InterpreterCardContainer;