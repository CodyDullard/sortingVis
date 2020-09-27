import {swap} from './swap.js';
import {swapBarHeight, changeBarCol} from '../SortingVisualizer/animationHelpers';
export {selectionSortAnimations}

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';
// This is the color the current bar(i position).
const CURRENT_COLOR = 'yellow';
// This is the colour of the current smallest bar.
const SMALLEST_COLOUR = 'red';
// This is the colour of the final position of the bar.
const FINAL_COLOUR = 'green';

const ANIMATION_SPEED = 5;

const arrayBars = document.getElementsByClassName('array-bar');

function selectionSortAnimations (array) {
    for(let i = 0; i < array.length; i++) {
        let minIdx = i
        changeBarCol(arrayBars[minIdx], CURRENT_COLOR, ANIMATION_SPEED);
        for(let j = i + 1; j < array.length; j++) {
            if(array[minIdx] > array[j]) {
                if(minIdx !== i) {
                    changeBarCol(arrayBars[minIdx], PRIMARY_COLOUR, ANIMATION_SPEED);
                }
                minIdx = j;
                changeBarCol(arrayBars[minIdx], SMALLEST_COLOUR, ANIMATION_SPEED);
            }
        }
        swap(array, i, minIdx);
        const barOneStyle = arrayBars[i];
        const barTwoStyle = arrayBars[minIdx];
        swapBarHeight(barOneStyle, barTwoStyle, ANIMATION_SPEED);
        changeBarCol(arrayBars[minIdx], PRIMARY_COLOUR, ANIMATION_SPEED);
        changeBarCol(arrayBars[i], FINAL_COLOUR, ANIMATION_SPEED);
      }
  }