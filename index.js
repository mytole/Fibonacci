const vars = {
    calcBtn: document.getElementById("calcBtn"),
    answer: document.getElementById("answer"),
    spinnerNum: document.getElementById("loading-num"),
    spinnerRes: document.getElementById("loading-res"),
    alert50: document.getElementById("larger-50-alert"),
    resultsRow: document.getElementById("row-results"),
    saveBox: document.getElementById("save"),
    sortBy: document.getElementById('sort-by'),
    showSpinner: function(spinner) { spinner.style.display = "inline-block"; },
    hideSpinner: function(spinner) { spinner.style.display = "none"; },
    hideaAlert: function(){vars.alert50.classList.remove("fade-in");},
    showAlert: function(){vars.alert50.classList.add("fade-in");},
    
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
        vars.resultsRow.appendChild(currentCol);
        currentCol.innerHTML = "The Fibonnaci Of <b>" + arr[i].number + "</b> is <b>" + arr[i].result + "</b>. Calculated at: " + resDate;
    }
}

function showServerArray(pro) {
    
    pro.then((res => {
        hideSpinner(vars.spinnerRes);
        let copyArr = [...res.results];
        if (vars.sortBy.value == "dat-asc") {
            copyArr = sortArrayByDateAsc(copyArr);
            $('.result').remove();
            printArr(copyArr);
        }
        vars.sortBy.addEventListener("change", () => {
            if (vars.sortBy.value == "dat-asc") {
                copyArr = sortArrayByDateAsc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
            if (vars.sortBy.value == "dat-desc") {
                copyArr = sortArrayByDateDesc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
            if (vars.sortBy.value == "num-asc") {
                copyArr = sortArrayByNumberAsc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
            if (vars.sortBy.value == "num-desc") {
                copyArr = sortArrayByNumberDesc(copyArr);
                $('.result').remove();
                printArr(copyArr);
            }
        });




    }))
}


    vars.calcBtn.addEventListener('click', () => {
    let userInput = document.getElementById("userNum").value;
    vars.answer.id = "answer";
    vars.answer.innerHTML = "";
    vars.showSpinner(vars.spinnerNum);
    vars.showSpinner(vars.spinnerRes);
    vars.hideaAlert();

    if (userInput > 50) {
        vars.hideSpinner(vars.spinnerNum);
        vars.hideSpinner(vars.spinnerRes);
        vars.showAlert();

    }
    else {
        if (vars.saveBox.checked) {
            serverCallSave(userInput).then(response => {
                if (!response.ok) {
                    vars.hideSpinner(vars.spinnerNum);
                    vars.hideSpinner(vars.spinnerRes);
                    vars.answer.id = "server-err";

                    response.text().then(data => {
                        vars.answer.innerHTML = "Server Error: " + data;
                    });

                }
                else {

                    response.json().then(data => {
                        vars.hideSpinner(vars.spinnerNum);
                        vars.answer.innerHTML = data.result;
                        showServerArray(serverCallRes());
                    })
                }
            })
        }
        else {
            vars.answer.innerText = fiboCalc(userInput);
            vars.hideSpinner(vars.spinnerNum);
            vars.hideSpinner(vars.spinnerRes);
        }
    }
});


