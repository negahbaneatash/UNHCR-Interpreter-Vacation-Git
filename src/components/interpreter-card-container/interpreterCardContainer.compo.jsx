import React from 'react'
import './interpreterCardContainer.style.css'
import InterpreterCard from '../interpreter-card/interpreterCard.compo'




function InterpreterCardContainer(props) {
    return(
    <div className='interpreter-card-container'>
        {props.state.interpreters.filter((intp)=>{return(intp.name.toLowerCase().includes(props.state.searchField.toLowerCase()))}).map((intp)=><InterpreterCard interpreter={intp} funcClick={props.handleClick}/>)}

    </div>
)}

export default InterpreterCardContainer;