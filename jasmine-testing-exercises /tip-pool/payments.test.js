billTestArray = [100, 700, 500];
tipTestArray = [10, 150, 500];

describe('createCurPayment testing', function(){
    it('should create a payment object with the correct values', function(){
        billAmtInput.value = billTestArray[0];
        tipAmtInput.value = tipTestArray[0];
        let testPayment = createCurPayment();
        expect(testPayment['billAmt']).toEqual('100');
        expect(testPayment['tipAmt']).toEqual('10');
        expect(testPayment['tipPercent']).toEqual(10);
    })
})

describe('submitPaymentInfo testing', function(){
    it('should create a payment object', function(){
        billAmtInput.value = billTestArray[0];
        tipAmtInput.value = tipTestArray[0];
        submitPaymentInfo();
        expect(Object.keys(allPayments)).toContain('payment1');
    })
    it('should append changes to payment tables', function(){
        billAmtInput.value = billTestArray[0];
        tipAmtInput.value = tipTestArray[0];
        submitPaymentInfo();        
        expect(document.getElementById('payment1')).toBeTruthy();
    })
})

describe('appendPaymentTable testing', function(){
    it('should append the payment information to the end of paymentTBody', function(){
        for (let i = 0; i < billTestArray.length; i++){
            billAmtInput.value = billTestArray[i];
            tipAmtInput.value = tipTestArray[i];
            submitPaymentInfo();  
        }
        console.log(sumPaymentTotal('tipPercent'))      
        expect(paymentTbody.lastChild.id).toEqual('payment' + billTestArray.length);
    })
})

describe('updateSummary testing', function(){
    it('should display the correct totals in the summary section', function(){
        for (let i = 0; i < billTestArray.length; i++){
            billAmtInput.value = billTestArray[i];
            tipAmtInput.value = tipTestArray[i];
            submitPaymentInfo();  
        } 
        billTotal = billTestArray.reduce((a, b) => a + b, 0);
        tipTotal = tipTestArray.reduce((a, b) => a + b, 0);
        tipAvg = Math.round(sumPaymentTotal('tipPercent') / Object.keys(allPayments).length);
        

        expect(summaryTds[0].innerHTML).toEqual('$' + billTotal);
        expect(summaryTds[1].innerHTML).toEqual('$' + tipTotal);
        expect(summaryTds[2].innerHTML).toEqual(tipAvg + '%');
    })
    
})

afterEach(function() {
    allServers = {};
    serverId = 0;
    updateServerTable();
    updateSummary();
  });