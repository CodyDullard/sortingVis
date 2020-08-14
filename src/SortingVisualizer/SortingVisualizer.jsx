import React from 'react';
import {getMergeSortAnimations,} from '../sortingAlgoritms/mergeSort';
import {insertionSortAnimations} from '../sortingAlgoritms/insertionSort';
import {selectionSortAnimations} from '../sortingAlgoritms/selectionSort';
import {quickSortAnimations} from '../sortingAlgoritms/quickSort';
import {swap} from '../sortingAlgoritms/swap';
import './SortingVisualizer.css';

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const ANIMATION_SPEED_MS = 3;
var DELAY = 0;

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
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let j = 0; j < arrayBars.length;j++) {
            arrayBars[j].style.backgroundColor = "darkblue";
        }

    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOUR;
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
        const array = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 1; i < array.length; i++) {
            let currPos = array[i];
            changeBarCol(arrayBars[i].style, SECONDARY_COLOR);
            let j = i - 1;
            while(j >= 0 && currPos < array[j]) {
                changeBarCol(arrayBars[j].style, SECONDARY_COLOR)
                array[j + 1] = array[j];
                swapBarHeight(arrayBars[j + 1].style, arrayBars[j].style);
                changeBarCol(arrayBars[j].style, PRIMARY_COLOUR)
                j -=1
            }
            array[j + 1] = currPos;
        }
        for(let barIdx = 0; barIdx < arrayBars.length; barIdx++) {
            changeBarCol(arrayBars[barIdx].style, "green");
        }
        DELAY = 0;
    }

    selectionSort() {
        const array = this.state.array;
        for(let i = 0; i < array.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            let minIdx = i
            changeBarCol(arrayBars[minIdx].style, SECONDARY_COLOR);
            for(let j = i + 1; j < array.length; j++) {
                if(array[minIdx] > array[j]) {
                    changeBarCol(arrayBars[minIdx].style, SECONDARY_COLOR);
                    minIdx = j;
                    changeBarCol(arrayBars[minIdx].style, PRIMARY_COLOUR);
                }
            }
            swap(array, i, minIdx);
            const barOneStyle = arrayBars[i].style;
            const barTwoStyle = arrayBars[minIdx].style;
            swapBarHeight(barOneStyle, barTwoStyle);
            changeBarCol(arrayBars[minIdx].style, PRIMARY_COLOUR);
            changeBarCol(arrayBars[i].style, "green");
          }
          DELAY = 0;
    }
    quickSort() {
        this.testSortingAlgorithms()
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
        const mergeSortedArray = this.selectionSort();
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

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
}

function swapBarHeight(barOne, barTwo) {
    setTimeout(() => {
        const tmpHeight = barOne.height;
        barOne.height = barTwo.height;
        barTwo.height = tmpHeight;
      }, DELAY += ANIMATION_SPEED_MS);
}

function changeBarCol(bar, col) {
    setTimeout(() => {
        bar.backgroundColor = col;
      }, DELAY += ANIMATION_SPEED_MS);
}