import React from 'react'
import '../supervisor-card/supervisorCard.style.css'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setTheInterpreterToStore_Action, setTheSupervisorToStore_Action } from '../../redux/redux.actions';


class SupervisorCard extends React.Component {

    componentDidMount(){
        this.props.setTheInterpreterToStore(null)        
        console.log('0000000from SupervisorCard componentDidMount this.props',this.props)        
    }

    handleClick=()=>{        
        const {supervisor,theUser} = this.props;        //supervisor is from the card and theUser is from Store
        this.props.setTheSupervisorToStore(supervisor);  
        // console.log('from supervisorCard handlclick theSupervisor from store',this.props.theSupervisor)
        if (!(supervisor&&theUser)) {
            this.props.history.push('/user/signin')
        } else if (supervisor.email===theUser.email) {
            this.props.history.push(`/supervisor/main-stage`)
        } else {            
            this.props.history.push('/user/signin')
        }
    }

    render(){                  
        console.log('from SupervisorCard render this.props',this.props) 
        return(   
            <div className='supervisor-card' onClick={this.handleClick} >
                <h4>{this.props.supervisor.name}</h4>
                <span>{this.props.supervisor.email}</span>
            </div>
        )
    }
    
}


const mapStateToProps=(state)=>({
    theUser:state.User.theUser,
    theSupervisor:state.Supervisor.theSupervisor
})

function mapDispatchToProps(dispatch){
    return{
        setTheSupervisorToStore: supervisor=>{dispatch(setTheSupervisorToStore_Action(supervisor))},
        setTheInterpreterToStore: interpreter=>{dispatch(setTheInterpreterToStore_Action(interpreter))}
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SupervisorCard));


