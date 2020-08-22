import {swapBarHeight, changeBarCol} from '../SortingVisualizer/animationHelpers';
import {swap} from './swap';
export {heapSortAnimations}

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';
// This is the color the current bar(i position).
const CURRENT_COLOR = 'yellow';
// This is the colour of the current smallest bar.
const SMALLEST_COLOUR = 'red';

const ANIMATION_SPEED = 1;

function heapify(array, len, index) {
    let max = index;
    const left = (2 * max) + 1;
    const right = left + 1;
    
    if(left < len && array[max] < array[left]) {
        max = left;
    }

    if(right < len && array[max] < array[right]) {
        max = right;
    }

    if(max !== index) {
        swap(array, index, max);
        heapify(array, len, max);
    }
}

function heapSortAnimations (array) {
    const len = array.length;

    for(let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(array, len, i);
    }

    for(let j = len - 1; j >= 0; j--) {
        swap(array, j, 0);
        heapify(array, j, 0);
    }
    return array;
}
