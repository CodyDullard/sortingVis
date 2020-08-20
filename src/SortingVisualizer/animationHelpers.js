export {swapBarHeight, changeBarCol, resetDelay, makeGraphGreen};

var DELAY = 0;

const arrayBars = document.getElementsByClassName('array-bar');

function swapBarHeight(barOne, barTwo, speed) {
    setTimeout(() => {
        const tmpHeight = barOne.style.height;
        barOne.style.height = barTwo.style.height;
        barTwo.style.height = tmpHeight;
      }, DELAY += speed);
}

function makeGraphGreen() {
    for(let barIdx = arrayBars.length - 1; barIdx >= 0; barIdx--) {
        changeBarCol(arrayBars[barIdx], "green", 1);
      }
}

function changeBarCol(bar, col, speed) {
    setTimeout(() => {
        bar.style.backgroundColor = col;
      }, DELAY += speed);
}

function resetDelay() {
    DELAY = 0;
}