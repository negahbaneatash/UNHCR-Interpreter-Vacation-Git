import { React, Component } from "react";
import firebase from "firebase/app";
import PhoneSignin from "../phone-signin/phoneSignin.compo";
import {Container,Jumbotron} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './userSignin.style.css'



class UserSignin extends Component {
    constructor(){
        super()
        this.state={
            message:'please login via your Gmail or your Phone',
            msgColor:'red',
            isShowing:false,
            loginType:'',

        }
    }
    
    componentDidMount(){
        console.log('from UserSignin componentDidMount')
    }

    toggleShow=()=>{
        this.setState({...this.state, isShowing:!this.state.isShowing})                   
    }
    
    handleClick=()=>{        
        this.setState({...this.state,message:'Redirecting to google signin ...',msgColor:'purple'})
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult().then((result)=>{
            this.setState({...this.state,message:'login successful, Please wait, you are redirecting to your leave submission page',msgColor:'green'})
            console.log('from inside signin handleclick',result.user)
        })
    }
    
   

    render(){
        console.log('from UserSignin render')
        const {isShowing,loginType}=this.state
        return(
            
            <div>
                <Container>
                <h3 style={{color:this.state.msgColor}}>{this.state.message}</h3>
                    <Jumbotron>
                        <div className= 'button-container'>               
                            {(!isShowing) && <Button className='btn-google-login' onClick={()=>{this.setState({...this.state, loginType:'googleLogin'}, ()=>{this.toggleShow()});  }}>google login</Button>}                            
                            {(!isShowing) && <Button className='btn-phone-login' onClick={()=>{this.setState({...this.state, loginType:'phoneLogin'}, ()=>{this.toggleShow()});  }}>phone login</Button>}                            
                        </div>
                        
                        {(isShowing) && <h3>{loginType}</h3>}
                        {(isShowing) && <button onClick={()=>{this.setState({...this.state, loginType:''}, ()=>{this.toggleShow()});  }}>Back</button>}

                    </Jumbotron>
                    {loginType==='googleLogin'?<button onClick={this.handleClick}>Sign In With Google</button>:null}                  
                    {loginType==='phoneLogin'?<PhoneSignin/>:null}                  
                </Container>
                
                
            </div>        
    )}
}



export default UserSignin;