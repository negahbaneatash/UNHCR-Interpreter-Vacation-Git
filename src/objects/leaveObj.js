
class Leave {
    constructor(date,type=Leave.leaveType.Annual_leave,theInterpreter){
        this.leaveId=Math.floor((Math.random()*100000)).toString();
        this.leaveDate=date;
        this.leaveDateString=date.toDateString();
        this.leaveYearString=date.getFullYear().toString();
        this.leaveDayOfMonthString=date.getDate().toString();
        this.leaveDayOfWeekString=Leave.getDayOfWeekName(date);
        this.leaveMonthString=this.constructor.getMonthOfYearName(date);
        this.leaveType=type;        
        this.leaveSubmittedOn=(new Date()).toDateString();
        this.leaveStatus=Leave.leaveStatus.submitted;
        this.leaveSupervisorNote='';        
        this.leaveOwnerName=theInterpreter.name;
        this.leaveOwnerEmail=theInterpreter.email;
        this.leaveOwnerGroup=theInterpreter.group;
        this.leaveYearMonth = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString();
        
    }    
    static getMonthOfYearName = (date)=>{
        const monthsOfYear=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthsOfYear[date.getMonth()]
    }
    static getDayOfWeekName =(date)=>{
        const daysOfWeek=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return daysOfWeek[date.getDay()]
    }
    static leaveType = {Annual_leave:'ANNUAL_LEAVE',Unpaid_Leave:'UNPAID_LEAVE'}
    static leaveStatus = {submitted:'SUBMITTED', approved: 'APPROVED', rejected: 'REJECTED'}
}


export default Leave;