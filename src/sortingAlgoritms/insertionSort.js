import {swapBarHeight, changeBarCol, resetDelay} from '../SortingVisualizer/animationHelpers';
export {insertionSortAnimations}

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';
// This is the color the current bar(i position).
const CURRENT_COLOR = 'yellow';
// This is the colour of the current smallest bar.
const SMALLEST_COLOUR = 'red';
// This is the colour of the final position of the bar.
const FINAL_COLOUR = 'green';

const ANIMATION_SPEED = 3;

function insertionSortAnimations (array) {
  const arrayBars = document.getElementsByClassName('array-bar');
  for(let i = 1; i < array.length; i++) {
      let currPos = array[i];
      changeBarCol(arrayBars[i].style, CURRENT_COLOR, ANIMATION_SPEED);
      let j = i - 1;
      while(j >= 0 && currPos < array[j]) {
          changeBarCol(arrayBars[j].style, SMALLEST_COLOUR, ANIMATION_SPEED);
          array[j + 1] = array[j];
          swapBarHeight(arrayBars[j + 1].style, arrayBars[j].style, ANIMATION_SPEED);
          changeBarCol(arrayBars[j].style, PRIMARY_COLOUR, ANIMATION_SPEED);
          j -=1
      }
      array[j + 1] = currPos;
  }
  for(let barIdx = arrayBars.length - 1; barIdx >= 0; barIdx--) {
      changeBarCol(arrayBars[barIdx].style, FINAL_COLOUR, ANIMATION_SPEED);
    }
  resetDelay();
  }