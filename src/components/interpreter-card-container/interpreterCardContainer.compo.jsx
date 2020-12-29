import React from 'react'
import './interpreterCardContainer.style.css'
import InterpreterCard from '../interpreter-card/interpreterCard.compo'




function InterpreterCardContainer(props) {
    console.log('from intp container',props)
    return(
    <div className='interpreter-card-container'>
        {props.interpreters.filter((intp)=>{return(intp.name.toLowerCase().includes(props.searchField.toLowerCase()))}).map((intp)=><InterpreterCard interpreter={intp}/>)}

    </div>
)}

export default InterpreterCardContainer;