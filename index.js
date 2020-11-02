let calcBtn = document.getElementById("calcBtn");
let answer = document.getElementById("answer");
let spinnerNum = document.getElementById("loading-num");
let spinnerRes = document.getElementById("loading-res");
let alert50 = document.getElementById("larger-50-alert");
let resultsRow = document.getElementById("row-results");
let saveBox = document.getElementById("save");
function showSpinner(spinner) { spinner.style.display = "inline-block"; };
function hideSpinner(spinner) { spinner.style.display = "none"; };
function hideaAlert() {
    alert50.classList.remove("fade-in");
}
function showAlert() {
    alert50.classList.add("fade-in");
}

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

function serverCall() {
    fetch('http://localhost:5050/getFibonacciResults').then(response => {

        response.json().then(data => {
            hideSpinner(spinnerRes);
            let copyArr = [...data.results];
            let sorted = true;
            do {
                sorted = true;
                for (let i = 0; (i + 1) < copyArr.length; i++) {
                    if (copyArr[i].createdDate < copyArr[i + 1].createdDate) {
                        let temp = copyArr[i];
                        copyArr[i] = copyArr[i + 1];
                        copyArr[i + 1] = temp;
                        sorted = false;
                    }
                }
            } while (!sorted)
            $('.result').remove();
            for (let i = 0; i < copyArr.length; i++) {
                let resDate = new Date(copyArr[i].createdDate);
                let currentCol = document.createElement("div");
                currentCol.classList.add("col-12", "result");
                resultsRow.appendChild(currentCol);
                currentCol.innerHTML = "The Fibonnaci Of <b>" + copyArr[i].number + "</b> is <b>" + copyArr[i].result + "</b>. Calculated at: " + resDate;

            }
        });
    })

}

calcBtn.addEventListener('click', () => {
    let userInput = document.getElementById("userNum").value;
    answer.id = "answer";
    answer.innerHTML = "";
    showSpinner(spinnerNum);
    showSpinner(spinnerRes);
    hideaAlert();

    if (userInput > 50) {
        hideSpinner(spinnerNum);
        hideSpinner(spinnerRes);
        showAlert();

    }
    else {
        if (saveBox.checked) {
            fetch('http://localhost:5050/fibonacci/' + userInput).then(response => {
                if (!response.ok) {
                    hideSpinner(spinnerNum);
                    hideSpinner(spinnerRes);
                    answer.id = "server-err";

                    response.text().then(data => {
                        answer.innerHTML = "Server Error: " + data;
                    });

                }
                else {

                    response.json().then(data => {
                        hideSpinner(spinnerNum);
                        answer.innerHTML = data.result;
                        serverCall();
                    })
                }
            })
        }
        else{
            answer.innerText = fiboCalc(userInput);
            hideSpinner(spinnerNum);
            hideSpinner(spinnerRes);
        }
    }
});


