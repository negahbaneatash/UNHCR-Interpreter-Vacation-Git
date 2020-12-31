import React from 'react'
import './interpreterCardContainer.style.css'
import InterpreterCard from '../interpreter-card/interpreterCard.compo'




function InterpreterCardContainer(props) {    
    return(
    <div className='interpreter-card-container'>
        {props.theState.interpreters.filter((intp)=>{return(intp.name.toLowerCase().includes(props.searchField.toLowerCase()))}).map((intp)=><InterpreterCard theUser={props.theState.theUser} interpreter={intp}/>)}

    </div>
)}

export default InterpreterCardContainer;