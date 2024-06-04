function countdown(num){
    let count = num;
    function step(){
        if (count > 1){
            count -= 1;
            console.log(count);
        }
        else{
            console.log("DONE!");
            clearInterval(interval)
        }
    }
    interval = setInterval(step, 1000);

}

countdown(7);