export {swapBarHeight, changeBarCol, resetDelay};

var DELAY = 0;

function swapBarHeight(barOne, barTwo, speed) {
    setTimeout(() => {
        const tmpHeight = barOne.height;
        barOne.height = barTwo.height;
        barTwo.height = tmpHeight;
      }, DELAY += speed);
}

function changeBarCol(bar, col, speed) {
    setTimeout(() => {
        bar.backgroundColor = col;
      }, DELAY += speed);
}

function resetDelay() {
    DELAY = 0;
}