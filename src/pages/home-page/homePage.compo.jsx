import { React } from "react";
import LoginTools from "../../components/login-tools/loginTools.compo";


const HomePage = (props)=>{    
    console.log('from homepage func')
    return <LoginTools theState={props.theState} setTheInterpreter={props.setTheInterpreter}/>
}

export default HomePage;