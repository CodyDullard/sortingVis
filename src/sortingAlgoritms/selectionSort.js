import {swap} from './swap.js';
export {getSelectionSortAnimations}
  
function getSelectionSortAnimations (array) {
      for(let i = 0; i < array.length; i++) {
        let minIdx = i
        for(let j = i + 1; j < array.length; j++) {
            if(array[minIdx] > array[j]) {
                minIdx = j;
            }
        }
        swap(array, i, minIdx);
      }
      return array;
  }