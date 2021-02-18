import React from 'react'
import {Container,Jumbotron} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import '../login-tools/loginTools.style.css'

import InterpreterToast from '../interpreter-toast/interpreterToast.compo'
import SupervisorToast from '../supervisor-toast/supervisorToast.compo'
import InterpreterCardContainer from '../interpreter-card-container/interpreterCardContainer.compo'



class LoginTools extends React.Component{
    constructor(props){
        super(props)
        this.state = {            
            isShowing: false,
            searchField:'',
            isSupervisor: true,            
        }    
    }
    componentDidMount(){
        console.log('from loginTool componentDidMount')
    }
    toggleShow=()=>{
        this.setState({...this.state, isShowing:!this.state.isShowing})        
    }

    handleChange=(event)=>{
        const textInput = event.target.value;
        this.setState({...this.state, searchField:textInput})    
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
    }

    showToast(){
        if (this.state.isSupervisor)
        return (
            <SupervisorToast showIt={this.state.isShowing} onExit={this.toggleShow}/>
        )
        else return <InterpreterToast showIt={this.state.isShowing} onVorod={this.handleChange} onExit={this.toggleShow  }/>      
    }

    render(){        
        console.log('from loginTool render')
        const {isShowing}=this.state;        
        return (
            <div className="interpreter-login">       
                <Container>
                    <Jumbotron className='jumbotron'>
                        <div className= 'button-container'>               
                            {(!isShowing) && <Button className='btn-intp-lgn' onClick={()=>{this.setState({...this.state, isSupervisor:false}, ()=>{this.toggleShow()});  }}>I am an Interpreter test2</Button>}
                            {(!isShowing) && <Button className='btn-spvsr-lgn' onClick={()=>{this.setState({...this.state, isSupervisor:true}, ()=>{this.toggleShow()});  }}>I am the Supervisor</Button>}
                        </div>                     
                        {this.showToast()}               
                    </Jumbotron>                    
                    {this.state.isSupervisor ? null : <InterpreterCardContainer searchField={this.state.searchField}/>}                    
                </Container>                
            </div>
        )
    }
}

export default LoginTools;


