import React from 'react';
import './SortingVisualizer.css';

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

    mergeSort() {}
    insertionSort() {}
    selectionSort() {}
    quickSort() {}
    heapSort() {}

    render() {
        const {array} = this.state;
        
        return (
            <div className="Vis-container">
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}%`}} ></div>
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