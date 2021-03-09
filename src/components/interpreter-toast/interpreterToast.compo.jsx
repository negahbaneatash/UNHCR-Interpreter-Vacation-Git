import React from 'react'
import {Toast} from 'react-bootstrap'

import './interpreterToast.style.css'

const InterpreterToast = function(props){
    console.log('from InterpreterToast func')
    return(
    <div className='interpreter-toast-container'>
        <Toast className='interpreter-toast'  show={props.showIt} onClose={props.onExit}>
            <Toast.Header className='interpreter-toast-header'>
                This is an Interpreter
            </Toast.Header>
            <Toast.Body className='interpreter-toast-body'>
                <h6>Please search your name here</h6>
                <input type='text' ref={(item)=>{if (item) {item.focus()}}} onChange={props.onWriteInput}/>
            </Toast.Body>
        </Toast>                        

    </div>

)}

export default InterpreterToast;