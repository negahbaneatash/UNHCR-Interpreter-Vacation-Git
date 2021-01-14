import React from 'react'
import '../interpreter-card/interpreterCard.style.css'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


class InterpreterCard extends React.Component {

    componentDidMount(){
        console.log('0000000from InterpreterCard componentDidMount this.props',this.props)
    }

    handleClick=()=>{        
        const {interpreter,theUser} = this.props;        //interpreter is from the card and theUser is from Store
        this.props.setTheInterpreterToStore(interpreter);  
        console.log('from handlclick')
        if (interpreter.email===theUser.email) {
            this.props.history.push(`/interpreter/submitleave`)
        } else {            
            this.props.history.push('/interpreter/signin')
        }
    }

    render(){                  
        console.log('*******from InterpreterCard render this.props',this.props) 
        return(   
            <div className='interpreter-card' onClick={this.handleClick} >
                <h4>{this.props.interpreter.name}</h4>
                <span>{this.props.interpreter.email}</span>
            </div>
        )
    }
    
}


const mapStateToProps=(state)=>({
    theUser:state.User.theUser
})

function mapDispatchToProps(dispatch){
    return{
        setTheInterpreterToStore: interpreter=>{dispatch({type:"SET_THE_INTERPRETER",payload:interpreter})}
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InterpreterCard));


