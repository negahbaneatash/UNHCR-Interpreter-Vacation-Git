import React from 'react'
import '../interpreter-card/interpreterCard.style.css'
import { withRouter } from "react-router-dom";




class InterpreterCard extends React.Component {

   
    render(){          
        const interpreter= this.props    
        return(   
            <div className='interpreter-card' onClick={()=>{this.props.history.push({pathname:'/interpreter/signin',interpreter})}} >
                <h4>{this.props.interpreter.name}</h4>
                <span>{this.props.interpreter.email}</span>
            </div>
        )
    }
    
}



export default withRouter(InterpreterCard);


