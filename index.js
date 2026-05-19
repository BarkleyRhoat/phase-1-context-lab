/* Your Code Here */
const createEmployeeRecord = (values) => {
  return {
    firstName: values[0],
    familyName: values[1],
    title: values[2],
    payPerHour: values[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};
const createEmployeeRecords = (employeeData) => {
  return employeeData.map(createEmployeeRecord);
};

const createTimeInEvent = function (dateStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    date: dateStamp.slice(0, 10),
    hour: parseInt(dateStamp.slice(-4)),
  });
  return this;
};
const createTimeOutEvent = function (dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    date: dateStamp.slice(0, 10),
    hour: parseInt(dateStamp.slice(-4)),
  });
  return this;
};
const hoursWorkedOnDate = function (date) {
  const timeIn = this.timeInEvents.find((event) => event.date === date).hour;
  const timeOut = this.timeOutEvents.find((event) => event.date === date).hour;
  return (timeOut - timeIn) / 100;
};
const wagesEarnedOnDate = function (date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);}.bind(this), 0,); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
const findEmployeeByFirstName = function (employees, firstName,) {
  return employees.find((employee) => employee.firstName === firstName,);
};


function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((grandTotal, employee) => {
    return grandTotal + allWagesFor.call(employee);
  }, 0);
}