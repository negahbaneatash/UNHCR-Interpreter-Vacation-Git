import React from 'react'
import {Toast} from 'react-bootstrap'



const InterpreterToast = function(props){
    console.log('from InterpreterToast func')
    return(
    <div className='interpreter-toast'>
        <Toast  show={props.showIt} onClose={props.onExit}>
            <Toast.Header>
                This is Interpreter Toast
            </Toast.Header>
            <Toast.Body>
                this is body
                <input type='text' onChange={props.onVorod}/>
            </Toast.Body>
        </Toast>                        

    </div>

)}

export default InterpreterToast;