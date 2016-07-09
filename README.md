# amortization
A simple module to calculate the amortization schedule of a loan.

## Install
npm install amortization --save

# API Documentation
## Functions

<dl>
<dt><a href="#amortizationSchedule">amortizationSchedule(principal, yearsDuration, yearlyRate)</a> ⇒ <code><a href="#MonthlyPayment">Array.&lt;MonthlyPayment&gt;</a></code></dt>
<dd><p>Generates an amortization schedule</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MonthlyPayment">MonthlyPayment</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="amortizationSchedule"></a>

## amortizationSchedule(principal, yearsDuration, yearlyRate) ⇒ <code>[Array.&lt;MonthlyPayment&gt;](#MonthlyPayment)</code>
Generates an amortization schedule

**Kind**: global function  
**Returns**: <code>[Array.&lt;MonthlyPayment&gt;](#MonthlyPayment)</code> - - Each item in the array is a payment object  

| Param | Type | Description |
| --- | --- | --- |
| principal | <code>number</code> | The opening principal of the loan |
| yearsDuration | <code>number</code> | The number of years for the load |
| yearlyRate | <code>number</code> | The yearly rate for the loan |

<a name="MonthlyPayment"></a>

## MonthlyPayment : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| paymentNumber | <code>number</code> | number of payment in the schedule |
| payment | <code>number</code> | total amount of monthly loan paid |
| interestPayment | <code>number</code> | amount of monthly interest paid |
| interestPaymentRounded | <code>number</code> | rounded version of interestPayment |
| principalPayment | <code>number</code> | amount of monthly principal paid |
| principalPaymentRounded | <code>number</code> | rounded version of principalPayment |
| principalBalance | <code>number</code> | balance of loan principal after payment |
| principalBalanceRounded | <code>number</code> | rounded version of principalBalance |
| accInterest | <code>number</code> | total interest paid so to date |
| accInterestRounded | <code>number</code> | rounded version of accInterest |

