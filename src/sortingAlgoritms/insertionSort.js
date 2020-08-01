export {
    getInsertionSortAnimations,
  }
  
function getInsertionSortAnimations (array) {
      if (array.length <= 1) return array;
      for(let i = 1; i < array.length; i++) {
        let currPos = array[i];
        let j = i - 1;
        while(j >= 0 && currPos < array[j]) {
          array[j + 1] = array[j];
          j -=1
        }
        array[j + 1] = currPos;
      }
      return array;
  }