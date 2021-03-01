class Leave {
    constructor(date,type=leaveType.Annual_leave,theInterpreter){
        this.leaveId=Math.floor((Math.random()*100000)).toString();
        this.leaveDate=date;
        this.leaveType=type;        
        this.submittedOn=new Date();
        this.leaveStatus=leaveStatus.submitted;
        this.supervisorNote='';        
        this.leaveOwner=theInterpreter.name;
        this.leaveOwnerEmail=theInterpreter.email;
        this.leaveYearMonth = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString();
    }    
}

export const leaveType = {Annual_leave:'ANNUAL_LEAVE',Unpaid_Leave:'UNPAID_LEAVE'}
export const leaveStatus = {submitted:'SUBMITTED', approved: 'APPROVED', rejected: 'REJECTED'}

export default Leave;