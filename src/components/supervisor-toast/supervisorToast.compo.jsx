import React from 'react'
import {Toast} from 'react-bootstrap'

import { withRouter } from "react-router-dom";

/// maybe I can change it to stateless hooks to use ref for focusing on the input
const SupervisorToast = function(props){
    console.log('from SupervisorToast func')
    return(
    <div className='supervisor-toast'>
        <Toast  show={props.showIt} onClose={props.onExit}>
            <Toast.Header>
                This is Supervisor Toast
            </Toast.Header>
            <Toast.Body>
                <span> Type your name here </span>
                {/* <button onClick={()=>{props.history.push('/supervisor/addinterpreter')}}>Add an Interpreter</button> */}                
                <input type='text' ref={(item)=>{if (item) {item.focus()}}} onChange={props.onWriteInput}/>
            </Toast.Body>
        </Toast>                        

    </div>

)}

export default withRouter(SupervisorToast);