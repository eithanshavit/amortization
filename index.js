var Finance = require('financejs');
var finance = new Finance();

// Docs

/**
 * @typedef MonthlyPayment
 * @type Object
 * @property {number} paymentNumber - number of payment in the schedule
 * @property {number} payment - total amount of monthly loan paid
 * @property {number} interestPayment - amount of monthly interest payment
 * @property {number} interestPaymentRounded - rounded version of interestPayment
 * @property {number} principalPayment - amount of monthly principal payment
 * @property {number} principalPaymentRounded - rounded version of principalPayment
 * @property {number} principalBalance - balance of loan principal after payment
 * @property {number} principalBalanceRounded - rounded version of principalBalance
 * @property {number} accInterest - total interest paid so to date
 * @property {number} accInterestRounded - rounded version of accInterest
 */

 /**
 * @typedef YearlyPayment
 * @type Object
 * @property {number} paymentNumber - number of payment in the yearly schedule
 * @property {number} payment - total amount of yearly loan payment
 * @property {number} paymentRounded - rounded version of payment
 * @property {number} interestPayment - amount of yearly interest payment
 * @property {number} interestPaymentRounded - rounded version of interestPayment
 * @property {number} principalPayment - amount of yearly principal payment
 * @property {number} principalPaymentRounded - rounded version of principalPayment
 */

// Utils

function floor2dec(num) {
  return (Math.floor(num * 100) / 100.0);
}

function round2dec(num) {
  return (Math.floor(num * 100) / 100.0)
}

// Validation

function assertNumber(num, message) {
  if (typeof num !== "number") {
    throw new TypeError(message);
  }
}

function assertInt(num, message) {
  if (!((typeof num === "number") && Math.floor(num) === num)) {
    throw new TypeError(message);
  }
}

function assertPos(num, message) {
  if ( !((typeof num === "number") && num > 0) ) {
    throw new RangeError(message);
  }
}

// Exports

/**
Generates an amortization schedule.
@param {number} principal - The opening principal of the loan
@param {number} yearsDuration - The number of years for the load
@param {number} yearlyRate - The yearly rate for the loan
@returns {MonthlyPayment[]} - Each item in the array is a monthly loan payment object
*/
exports.amortizationSchedule = function(principal, yearsDuration, yearlyRate) {
  assertNumber(principal, "principal must be a number");
  assertPos(principal, "principal must be positive");
  assertNumber(yearlyRate, "yearlyRate must be a number");
  assertPos(yearlyRate, "yearlyRate must be positive");
  assertInt(yearsDuration, "yearsDuration must be a and integer");
  assertPos(yearsDuration, "yearsDuration must be positive");

  var monthlyPayment = finance.AM(principal, yearlyRate, yearsDuration, 0);
  var monthlyRate = yearlyRate / 12.0 / 100.0;
  var amortizationSchedule = [];

  for (var i = 0; i < (yearsDuration * 12); i++) {
    var prevPrincipal = i === 0 ? principal : amortizationSchedule[i-1].principalBalance;
    var interestPayment = prevPrincipal * monthlyRate;
    var principalPayment = monthlyPayment - interestPayment;
    var principalBalance = Math.max(prevPrincipal - principalPayment, 0);
    var accInterest = (i === 0 ? 0 : amortizationSchedule[i-1].accInterest) + interestPayment;
    amortizationSchedule.push({
      paymentNumber: i+1,
      payment: monthlyPayment,
      principalBalance: principalBalance,
      interestPayment: interestPayment,
      principalPayment: principalPayment,
      accInterest: accInterest,
      interestPaymentRounded: round2dec(interestPayment),
      principalPaymentRounded: round2dec(principalPayment),
      principalBalanceRounded: round2dec(principalBalance),
      accInterestRounded: round2dec(accInterest),
    });
  }
  return amortizationSchedule;
};

/**
Generates a yearly amortization schedule with the pricipal, interest, and payment of each year of the loan.
@param {number} principal - The opening principal of the loan
@param {number} yearsDuration - The number of years for the load
@param {number} yearlyRate - The yearly rate for the loan
@returns {YearlyPayment[]} - Each item in the array is a payment object
*/
exports.yearlyAmortizationSchedule = function(principal, yearsDuration, yearlyRate) {
  assertNumber(principal, "principal must be a number");
  assertPos(principal, "principal must be positive");
  assertNumber(yearlyRate, "yearlyRate must be a number");
  assertPos(yearlyRate, "yearlyRate must be positive");
  assertInt(yearsDuration, "yearsDuration must be a and integer");
  assertPos(yearsDuration, "yearsDuration must be positive");
  var months = exports.amortizationSchedule(principal, yearsDuration, yearlyRate);
  var years = {};
  months.forEach(function(month) {
    var yearNumber = Math.floor((month.paymentNumber - 1)/12) + 1;
    var year = years[yearNumber] || {};
    year.paymentNumber = yearNumber;
    year.principalPayment = (year.principalPayment || 0) + month.principalPayment;
    year.interestPayment = (year.interestPayment || 0) + month.interestPayment;
    year.payment = (year.payment || 0) + month.payment;
    year.principalPaymentRounded = round2dec(year.principalPayment);
    year.interestPaymentRounded = round2dec(year.interestPayment);
    year.paymentRounded = round2dec(year.payment);
    years[yearNumber] = year;
  });
  var ret = [];
  for (var i = 1; i <= yearsDuration; i++) {
    ret.push(years[i]);
  }
  return ret;
};
