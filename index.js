var Finance = require('financejs');
var finance = new Finance();

// Utils

function ceil2dec(num) {
  return (Math.round(num * 100) / 100.0);
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

exports.amortizationSchedule = function(principal, yearsDuration, yearlyRate) {
  assertNumber(principal, "principal must be a number");
  assertPos(principal, "principal must be positive");
  assertNumber(yearlyRate, "yearlyRate must be a number");
  assertPos(yearlyRate, "yearlyRate must be positive");
  assertInt(yearsDuration, "yearsDuration must be a and integer");
  assertPos(yearsDuration, "yearsDuration must be positive");
  var monthlyPayment = finance.AM(principal, yearlyRate, yearsDuration, 0);
  var amortizationSchedule = [];
  for (var i = 0; i < (yearsDuration * 12); i++) {
    var prevPrincipal = i == 0 ? principal : amortizationSchedule[i-1].principal;
    var interestPayment = ceil2dec(prevPrincipal * yearlyRate/ 12.0 / 100);
    var principalPayment = ceil2dec(monthlyPayment - interestPayment);
    amortizationSchedule.push({
      paymentNumber: i+1,
      principal: ceil2dec(prevPrincipal - principalPayment),
      payment: monthlyPayment,
      interestPayment: interestPayment,
      principalPayment: principalPayment,
      accInterest: ceil2dec((i == 0 ? 0 : amortizationSchedule[i-1].accInterest) + interestPayment),
    })
  }
  return amortizationSchedule;
}
