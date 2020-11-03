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
    return (fiboCalc(userNum - 1) + fiboCalc(userNum - 2));
}

async function serverCallRes() {
    const response = await fetch('http://localhost:5050/getFibonacciResults');
    const arrays = await response.json();
    return arrays;
}

async function serverCallSave(userInput) {
    const response = await fetch('http://localhost:5050/fibonacci/' + userInput);
    return response;
}

function sortArrayByDateAsc(array) {
    let copyArr = [...array];
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

    return copyArr;
}

function sortArrayByDateDesc(array) {
    let copyArr = [...array];
    let sorted = true;
    do {
        sorted = true;
        for (let i = 0; (i + 1) < copyArr.length; i++) {
            if (copyArr[i].createdDate > copyArr[i + 1].createdDate) {
                let temp = copyArr[i];
                copyArr[i] = copyArr[i + 1];
                copyArr[i + 1] = temp;
                sorted = false;
            }
        }
    } while (!sorted)

    return copyArr;
}

function sortArrayByNumberAsc(array) {
    let copyArr = [...array];
    let sorted = true;
    do {
        sorted = true;
        for (let i = 0; (i + 1) < copyArr.length; i++) {
            if (copyArr[i].number < copyArr[i + 1].number) {
                let temp = copyArr[i];
                copyArr[i] = copyArr[i + 1];
                copyArr[i + 1] = temp;
                sorted = false;
            }
        }
    } while (!sorted)

    return copyArr;
}

function sortArrayByNumberDesc(array) {
    let copyArr = [...array];
    let sorted = true;
    do {
        sorted = true;
        for (let i = 0; (i + 1) < copyArr.length; i++) {
            if (copyArr[i].number > copyArr[i + 1].number) {
                let temp = copyArr[i];
                copyArr[i] = copyArr[i + 1];
                copyArr[i + 1] = temp;
                sorted = false;
            }
        }
    } while (!sorted)

    return copyArr;
}

function printArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        let resDate = new Date(arr[i].createdDate);
        let currentCol = document.createElement("div");
        currentCol.classList.add("col-12", "result");
        resultsRow.appendChild(currentCol);
        currentCol.innerHTML = "The Fibonnaci Of <b>" + arr[i].number + "</b> is <b>" + arr[i].result + "</b>. Calculated at: " + resDate;
    }
}

function showServerArray(pro) {
    const sortBy = document.getElementById('sort-by');
    pro.then((res => {
        hideSpinner(spinnerRes);
        let copyArr = [...res.results];
        sortBy.addEventListener("change", () => {
            if (sortBy.value == "dat-asc") {
                copyArr = sortArrayByDateAsc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
            if (sortBy.value == "dat-desc") {
                copyArr = sortArrayByDateDesc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
            if (sortBy.value == "num-asc") {
                copyArr = sortArrayByNumberAsc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
            if (sortBy.value == "num-desc") {
                copyArr = sortArrayByNumberDesc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
        });




    }))
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
            serverCallSave(userInput).then(response => {
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
                        showServerArray(serverCallRes());
                    })
                }
            })
        }
        else {
            answer.innerText = fiboCalc(userInput);
            hideSpinner(spinnerNum);
            hideSpinner(spinnerRes);
        }
    }
});


