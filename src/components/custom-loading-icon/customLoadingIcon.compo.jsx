import React from "react";
import  ReactLoading  from "react-loading";
import './customLoadingIcon.style.css'

class CustomLoadingIcon extends React.Component{



    render(){
        return(
            <ReactLoading type={this.props.iconType} color={this.props.iconColor}  height={'30%'} width={'20%'} className='loader-icon'/>
        )
    }
}
// delay={this.props.loaderSpeed} height={this.props.loaderHeight} width={this.props.loaderWidth} color='#800080'
export default CustomLoadingIcon;