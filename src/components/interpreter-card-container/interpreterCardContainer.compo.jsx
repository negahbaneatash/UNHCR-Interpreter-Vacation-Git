import React from 'react'
import { connect } from 'react-redux'

import './interpreterCardContainer.style.css'
import InterpreterCard from '../interpreter-card/interpreterCard.compo'





function InterpreterCardContainer(props) {    
    console.log('from InterpreterCardContainer func')
    return(
    <div className='interpreter-card-container'>
        {props.allInterpreters.filter((intp)=>{return(intp.name.toLowerCase().includes(props.searchField.toLowerCase()))}).map((intp)=><InterpreterCard key={intp.email} interpreter={intp}/>)}

    </div>
)}

const mapStateToProps = (state)=>({
    allInterpreters:state.Interpreters.allInterpreters
})

export default connect(mapStateToProps)(InterpreterCardContainer);