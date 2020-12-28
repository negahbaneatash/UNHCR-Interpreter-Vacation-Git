import React from 'react'
import {Container,Jumbotron} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import '../login-tools/loginTools.style.css'

import InterpreterToast from '../interpreter-toast/interpreterToast.compo'
import SupervisorToast from '../supervisor-toast/supervisorToast.compo'
import InterpreterCardContainer from '../interpreter-card-container/interpreterCardContainer.compo'
import CustomCalendar from '../custom-calendar/customCalendar.compo'
import { getAllInterpreters } from '../../firebase/dataBaseFunctions'


class LoginTools extends React.Component{
    constructor(){
        super()
        this.state = {
            interpreters: [
                {id:"1Per50Abou", name: 'Abouzar', gmail: 'abouzar.azarpira@gmail.com', Group: 'Persian', AL1:'', AL2:''},
                {id:"2Urd32Sami", name: 'Abdol Sami upd', gmail:'sami@gmail.com', Group: 'Urdu', AL1:{submitted:true,approved:false,rejected:false}, AL2:''},
                {id:3, name: 'Salim', gmail:'salim@gmail.com', Group: 'Rohingya', AL1:'', AL2:''},
                {id:4, name: 'Joseph', Group: 'Myanmar', AL1:'', AL2:''},
                {id:5, name: 'Afra', Group: 'Tamil', AL1:'', AL2:''},
                {id:6, name: 'Sabreen', Group: 'Arabic', AL1:'', AL2:''},
                {id:7, name: 'Mahmud', Group: 'Somali', AL1:'', AL2:''},
                {id:"8Per54Amo", name: 'Amo Abouz', gmail: 'negahbaneatash@gmail.com', Group: 'Iran', AL1:'', AL2:''},                        
            ],
            isShowing: false,
            searchField:'',
            isSupervisor: true,
            showCalendar:false,
        }    
    }
    
    componentDidMount(){
        getAllInterpreters()
    }

    toggleShow=()=>{
        this.setState({...this.state, isShowing:!this.state.isShowing}, ()=>{console.log('from toggleshow', this.state.isShowing)})        
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
        const {isShowing,showCalendar}=this.state;
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
                    {this.state.isSupervisor ? null : <InterpreterCardContainer state={this.state} handleClick={this.handleClickCard}/>}
                    {showCalendar ? <CustomCalendar/> : null}
                </Container>                
            </div>
        )
    }
}

export default LoginTools;


