// variables

let workTitle = document.getElementById("work");
let breakTitle = document.getElementById("break");

let workTime = 25;
let breakTime = 5;

let seconds = "00";

let workMinutes = workTime - 1;
let breakMinutes = breakTime - 1;

let breakCount = 0;

let timerInterval; // To store interval ID
let isTimerRunning = false; // To track if the timer is running

//display
window.onload = () => {
    /* fired when the whole page has loaded */
    document.getElementById("minutes").innerHTML =
        workTime; /* even though workTime is an integer, JS automatically converts it to a string */
    document.getElementById("seconds").innerHTML = seconds; /* same here */

    workTitle.classList.add("active");
};

function pause() {
    clearInterval(timerInterval); // Stop the timer
    isTimerRunning = false; // Set the flag to false
}



// start timer
function startFunction() {
    if (!isTimerRunning) {

        if (seconds === "00") {
            seconds = 59;
        }
        // countdown
        let timerFunction = () => {
            /* an 'arrow function' that takes no parameters and executes a function */

            //change the display
            document.getElementById("minutes").innerHTML = workMinutes;
            document.getElementById("seconds").innerHTML = seconds;

            if (seconds == 0) {
                workMinutes = workMinutes - 1;
                if (workMinutes === -1) {
                    if (breakCount % 2 === 0) {
                        // start break
                        workMinutes = breakMinutes;
                        breakCount++;

                        //change the panel
                        workTitle.classList.remove("active");
                        breakTitle.classList.add("active");
                    } else {
                        // continue work
                        workMinutes = workTime;
                        breakCount++;

                        breakTitle.classList.remove("active");
                        workTitle.classList.add("active");
                    }
                }
                seconds = 60;
            }

            seconds = seconds - 1;
            if (seconds <= 9 && seconds >= 0) {
                seconds = "0" + seconds;
            }
        };

        //start countdown, note: 1000 = 1s
        // setInterval() function repeatedly calls a function with a fixed time delay (2nd arg) between each call
        // Start the timer and save the interval ID
        timerInterval = setInterval(timerFunction, 1000);
        isTimerRunning = true; // Set the flag to true
    } else {
        pause();
    }

    //change the button from play to pause and vice versa
    if (document.querySelector("#start i").classList.contains("fa-play")) {
        document
            .querySelector("#start i")
            .classList.replace("fa-play", "fa-pause");
    } else {
        document
            .querySelector("#start i")
            .classList.replace("fa-pause", "fa-play");
    }
}


function resetFunction() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    workMinutes = workTime - 1;
    seconds = "00";
    document.getElementById("minutes").innerHTML = workTime;
    document.getElementById("seconds").innerHTML = seconds;
    workTitle.classList.add("active");

    //if the timer is active change the button to show 'play' instead of 'pause'. Otherwise do nothing
    if (document.querySelector("#start i").classList.contains("fa-pause")) {
        document
            .querySelector("#start i")
            .classList.replace("fa-pause", "fa-play");
    }
}

function settingsFunction() {
    
}

const playButton = document.getElementById("start");
playButton.addEventListener("click", startFunction);

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetFunction);

const settingsButton = document.getElementById("gear");
settingsButton.addEventListener("click", settingsFunction);

