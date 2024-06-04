let values1 = {
  amount: 100000,
  years: 10,
  rate: .06,
}

let values2 = {
  amount: 100,
  years: 100,
  rate: .06,
}

let zeroCents = {
  amount: 100000,
  years: 6,
  rate: .010104,
}

let zeroInterest = {
    amount: 100000,
    years: 10,
    rate: 0,
}

it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment(values1)).toEqual("1110.21");
  expect(calculateMonthlyPayment(values2)).toEqual("0.50")
});


it("should return a result with 2 decimal places", function() {
  //ensure that zeros are still shown in decimla places
  expect(calculateMonthlyPayment(zeroCents)).toEqual("1432.00");
});

it('should calculate for 0% interest', function(){
  expect(calculateMonthlyPayment(zeroInterest)).toEqual("833.33");
});
/// etc
