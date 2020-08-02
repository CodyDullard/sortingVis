import {swap} from './swap.js';
export {getQuickSortAnimations}

function partition(array, left, right) {
    const pivot = array[Math.floor((right + left) / 2)]; //middle element
    let i = left;
    let j = right;
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}
function getQuickSortAnimations(array, left, right) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right);
        if (left < index - 1) {
            getQuickSortAnimations(array, left, index - 1);
        }
        if (index < right) {
            getQuickSortAnimations(array, index, right);
        }
    }
    return array;
}