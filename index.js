// Your code here
/*
Employees always check in and out on the hour.
Time is represented on a 24-hour clock (1300 is 1 PM).
Timestamps will be provided as Strings in the form "YYYY-MM-DD HHMM".
Employees will never work across days

Bonus Challenges:
Raise an exception if a timeIn is without a matching timeOut.
Figure out how to turn a timestamp into a construct that allows handling cross-day times and
    end times that aren't on the hour.
Raising errors if timestamp is in invalid format.*/
/*
Function Signatures:
    wagesEarnedOnDate
        Behavior:
            Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.

    allWagesFor
        Returns:
            Pay owed for all dates
        Behavior:
            Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow...
    
    calculatePayroll
        Argument:
            Array of employee records
        Returns:
            Sum of pay owed to all employees for all dates, as a number
        Behavior:
            Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
*/

/*
Time Complexity:

*/
function createEmployeeRecord(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    
    return employee;
}

function createEmployeeRecords(arrays){
    return arrays.map(element => createEmployeeRecord(element));
}

//YYYY-MM-DD     H  H  M  M
//0123456789 10 11 12 13 14
function createTimeInEvent(employee, time){
    let timeInStamp = {
        type: "TimeIn",
        hour: parseInt(time.substr(11, 4)),
        date: time.substr(0, 10)
    };

    employee.timeInEvents.push(timeInStamp);
    return employee;
}

function createTimeOutEvent(employee, time){
    let timeOutStamp = {
        type: "TimeOut",
        hour: parseInt(time.substr(11, 4)),
        date: time.substr(0, 10)
    };
    employee.timeOutEvents.push(timeOutStamp);
    return employee;
}

function hoursWorkedOnDate(employee, time){
    //ensure timeInEvents and timeOutEvents are on same date
    let inTime = employee.timeInEvents.find((emp) => {
        return emp.date === time;        
    });
    let outTime = employee.timeOutEvents.find((emp) => {
        return emp.date === time;       
    });
    let hoursWorked = Math.round(Math.abs((outTime.hour - inTime.hour) / 100)); //Dividing removes "MM"from"HHMM".
    return hoursWorked;
}

function wagesEarnedOnDate(employee, time){
    //
    //return payOwed;
}

function allWagesFor(employee){
    //
}

function calculatePayroll(){
    //return //pay owed to all employees on all dates, as a single sum
    //use .reduce to create this sum
}