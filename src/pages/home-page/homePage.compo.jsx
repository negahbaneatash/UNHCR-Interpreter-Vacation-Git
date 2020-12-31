import { React } from "react";
import LoginTools from "../../components/login-tools/loginTools.compo";


const HomePage = (props)=>{    
    return <LoginTools theState={props.theState}/>
}

export default HomePage;