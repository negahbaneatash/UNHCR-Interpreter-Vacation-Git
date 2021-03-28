import React from "react";
import  ReactLoading  from "react-loading";
import './customLoadingIcon.style.css'

class CustomLoadingIcon extends React.Component{



    render(){
        return(
            <div className={`react-loading-container ${this.props.cliClassName}`}>
                <ReactLoading type={this.props.iconType} color={this.props.iconColor}  height={50} width={50} />
            </div>
            
        )
    }
}
// delay={this.props.loaderSpeed} height={this.props.loaderHeight} width={this.props.loaderWidth} color='#800080'
export default CustomLoadingIcon;