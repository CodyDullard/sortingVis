export {
    getSelectionSortAnimations,
  }
  
function getSelectionSortAnimations (array) {
      if (array.length <= 1) return array;
      for(let i = 0; i < array.length; i++) {
        let minIdx = i
        for(let j = i + 1; j < array.length; j++) {
            if(array[minIdx] > array[j]) {
                minIdx = j;
            }
        }
        const swapVal = array[i];
        array[i] = array[minIdx];
        array[minIdx] = swapVal;
      }
      return array;
  }