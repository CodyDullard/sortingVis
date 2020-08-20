import {swapBarHeight, changeBarCol} from '../SortingVisualizer/animationHelpers';
export {insertionSortAnimations}

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';
// This is the color the current bar(i position).
const CURRENT_COLOR = 'yellow';
// This is the colour of the current smallest bar.
const SMALLEST_COLOUR = 'red';

const ANIMATION_SPEED = 1;

function insertionSortAnimations (array) {
  const arrayBars = document.getElementsByClassName('array-bar');
  for(let i = 1; i < array.length; i++) {
      let currPos = array[i];
      changeBarCol(arrayBars[i], CURRENT_COLOR, ANIMATION_SPEED);
      let j = i - 1;
      while(j >= 0 && currPos < array[j]) {
          changeBarCol(arrayBars[j], SMALLEST_COLOUR, ANIMATION_SPEED);
          array[j + 1] = array[j];
          swapBarHeight(arrayBars[j + 1], arrayBars[j], ANIMATION_SPEED);
          changeBarCol(arrayBars[j], PRIMARY_COLOUR, ANIMATION_SPEED);
          j -=1
      }
      array[j + 1] = currPos;
    }
  }