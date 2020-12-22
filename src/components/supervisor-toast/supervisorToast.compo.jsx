import React from 'react'
import {Toast} from 'react-bootstrap'



const SupervisorToast = function(props){
    return(
    <div className='supervisor-toast'>
        <Toast  show={props.showIt} onClose={props.onExit}>
            <Toast.Header>
                This is Supervisor Toast
            </Toast.Header>
            <Toast.Body>
                this is body
                {/* <input type='text' onChange={this.handleChange}/> */}
            </Toast.Body>
        </Toast>                        

    </div>

)}

export default SupervisorToast;