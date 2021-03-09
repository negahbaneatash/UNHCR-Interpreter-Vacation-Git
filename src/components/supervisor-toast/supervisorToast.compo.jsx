import React from 'react'
import {Toast} from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import './supervisorToast.style.css';

/// maybe I can change it to stateless hooks to use ref for focusing on the input
const SupervisorToast = function(props){
    console.log('from SupervisorToast func')
    return(
    <div className='supervisor-toast-container'>
        <Toast  className='supervisor-toast' show={props.showIt} onClose={props.onExit}>
            <Toast.Header className='supervisor-toast-header'>
                This is the supervisor
            </Toast.Header>
            <Toast.Body className='supervisor-toast-body'>
                <h6> Please search your name here </h6>
                {/* <button onClick={()=>{props.history.push('/supervisor/addinterpreter')}}>Add an Interpreter</button> */}                
                <input type='text' ref={(item)=>{if (item) {item.focus()}}} onChange={props.onWriteInput}/>
            </Toast.Body>
        </Toast>                        

    </div>

)}

export default withRouter(SupervisorToast);