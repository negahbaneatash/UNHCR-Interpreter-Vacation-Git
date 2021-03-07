import React from "react";
import { Link } from "react-router-dom";

import '../header/header.style.scss'
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { myFireauth } from "../../firebase/firebaseConfig";



const Header =() =>{
    
    
   

    // render(){
        return (
            <div className='header'>
                <Link className='logo-container' to='/'> 
                    <Logo/>
                    <span className='logo-text'>UNHCR Interpreter's Vacation System</span>
                </Link>
                <div className='options'>
                    <Link className='option' onClick={()=>{myFireauth.signOut()}} to='/'>SIGN OUT</Link>                    
                </div>                
            </div>

        )
    }
// }


export default Header;