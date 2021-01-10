import React from 'react'
import '../interpreter-card/interpreterCard.style.css'
import { withRouter } from "react-router-dom";




class InterpreterCard extends React.Component {

    componentDidMount(){
        console.log('from InterpreterCard componentDidMount')
    }
    handleClick=()=>{
        const {interpreter,theUser} = this.props;
        this.props.setTheInterpreter(interpreter);
        console.log('from handlclick')
        if (interpreter.email===theUser.email) {
            this.props.history.push(`/interpreter/submitleave`)
        } else {            
            this.props.history.push('/interpreter/signin')
        }
    }
    render(){                  
        console.log('from InterpreterCard render') 
        return(   
            <div className='interpreter-card' onClick={this.handleClick} >
                <h4>{this.props.interpreter.name}</h4>
                <span>{this.props.interpreter.email}</span>
            </div>
        )
    }
    
}



export default withRouter(InterpreterCard);


