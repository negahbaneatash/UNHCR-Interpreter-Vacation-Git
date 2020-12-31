import React from 'react'
import {Container,Jumbotron} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import '../login-tools/loginTools.style.css'

import InterpreterToast from '../interpreter-toast/interpreterToast.compo'
import SupervisorToast from '../supervisor-toast/supervisorToast.compo'
import InterpreterCardContainer from '../interpreter-card-container/interpreterCardContainer.compo'
import { getAllInterpreters } from '../../firebase/dataBaseFunctions'


class LoginTools extends React.Component{
    constructor(props){
        super(props)
        this.state = {            
            isShowing: false,
            searchField:'',
            isSupervisor: true,            
        }    
    }
    
    toggleShow=()=>{
        this.setState({...this.state, isShowing:!this.state.isShowing})        
    }

    handleChange=(event)=>{
        const textInput = event.target.value;
        this.setState({...this.state, searchField:textInput}, ()=>{console.log(textInput)})    
    }

    whoIsThis(IntpOrSpvsr){
        switch (IntpOrSpvsr) {
            case 'supervisor':
                this.setState({...this.state, isSupervisor:true})
                
                break;
        
            default:
                this.setState({...this.state, isSupervisor:false})
                break;
        }
        console.log(this.state.isSupervisor)
    }

    showToast(){
        if (this.state.isSupervisor)
        return (
            <SupervisorToast showIt={this.state.isShowing} onExit={this.toggleShow}/>
        )
        else return <InterpreterToast showIt={this.state.isShowing} onVorod={this.handleChange} onExit={this.toggleShow  }/>      
    }

    render(){        
        const {isShowing}=this.state;
        return (
            <div className="interpreter-login">       
                <Container>
                    <Jumbotron className='jumbotron'>
                        <div className= 'button-container'>               
                            {(!isShowing) && <Button className='btn-intp-lgn' onClick={()=>{this.setState({...this.state, isSupervisor:false}, ()=>{this.toggleShow()});  }}>I am an Interpreter</Button>}
                            {(!isShowing) && <Button className='btn-spvsr-lgn' onClick={()=>{this.setState({...this.state, isSupervisor:true}, ()=>{this.toggleShow()});  }}>I am the Supervisor</Button>}
                        </div>                     
                        {this.showToast()}               
                    </Jumbotron>                    
                    {this.state.isSupervisor ? null : <InterpreterCardContainer searchField={this.state.searchField} theState={this.props.theState} />}                    
                </Container>                
            </div>
        )
    }
}

export default LoginTools;


