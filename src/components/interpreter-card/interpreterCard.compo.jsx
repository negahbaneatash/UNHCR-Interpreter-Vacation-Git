import React from 'react'
import '../interpreter-card/interpreterCard.style.css'
import { withRouter } from "react-router-dom";




class InterpreterCard extends React.Component {

    handleClick=()=>{
        const {interpreter,theUser} = this.props;
        console.log('from handlclick',this.props)
        if (interpreter.email===theUser.email) {
            this.props.history.push({pathname:'/interpreter/1',interpreter})
        } else {            
            this.props.history.push({pathname:'/interpreter/signin',interpreter})
        }
    }
    render(){          
        
        // console.log('from intp card',this.props) 
        return(   
            <div className='interpreter-card' onClick={this.handleClick} >
                <h4>{this.props.interpreter.name}</h4>
                <span>{this.props.interpreter.email}</span>
            </div>
        )
    }
    
}



export default withRouter(InterpreterCard);


