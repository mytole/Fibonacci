
let calcBtn = document.getElementById("calcBtn");
let answer = document.getElementById("answer");

calcBtn.addEventListener('click',()=>{
    let userNum = document.getElementById("userNum").value;
    fetch('http://localhost:5050/fibonacci/'+userNum).then(response => {
        response.json().then(data =>{
            answer.innerHTML = data.result;
        })
    })
});
