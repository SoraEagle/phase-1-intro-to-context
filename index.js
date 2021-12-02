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
    allWagesFor:
    calculatePayroll:
        Argument:
            Array of employee records
        Returns:
            Sum of pay owed to all employees for all dates, as number
        Behavior:
            Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as number*/
/*
Current Time Complexity:
    createEmployeeRecord:
        O(n)
    createEmployeeRecords:
        O(n)
    createTimeInEvent:
        O()
    createTimeOutEvent:
        O()
    hoursWorkedOnDate:
        O()
    wagesEarnedOnDate:
        O()
    allWagesFor:
        O()
    calculatePayroll:
        O()
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
        hour: parseInt(time.substr(11, 4)), //Ensure the hour variable is a number.
        date: time.substr(0, 10)
    };

    employee.timeInEvents.push(timeInStamp);
    return employee;
}

function createTimeOutEvent(employee, time){
    let timeOutStamp = {
        type: "TimeOut",
        hour: parseInt(time.substr(11, 4)), //Ensure hour variable is a number.
        date: time.substr(0, 10)
    };
    employee.timeOutEvents.push(timeOutStamp);
    return employee;
}

function hoursWorkedOnDate(employee, time){
    let inTime = employee.timeInEvents.find((emp) => {
        return emp.date === time;        
    });
    let outTime = employee.timeOutEvents.find((emp) => {
        return emp.date === time;       
    });
    let hoursWorked = Math.round(Math.abs((outTime.hour - inTime.hour) / 100)); //Dividing removes the minutes.
    return hoursWorked;
}

function wagesEarnedOnDate(employee, time){
    let payOwed = hoursWorkedOnDate(employee, time) * employee.payPerHour;
    return parseInt(payOwed); //Amount returned as number.
}

function allWagesFor(employee){
    //Using wagesEarnedOnDate, accumulate value of all dates worked by SINGLE employee in record used as context
    let eligibleDates = employee.timeInEvents.map(element => element.date);
    console.log(eligibleDates);
    // wagesEarnedOnDate(employee, eligibleDates[i]); //Need to do dynamically, using .reduce
    let total = 0;
    let wagesOwed = eligibleDates.reduce((previousValue, currentValue) => {
        previousValue + currentValue;
    });

    return wagesOwed;
}

function calculatePayroll(array){
    //let  = array.map(element => ) //.map allWagesFor
    //return sum of pay owed to all employees on all dates, as single sum
    //use .reduce to create this sum
    // let payroll = .reduce();
    //return parseInt(payOwed);
}