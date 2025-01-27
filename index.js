/*
Bonus Challenges:
    Raise an exception if a timeIn is without a matching timeOut
    Figure out how to turn a timestamp into a construct that allows handling cross-day times and
        end times that aren't on the hour
    Raising errors if timestamp is in invalid format*/
/*
Current Time Complexity:
    createEmployeeRecord:
        O(1)
    createEmployeeRecords:
        O(n)
    createTimeInEvent:
        O(1)
    createTimeOutEvent:
        O(1)
    hoursWorkedOnDate:
        O()
    wagesEarnedOnDate:
        O()
    allWagesFor:
        O(n)
    calculatePayroll:
        O(n) */
function createEmployeeRecord(array){ //Object that will be used as an argument/parameter for other functions.
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

function createTimeInEvent(employee, time){
    let timeInStamp = {
        type: "TimeIn",
        hour: parseInt(time.substr(11, 4)), //Ensure the hour variable is a number.
        date: time.substr(0, 10)
    };

    employee.timeInEvents.push(timeInStamp); //Put timeInStamp into timeInEvents Array.
    return employee;
}

function createTimeOutEvent(employee, time){ //Create event for employee clocking out.
    let timeOutStamp = {
        type: "TimeOut",
        hour: parseInt(time.substr(11, 4)), //Ensure hour variable is a number.
        date: time.substr(0, 10)
    };
    employee.timeOutEvents.push(timeOutStamp); //push timeOutStamp to employee's "punchcard".
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
    let eligibleDates = employee.timeInEvents.map(element => element.date); //.map the test dates in array.
    let total = 0;
    let wagesOwed = eligibleDates.reduce((previousValue, currentValue) => { //Calculate employee's wages.
        return previousValue + wagesEarnedOnDate(employee, currentValue);
    }, 0);

    return wagesOwed;
}

function calculatePayroll(array){
    let employeeWages = array.map(employee => allWagesFor(employee));
    
    let payroll = employeeWages.reduce((previous, current) => { //Calculate total wages owed to employees.
        return previous + current;
    }, 0);
    return payroll;
}