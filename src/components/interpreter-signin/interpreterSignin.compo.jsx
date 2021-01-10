import firebase from "firebase/app";

import { React, Component } from "react";



class InterpreterSignin extends Component {
    constructor(props){
        super(props)
        // this.state={interpreterEmail:this.props.history.location.interpreter.email}
    }
    
    componentDidMount(){
        console.log('from interpreterSignin componentDidMount')
    }
    
    handleClick=()=>{
        
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult().then((result)=>{
           console.log('from inside signin handleclick',result.user)
        })
    }
    
   

    render(){
        console.log('from interpreterSignin render')
        return(
            <div>
                <button onClick={this.handleClick}>Sign In With Google</button>
            </div>        
    )}
}



export default InterpreterSignin;