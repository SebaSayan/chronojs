const serieButton = document.querySelectorAll('#serie>button');
const section = document.querySelector('section>div:nth-child(2)');
const load = document.querySelector('section');
const newDivTimer = document.createElement("div");
const newDivTime = document.createElement("div");
const popupContainer = document.querySelector('pop-up-container');
const reglage = document.querySelector('h3');
newDivTimer.setAttribute("id", "timer");
newDivTime.setAttribute("id", "time");
let basicArray = [
    { pic: 0, min: 0.5 },
    { pic: 1, min: 1 },
    { pic: 2, min: 1.5 },
    { pic: 3, min: 2 },
    { pic: 4, min: 3 },
    { pic: 5, min: 10 }
];
let nbrSerie;
let startApp =
    `
        <button id="t1" value="${basicArray[0].pic}" name="${basicArray[0].min}">${affichage(basicArray[0].min)}</button>
        <button id="t2" value="${basicArray[1].pic}" name="${basicArray[1].min}">${affichage(basicArray[1].min)}</button>
        <button id="t3" value="${basicArray[2].pic}" name="${basicArray[2].min}">${affichage(basicArray[2].min)}</button>
        <button id="t4" value="${basicArray[3].pic}" name="${basicArray[3].min}">${affichage(basicArray[3].min)}</button>
        <button id="t5" value="${basicArray[4].pic}" name="${basicArray[4].min}">${affichage(basicArray[4].min)}</button>
        <button id="t6" value="${basicArray[5].pic}" name="${basicArray[5].min}">${affichage(basicArray[5].min)}</button>
    `;
let timerApp =
    `
    <div id="chrono"></div> 
    <button class="stop">STOP</button>
`;

(() => {
    newDivTime.innerHTML = startApp;
    load.appendChild(newDivTime);
})();

function affichage(minutes) {
    let seconds;
    seconds = Math.floor(minutes * 60);
    min = Math.floor(minutes);
    sec = seconds % 60;
    if (sec === 0) {
        return `${min}'`
    };
    if (min === 0) {
        return `${sec}"`
    };
    return `${min}'${sec}"`
};

function selectNbrSerie() {
    serieButton.forEach((btn) => {
        btn.addEventListener('click', () => {
            nbrSerie = btn.value;
            if (btn.className === "") {
                for (i = 0; i < 7; i++) {
                    if (serieButton[i].classList = "active") {
                        serieButton[i].classList = "";
                    }
                    if (btn.value == 0) {
                        location.reload(true);
                    }
                }
                btn.classList = "active";
            }
        });
    })
};

function selectTime() {
    const timeButton = document.querySelectorAll('#time>button');
    timeButton.forEach((btn) => {
        btn.addEventListener('click', () => {

            function changePage() {
                time.remove();
                newDivTimer.innerHTML = timerApp;
                load.appendChild(newDivTimer);
                const chrono = document.getElementById('chrono');
                let countBtn = btn.innerHTML;
                let countMinStr = countBtn.split("'")[0];
                let countMin = parseInt(countMinStr);
                let countSecStr = countBtn.split("'")[1];
                let countSec = parseInt(countSecStr);

                if (btn.name < 1) {
                    countSec = countMin;
                    countMin = 0;
                };

                if (countSec === 30) {
                    chrono.textContent = `${countMin}'${countSec}"`;
                } else {
                    countSec = 00;
                    chrono.textContent = `${countMin}'`;
                };

                if (countMin === 0) {
                    chrono.textContent = `${countSec}"`;
                };

                const interval = setInterval(timerChrono, 1000);
                const stopId = document.querySelector('.stop');
                stopId.addEventListener('click', () => {
                    stopInterval();
                    timer.remove();
                    newDivTime.innerHTML = startApp;
                    newDivTime.setAttribute("id", "time");
                    load.appendChild(newDivTime);
                    if (nbrSerie !== undefined) {
                        selectNbrSerie(serieButton[nbrSerie].classList = "", serieButton[nbrSerie + 1].classList = "active");
                        nbrSerie++;
                    }
                    selectTime();
                });

                function timerChrono() {
                    if (countSec === 00) {
                        countMin--;
                        countSec = 59;
                    } else {
                        countSec--;
                    };
                    if (countMin === 0) {
                        chrono.textContent = `${countSec}"`;
                    } else {
                        chrono.textContent = `${countMin}'${countSec}"`;
                    };
                    if (countMin === 0 && countSec === 00) {
                        timer.remove();
                        newDivTimer.innerHTML = startApp;
                        load.appendChild(newDivTime);
                        songEnd();
                    };
                    if (countMin === 0 && countSec === 05) {
                        songFive();
                    };
                    if (countMin === 0 && countSec === 04) {
                        songFive();
                    };
                    if (countMin === 0 && countSec === 03) {
                        songFive();
                    };
                    if (countMin === 0 && countSec === 02) {
                        songFive();
                    };
                    if (countMin === 0 && countSec === 01) {
                        songFive();
                    };
                };

                function stopInterval() {
                    clearInterval(interval);
                };
            };
            if (nbrSerie === 0) {
                nbrSerie++;
                selectNbrSerie(serieButton[nbrSerie].classList = "")
            };

            if (nbrSerie !== undefined) {
                selectNbrSerie(serieButton[nbrSerie].classList = "", serieButton[nbrSerie - 1].classList = "active");
                nbrSerie--;
                changePage();
            } else {
                changePage();

            }
        })
    });
};

function songEnd() {
    const audio = new Audio();
    audio.src = "ring.mp3";
    audio.play();
};

function songFive() {
    const audio = new Audio();
    audio.src = "5sec.mp3";
    audio.play();
};

menu.addEventListener('click', () => {
    if (popup.style.opacity == 0) {
        popup.style.opacity = 1;
        popup.style.transform = "translateX(0px)";
    } else {
        popup.style.opacity = 0;
        popup.style.transform = "translateX(600px)";
    };
});

reglage.addEventListener('click', () => {
    popupContainer.innerHTML =
        `
    <button>TEST</button>
    `
});

closeBtn.addEventListener("click", () => {

    popup.style.opacity = 0;
    popup.style.transform = "translateX(600px)";
});

selectNbrSerie();
selectTime();