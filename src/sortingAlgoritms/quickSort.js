import {swap} from './swap.js';
import {swapBarHeight, changeBarCol} from '../SortingVisualizer/animationHelpers';
export {quickSortAnimations}

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';
// This is the color the current pivot.
const CURRENT_COLOR = 'yellow';
// This is the colour of the current i and j bar.
const SECONDARY_COLOUR = 'red';
// This is the colour of the final position of the bar.
const FINAL_COLOUR = 'green';

const ANIMATION_SPEED = 3;

const arrayBars = document.getElementsByClassName('array-bar');


function partition(array, left, right) {
    const pivotIdx = Math.floor((right + left) / 2)
    const pivot = array[pivotIdx]; //middle element
    changeBarCol(arrayBars[pivotIdx], CURRENT_COLOR, ANIMATION_SPEED);
    let i = left;
    let j = right;
    while (i <= j) {
        changeBarCol(arrayBars[j], SECONDARY_COLOUR, ANIMATION_SPEED);
        changeBarCol(arrayBars[i], SECONDARY_COLOUR, ANIMATION_SPEED);
        while (array[i] < pivot) {
            changeBarCol(arrayBars[i], PRIMARY_COLOUR, ANIMATION_SPEED);
            i++;
            changeBarCol(arrayBars[i], PRIMARY_COLOUR, ANIMATION_SPEED);
        }
        while (array[j] > pivot) {
            changeBarCol(arrayBars[j], PRIMARY_COLOUR, ANIMATION_SPEED);
            j--;
            changeBarCol(arrayBars[j], SECONDARY_COLOUR, ANIMATION_SPEED);
        }
        if (i <= j) {
            swap(array, i, j); //swap two elements
            swapBarHeight(arrayBars[i], arrayBars[j], ANIMATION_SPEED);
            changeBarCol(arrayBars[j], PRIMARY_COLOUR, ANIMATION_SPEED);
            changeBarCol(arrayBars[i], PRIMARY_COLOUR, ANIMATION_SPEED);
            i++;
            j--;
        }
        else {
            changeBarCol(arrayBars[j], PRIMARY_COLOUR, ANIMATION_SPEED);
            changeBarCol(arrayBars[i], PRIMARY_COLOUR, ANIMATION_SPEED);
        }
    }
    if (i >= pivotIdx) {
        changeBarCol(arrayBars[i], FINAL_COLOUR, ANIMATION_SPEED);
    }
    else if(j <= pivotIdx) {
        changeBarCol(arrayBars[j], FINAL_COLOUR, ANIMATION_SPEED);
    }
    else {
        changeBarCol(arrayBars[pivotIdx], FINAL_COLOUR, ANIMATION_SPEED);
    }
    return i;
}
function quickSortAnimations(array, left, right) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right);
        if (left < index - 1) {
            quickSortAnimations(array, left, index - 1);
        }
        if (index < right) {
            quickSortAnimations(array, index, right);
        }
    }
    return array;
}