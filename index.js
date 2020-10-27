
let calcBtn = document.getElementById("calcBtn");
let answer = document.getElementById("answer");

function fiboCalc(userNum) {
    if (userNum == 0) {
        return 0;
    }
    if (userNum == 1) {
        return 1;
    }

    let fiboNumPriv2 = 0;
    let fiboNumPriv1 = 1;
    let fiboNumCurr = 1;

    for (let fiboIndex = 1; fiboIndex < userNum; fiboIndex++) {
        fiboNumCurr = fiboNumPriv1 + fiboNumPriv2;
        fiboNumPriv2 = fiboNumPriv1;
        fiboNumPriv1 = fiboNumCurr;
    }
    return fiboNumCurr;
}

calcBtn.addEventListener('click',()=>{
    let userNum = document.getElementById("userNum").value;
    let fiboCurr = fiboCalc(userNum);
    answer.innerText = fiboCurr;
})
