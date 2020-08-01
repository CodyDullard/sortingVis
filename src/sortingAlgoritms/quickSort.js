export {getQuickSortAnimations}
  

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    const pivot = items[Math.floor((right + left) / 2)]; //middle element
    let i = left;
    let j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}
function getQuickSortAnimations(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            getQuickSortAnimations(items, left, index - 1);
        }
        if (index < right) {
            getQuickSortAnimations(items, index, right);
        }
    }
    return items;
}