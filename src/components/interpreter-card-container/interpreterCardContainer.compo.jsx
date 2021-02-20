import React from 'react'
import { connect } from 'react-redux'

import './interpreterCardContainer.style.css'
import InterpreterCard from '../interpreter-card/interpreterCard.compo'
import SupervisorCard from "../supervisor-card/supervisorCard.compo";





function InterpreterCardContainer(props) {    
    console.log('from InterpreterCardContainer func',props)
    
    return(
    <div className='interpreter-card-container'>
        {
        props.userType==='interpreter'
        ? props.allInterpreters.filter((intp)=>{return(intp.name.toLowerCase().includes(props.searchField.toLowerCase()))}).map((intp)=><InterpreterCard key={intp.email} interpreter={intp}/>)
        : props.allSupervisors.filter((supvsr)=>{return(supvsr.name.toLowerCase().includes(props.searchField.toLowerCase()))}).map((supvsr)=><SupervisorCard key={supvsr.email} supervisor={supvsr}/>)
        }

    </div>
)}


const mapStateToProps = (state)=>({
    allInterpreters:state.Interpreters.allInterpreters,
    allSupervisors:state.Supervisors.allSupervisors
})


export default connect(mapStateToProps)(InterpreterCardContainer);