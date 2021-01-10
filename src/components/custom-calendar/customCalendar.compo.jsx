import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';





class CustomCalendar extends React.Component{
   
    componentDidMount(){
        console.log('from customCalendar componentDidMount')
    }
    
    render(){
        console.log('from customCalendar render')
        return (
            <div>
                <Calendar  onClickDay={this.props.clickDay}/>
                
            </div>
        )
    }
    
    
}


export default CustomCalendar;