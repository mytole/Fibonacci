
let calcBtn = document.getElementById("calcBtn");
let answer = document.getElementById("answer");
let spinner = document.getElementById("loading");
let alert50 = document.getElementById("larger-50-alert");
function showSpinner() { spinner.style.display = "inline-block"; };
function hideSpinner() { spinner.style.display = "none"; };
function hideaAlert() {
    alert50.classList.remove("fade-in");
}
function showAlert() {
    alert50.classList.add("fade-in");
}

calcBtn.addEventListener('click', () => {
    let userInput = document.getElementById("userNum").value; 
    
    answer.id = "answer";
    answer.innerHTML = "";
    showSpinner();
    hideaAlert();

    if (userInput > 50) {
        hideSpinner();
        showAlert();

    }
    else {
        fetch('http://localhost:5050/fibonacci/' + userInput).then(response => {
            if (!response.ok) {
                hideSpinner();

                answer.id = "server-err";
                response.text().then(data => {
                    answer.innerHTML = "Server Error: " + data;
                });

            }
            else {
                response.json().then(data => {
                    hideSpinner();
                    answer.innerHTML = data.result;
                })
            }
        })

    }
});
