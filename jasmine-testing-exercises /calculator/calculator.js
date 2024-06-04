window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let amtInput = document.getElementById("loan-amount");
  let yrInput = document.getElementById("loan-years"); 
  let rtInput = document.getElementById("loan-rate"); 

  amtInput.value = 1000;
  yrInput.value = 10;
  rtInput.value = 10;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let loan = getCurrentUIValues();
  let monthlyPayment = calculateMonthlyPayment(loan);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if(values.rate == 0){
    let payment = values.amount/(values.years*12);
    return payment.toFixed(2);
  }
  let numer = values.amount*(values.rate/12);
  let denom = 1 - Math.pow((1+values.rate/12), -(values.years*12))
  let payment = numer/denom;
  return payment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyPaymentSpan = document.getElementById("monthly-payment");
  monthlyPaymentSpan.innerText = monthly;
}
