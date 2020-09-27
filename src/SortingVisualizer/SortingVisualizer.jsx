import React from 'react';
import {resetDelay, makeGraphGreen} from './animationHelpers';
import {getMergeSortAnimations,} from '../sortingAlgoritms/mergeSort';
import {selectionSortAnimations,} from '../sortingAlgoritms/selectionSort';
import {insertionSortAnimations,} from '../sortingAlgoritms/insertionSort';
import {quickSortAnimations} from '../sortingAlgoritms/quickSort';
import {heapSortAnimations} from '../sortingAlgoritms/heapSort';
import './SortingVisualizer.css';

// This is the main color of the array bars.
const PRIMARY_COLOUR = 'darkblue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// Global variables used to organise the setTimeouts.
const ANIMATION_SPEED_MS = 3;

const arrayBars = document.getElementsByClassName('array-bar');

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

    genArray() {
        for(let gens = randomIntBetween(2, 5); gens < 6; gens++) {
            this.resetArray();
        }
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 100; i++) {
            array.push(randomIntBetween(1,100));
        }
        this.setState({array});
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
        console.log(this.state.array);
        console.log(arrayBars);
      }
    
    insertionSort() {
        insertionSortAnimations(this.state.array);
        makeGraphGreen();
        resetDelay();
    }

    selectionSort() {
        selectionSortAnimations(this.state.array, arrayBars);
        resetDelay();
    }
    quickSort() {
        quickSortAnimations(this.state.array, 0, this.state.array.length - 1);
        makeGraphGreen();
        resetDelay();
    }
    heapSort() {
        heapSortAnimations(this.state.array);
        resetDelay();
    }

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
        const ourSortedArray = heapSortAnimations(array.slice(), 0, array.length - 1);
        const equal = arraysAreEqual(javaScriptSortedArray, ourSortedArray);
        console.log(equal);
        // if(equal === true) {
        //     console.log(equal);
        //     }
        // else {
        //     console.log(javaScriptSortedArray, ourSortedArray);
        // }
        }
    }

    render() {
        const {array} = this.state;
        
        return (
            <div className="Vis-container">
                <div className="button-container">
                    <button className="button" onClick={() => this.genArray()}>Generate New Array</button>
                    <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button className="button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value * 0.99}%`}} ></div>
                    ))}
                </div>
                {/* <div className="error-warning">
                    <h3>There is currently a bug when generating a new array so press the button twice and it will work.</h3>
                </div> */}
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

function checkBars() {
    for(let barIdx = 0; barIdx < arrayBars.length; barIdx++) {
        console.log(arrayBars[barIdx].style.height);
    }
}