/*
Functions to test
- sumPaymentTotal
    - payment total correct
- CalculateTipPercent
    - tip percent correct
- appendTd
*/


billTestArray = [100, 700, 500, 90];
tipTestArray = [10, 150, 500, 30];

describe('CalculateTipPercent testing', function(){

    it('should return correct percentage calculation', function(){
        expect(calculateTipPercent(100, 10)).toEqual(10);
        expect(calculateTipPercent(101, 3)).toEqual(3);
    })
})

describe('sumPaymentTotal testing', function(){
    it('should return the correct totals for all components', function(){
        for (let i = 0; i < billTestArray.length; i++){
            billAmtInput.value = billTestArray[i];
            tipAmtInput.value = tipTestArray[i];
            submitPaymentInfo();  
        } 

        billTotal = billTestArray.reduce((a, b) => a+b, 0);
        tipTotal = tipTestArray.reduce((a, b) => a+b, 0);
        tipPercentTotal = 0;
        for (let i = 0; i < billTestArray.length; i++){
            tipPercentTotal += Math.round(100/(billTestArray[i]/tipTestArray[i]))
        }

        expect(sumPaymentTotal('billAmt')).toEqual(billTotal);
        expect(sumPaymentTotal('tipAmt')).toEqual(tipTotal);
        expect(sumPaymentTotal('tipPercent')).toEqual(tipPercentTotal);
    })
})

describe('appendTd testing', function(){
    it('should add the details of the payment to the end of the payment table', function(){
        exampleText = "test payment"
        appendTd(paymentTbody, exampleText)
        expect(paymentTbody.lastChild.innerText).toEqual(exampleText);
    })
})

describe('appendDeleteBtn testing', function(){
    it('should append a delete td to the end of the row', function(){
        let testData = [100, 10, 10];
        let tr = document.createElement('tr')
        for(item in testData){
            newtd = document.createElement('td');
            newtd.innerText = item;
            tr.append(newtd);
        }
        appendDeleteBtn(tr);
        paymentTbody.append(tr);
        expect(tr.lastChild.innerText).toEqual('X');
    })
})

afterEach( function(){
    allPayments = {};
    paymentId = 0;
    paymentTbody.innerHTML = ""
});