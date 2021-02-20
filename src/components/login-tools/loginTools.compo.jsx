import React from 'react'
import {Container,Jumbotron} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import '../login-tools/loginTools.style.css'

import InterpreterToast from '../interpreter-toast/interpreterToast.compo'
import SupervisorToast from '../supervisor-toast/supervisorToast.compo'
import InterpreterCardContainer from '../interpreter-card-container/interpreterCardContainer.compo'
import { getAllInterpretersFromDB, getAllSupervisorsFromDB } from '../../firebase/dataBaseFunctions'



class LoginTools extends React.Component{
    constructor(props){
        super(props)
        this.state = {            
            isShowing: false,
            searchField:'',            
            userType: ''
        }    
    }
    async componentDidMount(){
        console.log('from loginTool componentDidMount')        
        await getAllInterpretersFromDB()        
        await getAllSupervisorsFromDB()                
    }
    toggleShow=()=>{
        this.setState({...this.state, isShowing:!this.state.isShowing})                   
    }

    handleChange=(event)=>{
        const textInput = event.target.value;
        this.setState({...this.state, searchField:textInput})    
    }

    whichUser(IntpOrSpvsr){
        switch (IntpOrSpvsr) {
            case 'supervisor':
                this.setState({...this.state, userType:'supervisor'})                
                break;        
            case 'interpreter':
                this.setState({...this.state, userType:'interpreter'})
                break;
            default:
                this.setState({...this.state, userType:''})
        }        
    }

    showToast(){
        if (this.state.userType==='supervisor')     
            return (
                <SupervisorToast showIt={this.state.isShowing} onExit={()=>{this.setState({...this.state,isShowing:!this.state.isShowing},()=>{this.setState({...this.state,userType:''})})}}/>
            )
        else if (this.state.userType==='interpreter') 
            return( 
                <InterpreterToast showIt={this.state.isShowing} onWriteInput={this.handleChange} onExit={()=>{this.setState({...this.state,isShowing:!this.state.isShowing},()=>{this.setState({...this.state,userType:''})})}}/>      
            )
        else return null            
    }

    showContent(){
        switch (this.state.userType) {
            case 'supervisor':
                return(
                    <InterpreterCardContainer searchField={this.state.searchField} userType={this.state.userType}/>
                )                
            case 'interpreter':
                return(
                    <InterpreterCardContainer searchField={this.state.searchField} userType={this.state.userType}/>
                )
            default:
                return(
                    null
                )
        }
    }

    render(){        
        console.log('from loginTool render')
        const {isShowing}=this.state;        
        return (
            <div className="interpreter-login">       
                <Container>
                    <Jumbotron className='jumbotron'>
                        <div className= 'button-container'>               
                            {(!isShowing) && <Button className='btn-intp-lgn' onClick={()=>{this.setState({...this.state, userType:'interpreter'}, ()=>{this.toggleShow()});  }}>I am an Interpreter test2</Button>}
                            {(!isShowing) && <Button className='btn-spvsr-lgn' onClick={()=>{this.setState({...this.state, userType:'supervisor'}, ()=>{this.toggleShow()});  }}>I am the Supervisor</Button>}
                        </div>                     
                        {this.showToast()}               
                    </Jumbotron>                    
                    {this.showContent()}                    
                </Container>                
            </div>
        )
    }
}

export default LoginTools;


