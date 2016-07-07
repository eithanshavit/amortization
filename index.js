var Finance = require('financejs');
var finance = new Finance();

// Utils

function ceil2dec(num) {
  return (Math.round(num * 100) / 100.0);
}

// Finance

function amortizationSchedule(principal, years, rate) {
  var monthlyPayment = finance.AM(principal, rate, years, 0);
  var amortizationSchedule = [];
  for (var i = 0; i < (years * 12); i++) {
    var prevPrincipal = i == 0 ? principal : amortizationSchedule[i-1].principal;
    var interestPayment = ceil2dec(prevPrincipal * rate/ 12.0 / 100);
    var principalPayment = ceil2dec(monthlyPayment - interestPayment);
    amortizationSchedule.push({
      paymentNumber: i+1,
      principal: ceil2dec(prevPrincipal - principalPayment),
      payment: monthlyPayment,
      interestPayment: interestPayment,
      principalPayment: principalPayment,
      accInterest: ceil2dec(i == 0 ? 0 : amortizationSchedule[i-1].accInterest + interestPayment),
    })
  }
  return amortizationSchedule;
}
