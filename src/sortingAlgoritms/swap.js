export {swap}

function swap(array, leftIndex, rightIndex){
    const swp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = swp;
}