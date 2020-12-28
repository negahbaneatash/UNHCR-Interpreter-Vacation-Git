import React from 'react'
import {Toast} from 'react-bootstrap'

import { withRouter } from "react-router-dom";


const SupervisorToast = function(props){
    return(
    <div className='supervisor-toast'>
        <Toast  show={props.showIt} onClose={props.onExit}>
            <Toast.Header>
                This is Supervisor Toast
            </Toast.Header>
            <Toast.Body>
                <span> This is Kausar </span>
                <button onClick={()=>{props.history.push('/supervisor/addinterpreter')}}>Add an Interpreter</button>
                
                {/* <input type='text' onChange={this.handleChange}/> */}
            </Toast.Body>
        </Toast>                        

    </div>

)}

export default withRouter(SupervisorToast);