var Finance = require('financejs');
var finance = new Finance();

// Docs

/**
 * @typedef MonthlyPayment
 * @type Object
 * @property {number} paymentNumber - number of payment in the schedule
 * @property {number} payment - total amount of monthly loan paid
 * @property {number} interestPayment - amount of monthly interest paid
 * @property {number} interestPaymentRounded - rounded version of interestPayment
 * @property {number} principalPayment - amount of monthly principal paid
 * @property {number} principalPaymentRounded - rounded version of principalPayment
 * @property {number} principalBalance - balance of loan principal after payment
 * @property {number} principalBalanceRounded - rounded version of principalBalance
 * @property {number} accInterest - total interest paid so to date
 * @property {number} accInterestRounded - rounded version of accInterest
 */

// Utils

function floor2dec(num) {
  return (Math.floor(num * 100) / 100.0);
}

// Validation

function assertNumber(num, message) {
  if (!(typeof num === "number")) {
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
Generates an amortization schedule
@param {number} principal - The opening principal of the loan
@param {number} yearsDuration - The number of years for the load
@param {number} yearlyRate - The yearly rate for the loan
@returns {MonthlyPayment[]} - Each item in the array is a payment object
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
    var prevPrincipal = i == 0 ? principal : amortizationSchedule[i-1].principalBalance;
    var interestPayment = prevPrincipal * monthlyRate;
    var principalPayment = monthlyPayment - interestPayment;
    var principalBalance = prevPrincipal - principalPayment;
    var accInterest = (i == 0 ? 0 : amortizationSchedule[i-1].accInterest) + interestPayment;
    amortizationSchedule.push({
      paymentNumber: i+1,
      principalBalance: principalBalance,
      payment: monthlyPayment,
      interestPayment: interestPayment,
      principalPayment: principalPayment,
      accInterest: accInterest,
      interestPaymentRounded: floor2dec(interestPayment),
      principalPaymentRounded: floor2dec(principalPayment),
      principalBalanceRounded: floor2dec(principalBalance),
      accInterestRounded: floor2dec(accInterest),
    })
  }
  return amortizationSchedule;
}
