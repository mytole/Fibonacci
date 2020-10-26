let fibIn = document.getElementById("num1");
let ans = document.getElementById("num2");



function fiboCalc(userNum){
    if(userNum==0){
        return 0;
    }
    if(userNum==1){
        return 1;
    }

    
    let fiboNumPriv2 = 0;
    let fiboNumPriv1 = 1;
    let fiboNumCurr = 1;

    for(let fiboIndex = 1;fiboIndex<userNum; fiboIndex++){
        fiboNumCurr = fiboNumPriv1 + fiboNumPriv2 ;
        fiboNumPriv2 = fiboNumPriv1 ;
        fiboNumPriv1 = fiboNumCurr ;
        
    }

    return fiboNumCurr;
}

fibIn.innerText = "10";
ans.innerText = fiboCalc(fibIn.innerText);