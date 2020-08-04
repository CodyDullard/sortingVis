import React from 'react';
import {getMergeSortAnimations,} from '../sortingAlgoritms/mergeSort';
import {getInsertionSortAnimations} from '../sortingAlgoritms/insertionSort';
import {getSelectionSortAnimations} from '../sortingAlgoritms/selectionSort';
import {getQuickSortAnimations} from '../sortingAlgoritms/quickSort';
import {swap} from '../sortingAlgoritms/swap';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 200; i++) {
            array.push(randomIntBetween(1,100));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight * 0.99}%`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    
    insertionSort() {
        const arrayBars = document.getElementsByClassName('array-bar');
        const arr = this.state.array;
        if (arr.length <= 1) return arr;
        for(let i = 1; i < arr.length; i++) {
            let currPos = arr[i];
            let j = i - 1;
            while(j >= 0 && currPos < arr[j]) {
                const barOneStyle = arrayBars[j].style;
                const barTwoStyle = arrayBars[j + 1].style;
                const tmpHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tmpHeight;
                arr[j + 1] = arr[j];
                j -=1
            }
            const barTwoStyle = arrayBars[j + 1].style;
            barTwoStyle.height = currPos;
            arr[j + 1] = currPos;
        }
        return arr;

            // setTimeout(() => {
            //     const barOneStyle = arrayBars[i].style;
            //     barOneStyle.backgroundColor = "blue";
            // }, i * ANIMATION_SPEED_MS);

            // setTimeout(() => {
            //     const barOneStyle = arrayBars[i].style;
            //     barOneStyle.backgroundColor = "blue";
            // }, i * ANIMATION_SPEED_MS);
            // setTimeout(() => {
            //     barOneStyle.backgroundColor = "black";
            //     barTwoStyle.backgroundColor = "black";
            // })
        //     setTimeout(() => {
        //         const barOneStyle = arrayBars[i].style;
        //         barOneStyle.backgroundColor = "yellow";
        //     setTimeout(() => {
        //         while(j >= 0 && currPos < arr[j]) {
        //             const swapBarStyle = arrayBars[j + 1].style;
        //             const barTwoStyle = arrayBars[j].style;
        //             swapBarStyle.backgroundColor = "red";
        //             barTwoStyle.backgroundColor = "red";
        //             arr[j + 1] = arr[j];
        //             const tmpHeight = barTwoStyle.height;
        //             barTwoStyle.height = swapBarStyle.height;
        //             swapBarStyle.height = tmpHeight;
        //             j -=1
        //         }
        //         arr[j + 1] = currPos;
        //     }, i * ANIMATION_SPEED_MS);
        // }, i * ANIMATION_SPEED_MS);
        }
    selectionSort() {
        let arrayBars = document.getElementsByClassName('array-bar');
        console.log(this.state.array);
        console.log(arrayBars);
        for(let i = 0; i < this.state.array.length; i++) {
            let minIdx = i
            setTimeout(() => {
                arrayBars[minIdx].style.backgroundColor = "red";
            } ,i * 100);
            for(let j = i + 1; j < this.state.array.length; j++) {
                if(this.state.array[minIdx] > this.state.array[j]) {
                    const barOneStyle = arrayBars[minIdx].style;
                    const barTwoStyle = arrayBars[j].style;
                    if(minIdx != i) {
                        changeBarCol(barOneStyle, "dark blue", i);
                    } 
                    changeBarCol(barTwoStyle, "red", i);
                    minIdx = j;
                }
                else {
                    changeBarCol(arrayBars[j], "dark blue", i);
                }
            }
            if(minIdx != i) {
                setTimeout(() => {
                    const minIdxBarStyle = arrayBars[minIdx].style;
                    const origionalBarStyle = arrayBars[i].style;
                    swapBars(minIdxBarStyle, origionalBarStyle);
                    changeBarCol(minIdxBarStyle, "dark blue", i);
                    changeBarCol(origionalBarStyle, "dark blue", i);
                } ,i * 100);}
            swap(this.state.array, i, minIdx);
          }
          return this.state.array;
    }
    quickSort() {
        this.testSortingAlgorithms(this.state.array.slice())
    }
    heapSort() {}

    // NOTE: This method will only work if your sorting algorithms actually return
    // the sorted arrays; if they return the animations (as they currently do), then
    // this method will be broken.
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
        const array = [];
        const length = randomIntBetween(1, 1000);
        for (let i = 0; i < length; i++) {
            array.push(randomIntBetween(-1000, 1000));
        }
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const mergeSortedArray = this.selectionSort(array.slice(), 0, array.length - 1);
        console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;
        
        return (
            <div className="Vis-container">
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value * 0.99}%`}} ></div>
                    ))}
                </div>
                <div className="button-container">
                    <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button className="button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
                </div>
            </div>
        );
    }
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function swapBars(barOneStyle, barTwoStyle) {
    let tmpHeight = barOneStyle.height;
    barOneStyle.height = barTwoStyle.height;
    barTwoStyle.height = tmpHeight;
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }

function changeBarCol(barStyle, col, i) {
    setTimeout(() => {
        barStyle.backgroundColor = col;
    } , i * ANIMATION_SPEED_MS);
}