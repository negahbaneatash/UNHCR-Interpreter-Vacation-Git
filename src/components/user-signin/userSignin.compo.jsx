import { React, Component } from "react";
import firebase from "firebase/app";
import PhoneSignin from "../phone-signin/phoneSignin.compo";





class UserSignin extends Component {
    constructor(){
        super()
        this.state={
            message:'please login via your Gmail or your Phone',
            msgColor:'red'
        }
    }
    
    componentDidMount(){
        console.log('from UserSignin componentDidMount')
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
        return(
            <div>
                <h3 style={{color:this.state.msgColor}}>{this.state.message}</h3>
                <button onClick={this.handleClick}>Sign In With Google</button>
                <PhoneSignin/>
            </div>        
    )}
}



export default UserSignin;