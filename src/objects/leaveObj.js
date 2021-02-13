class Leave {
    constructor(date,type=leaveType.Annual_leave){
        this.id=Math.floor((Math.random()*100000)).toString();
        this.leaveDate=date;
        this.type=type;        
        this.submittedOn=new Date();
        this.leaveStatus=leaveStatus.submitted;
        this.supervisorNote='';        
    }    
}

export const leaveType = {Annual_leave:'ANNUAL_LEAVE',Unpaid_Leave:'UNPAID_LEAVE'}
export const leaveStatus = {submitted:'SUBMITTED', approved: 'APPROVED', rejected: 'REJECTED'}

export default Leave;