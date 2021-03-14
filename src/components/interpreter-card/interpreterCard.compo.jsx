import React from 'react'
import '../interpreter-card/interpreterCard.style.scss'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setTheInterpreterToStore_Action, setTheSupervisorToStore_Action } from '../../redux/redux.actions';


class InterpreterCard extends React.Component {

    componentDidMount(){
        
        console.log('0000000from InterpreterCard componentDidMount this.props',this.props)

    }

    handleClick=()=>{        
        const {interpreter,theUser} = this.props;        //interpreter is from the card and theUser is from Store
        this.props.setTheInterpreterToStore(interpreter);  
        console.log('from handlclick')
        if (!(interpreter&&theUser)) {
            this.props.history.push('/user/signin')
        } else if (interpreter.email===theUser.email) {
            this.props.history.push(`/interpreter/submitleave`)
        } else {            
            this.props.history.push('/user/signin')
        }
    }

    render(){                  
        console.log('from InterpreterCard render this.props',this.props) 
        return(   
            <div className='interpreter-card' onClick={this.handleClick} >
                <h4 className='interpreter-name'>{this.props.interpreter.name}</h4>
                <span className='interpreter-group'>{this.props.interpreter.group}</span>
            </div>

            //new design
           
        )
    }
    
}


const mapStateToProps=(state)=>({
    theUser:state.User.theUser
})

function mapDispatchToProps(dispatch){
    return{
        setTheInterpreterToStore: interpreter=>{dispatch(setTheInterpreterToStore_Action(interpreter))},
        setTheSupervisorToStore: supervisor=>{dispatch(setTheSupervisorToStore_Action(supervisor))}
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InterpreterCard));


