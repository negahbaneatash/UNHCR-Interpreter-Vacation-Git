import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../custom-calendar/customCalendar.style.scss';





class CustomCalendar extends React.Component{
   
    componentDidMount(){
        console.log('from customCalendar componentDidMount')
    }
    
    render(){
        console.log('from customCalendar render')
        return (
            <div className='calendar-container'>
                <Calendar onClickDay={this.props.clickDay} onActiveStartDateChange={this.props.viewChanged} onChange={this.props.clickMonth} 
                minDetail="year" maxDetail={this.props.showIn} showNeighboringMonth={false}/>                
            </div>
        )
    }
    
    
}


export default CustomCalendar;