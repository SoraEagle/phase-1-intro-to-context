/*
    Employees always check in and out on the hour
    Timestamps provided as Strings "YYYY-MM-DD HHMM"
    Employees will never work across days

Bonus Challenges:
    Raise an exception if a timeIn is without a matching timeOut
    Figure out how to turn a timestamp into a construct that allows handling cross-day times and
        end times that aren't on the hour
    Raising errors if timestamp is in invalid format*/
/*
Function Signatures:
    calculatePayroll:
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

function createEmployeeRecords(arrays){ //Array of Arrays.
    return arrays.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(employee, time){ //
    let timeInStamp = {
        type: "TimeIn",
        hour: parseInt(time.substr(11, 4)), //Ensure the hour variable is a number.
        date: time.substr(0, 10)
    };

    employee.timeInEvents.push(timeInStamp); //Put timeInStamp into timeInEvents Array.
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
    let eligibleDates = employee.timeInEvents.map(element => element.date); //.map the test dates
    let total = 0;
    let wagesOwed = eligibleDates.reduce((previousValue, currentValue) => {
        return previousValue + wagesEarnedOnDate(employee, currentValue);
    }, 0);

    return wagesOwed;
}

function calculatePayroll(array){
    //Array OF employee records
    let employees = array.map(employee => ({
        firstName: employee.firstName, 
        familyName: employee.familyName,
        title: employee.title,
        payPerHour: employee.payPerHour
    }));
    console.log(employees);
    
    //for (const wages of employees)Loop?
    //Calculate employee's total wages using allWagesFor
    //allWagesFor(employee)
    //use .reduce to find total wages for all employees(payroll)
    //return 
    
    //return payroll

    //Using wagesEarnedOnDate, accumulate value of all dates worked by employee in record used as context
    //return sum of pay owed to ALL employees on all dates, as single sum
    //use .reduce to create this sum
    // let payroll = .reduce({
        //
    //}, 0);
    //return parseInt(payroll);
}