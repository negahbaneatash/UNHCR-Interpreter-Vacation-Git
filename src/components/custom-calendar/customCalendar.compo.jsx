import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';





class CustomCalendar extends React.Component{
   

    
    render(){
        console.log('from customCalendar')
        return (
            <div>
                <Calendar  onClickDay={this.props.clickDay}/>
                
            </div>
        )
    }
    
    
}


export default CustomCalendar;