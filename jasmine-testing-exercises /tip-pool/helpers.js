
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

function appendDeleteBtn(tr){
  let newTd = document.createElement('td');
  newTd.innerText = 'X';
  newTd.id = 'removeTd';

  tr.append(newTd);
}
/**
 - Review the functionality of `appendTd(tr, value)`
 - Create a `appendDeleteBtn(tr)`, it will be similar to `append(tr, value)`. 
  This function will create a ‘td’ with the value ‘X’, when clicked it will 
  delete the table row it belongs to
 - Write the functionality for appending a ‘td’ to a ‘tr’ with the value ‘X’
 - Set an click event listener on the ‘td’ that will remove the parent ‘tr’ 
  from the dom. You will have to find a way to access the parent row of the 
  ‘td’ from the click event
 */
