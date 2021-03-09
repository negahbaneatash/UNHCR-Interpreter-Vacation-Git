import React from 'react'
import { connect } from 'react-redux'

import './individualCardContainer.style.css'
import InterpreterCard from '../interpreter-card/interpreterCard.compo'
import SupervisorCard from "../supervisor-card/supervisorCard.compo";
import { setTheInterpreterToStore_Action, setTheSupervisorToStore_Action } from '../../redux/redux.actions';





function IndividualCardContainer(props) {    
    console.log('from IndividualCardContainer func',props)
    if (props.userType==='interpreter') {
        props.setTheSupervisorToStore(null)
    }else if (props.userType==='supervisor') {
        props.setTheInterpreterToStore(null)
    }
    return(
    <div className={props.userType==='interpreter'?'individual-card-container interpreter':'individual-card-container supervisor' }  >
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

const mapDispatchToProps = (dispatch)=>{
    return {
    setTheInterpreterToStore: (intp)=>{dispatch(setTheInterpreterToStore_Action(intp))},
    setTheSupervisorToStore: (supvsr)=>{dispatch(setTheSupervisorToStore_Action(supvsr))}    
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndividualCardContainer);