import {swapBarHeight, changeBarCol} from '../SortingVisualizer/animationHelpers';
import {swap} from './swap';
export {heapSortAnimations}

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';
// This is the color the current bar(i position).
const MAX_COLOR = 'yellow';
// This is the colour of the current smallest bar.
const FINAL_COLOUR = 'green';

const ANIMATION_SPEED = 1;

const arrayBars = document.getElementsByClassName('array-bar');

function heapSortAnimations (array) {
    const len = array.length;

    for(let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(array, len, i);
    }

    for(let j = len - 1; j >= 0; j--) {
        changeBarCol(arrayBars[0], FINAL_COLOUR, ANIMATION_SPEED);
        swap(array, j, 0);
        swapBarHeight(arrayBars[j], arrayBars[0], ANIMATION_SPEED);
        changeBarCol(arrayBars[j], FINAL_COLOUR, ANIMATION_SPEED);
        heapify(array, j, 0);
    }
    changeBarCol(arrayBars[0], FINAL_COLOUR, ANIMATION_SPEED);
    return array;
}

function heapify(array, len, index) {
    let max = index;
    const left = (2 * max) + 1;
    const right = left + 1;

    changeBarCol(arrayBars[max], MAX_COLOR, ANIMATION_SPEED);
    
    if(left < len && array[max] < array[left]) {
        changeBarCol(arrayBars[max], PRIMARY_COLOUR, ANIMATION_SPEED);
        max = left;
        changeBarCol(arrayBars[max], MAX_COLOR, ANIMATION_SPEED);
    }

    if(right < len && array[max] < array[right]) {
        changeBarCol(arrayBars[max], PRIMARY_COLOUR, ANIMATION_SPEED);
        max = right;
        changeBarCol(arrayBars[max], MAX_COLOR, ANIMATION_SPEED);
    }

    if(max !== index) {
        changeBarCol(arrayBars[max], PRIMARY_COLOUR, ANIMATION_SPEED);
        swap(array, index, max);
        swapBarHeight(arrayBars[index], arrayBars[max], ANIMATION_SPEED);
        changeBarCol(arrayBars[max], MAX_COLOR, ANIMATION_SPEED);
        heapify(array, len, max);
    }

    changeBarCol(arrayBars[max], PRIMARY_COLOUR, ANIMATION_SPEED);
}
