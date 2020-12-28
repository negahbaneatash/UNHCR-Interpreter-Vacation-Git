import React from 'react'
import '../interpreter-card/interpreterCard.style.css'
import { withRouter } from "react-router-dom";




class InterpreterCard extends React.Component {

    // handleClick(){
    //     if (condition) {
            
    //     }
    // }

    render(){
        const interpreterId = this.props.interpreter.id;
        console.log('from intpCard', this.props)
        return(    
            <div className='interpreter-card' onClick={()=>{this.props.history.push(`/interpreter/signin/${interpreterId}`)}} >
                <h3>{this.props.interpreter.name}</h3>
                <span>{this.props.interpreter.id}</span>
            </div>
        )
    }
    
}



export default withRouter(InterpreterCard);


