import React from 'react'
import {Container,Jumbotron} from 'react-bootstrap'



import '../login-tools/loginTools.style.css'


import IndividualCardContainer from '../individual-card-container/individualCardContainer.compo'
import { getAllInterpretersFromDB, getAllSupervisorsFromDB } from '../../firebase/dataBaseFunctions'
import TestCard from "../test-component/testCard.compo";
import UserTypeButton from '../user-type-button/userTypeButton.compo'
import { SearchCard } from '../search-card/searchCard.compo'
import { store } from '../../redux/store'
import { Login_Status } from '../../redux/waiting.reducer'


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
        // store.dispatch({type:'PLEASE_WAIT',payload:false})
        store.dispatch({type:Login_Status.signinInitialState})
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
                // <SupervisorToast showIt={this.state.isShowing} onWriteInput={this.handleChange} onExit={()=>{this.setState({...this.state,isShowing:!this.state.isShowing},()=>{this.setState({...this.state,userType:''})})}}/>
                <SearchCard onWriteInput={this.handleChange} onExit={this.handleSearchExit}>Supervisor</SearchCard>
            )
        else if (this.state.userType==='interpreter') 
            return(                 
                <SearchCard onWriteInput={this.handleChange} onExit={this.handleSearchExit}>Interpreter</SearchCard>
            )
        else return null            
    }

    showContent(){
        switch (this.state.userType) {
            case 'supervisor':
                return(
                    <div>
                        <IndividualCardContainer searchField={this.state.searchField} userType={this.state.userType}/>
                        <TestCard/>
                    </div>
                    
                )                
            case 'interpreter':
                return(
                    <IndividualCardContainer searchField={this.state.searchField} userType={this.state.userType}/>
                )
            default:
                return(
                    null
                )
        }
    }

    handleOnInterpreterClick=()=>{
        this.setState({...this.state, userType:'interpreter'}, ()=>{this.toggleShow()})
    }

    handleOnSupervisorClick=()=>{
        this.setState({...this.state, userType:'supervisor'}, ()=>{this.toggleShow()})
    }

    handleSearchExit=()=>{
        this.setState({...this.state,isShowing:!this.state.isShowing},()=>{this.setState({...this.state,userType:'',searchField:''})})
    }

    render(){        
        console.log('from loginTool render')
        const {isShowing}=this.state;        
        return (
            <div>       
                <Container>
                    <Jumbotron className='jumbotron'>
                        <h6 className='welcome-text'>Welcome to the UNHCR Interpreters Vacation System</h6>
                        <div className= 'buttons-container'>               
                            {/* {(!isShowing) && <Button className='btn-intp-lgn' onClick={()=>{this.setState({...this.state, userType:'interpreter'}, ()=>{this.toggleShow()});  }}>I am an Interpreter</Button>}                             */}
                            {(!isShowing) && <UserTypeButton onButtonClick={this.handleOnInterpreterClick} userType={this.state.userType}>Interpreter</UserTypeButton> }                            
                            {(!isShowing) && <UserTypeButton onButtonClick={this.handleOnSupervisorClick} userType={this.state.userType}>Supervisor</UserTypeButton> }
                            {/* {(!isShowing) && <Button className='btn-spvsr-lgn' onClick={()=>{this.setState({...this.state, userType:'supervisor'}, ()=>{this.toggleShow()});  }}>I am the Supervisor</Button>}                             */}
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


