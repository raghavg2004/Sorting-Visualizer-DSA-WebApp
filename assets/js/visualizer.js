// DOM Elements
let arraySizeSlider, arraySizeValue, sortSpeedSlider, sortSpeedValue;
let generateArrayBtn, algorithmButtons, arrayContainer;
let timeWorst, timeAverage, timeBest, spaceWorst;

// State
let array = [];
let arraySize = 30;
let sortSpeed = 3;
let isSorting = false;
let animationSpeed = {
    1: 1000, // Slow
    2: 500,
    3: 200,  // Medium
    4: 50,
    5: 10    // Fast
};

// Initialize Visualizer
export function initVisualizer() {
    cacheDOM();
    bindEvents();
    generateNewArray();
    updateComplexityInfo();
}

function cacheDOM() {
    arraySizeSlider = document.getElementById('arraySize');
    arraySizeValue = document.getElementById('arraySizeValue');
    sortSpeedSlider = document.getElementById('sortSpeed');
    sortSpeedValue = document.getElementById('sortSpeedValue');
    generateArrayBtn = document.getElementById('generateArray');
    algorithmButtons = document.querySelectorAll('.algorithm-btn');
    arrayContainer = document.getElementById('arrayContainer');
    
    timeWorst = document.getElementById('timeWorst');
    timeAverage = document.getElementById('timeAverage');
    timeBest = document.getElementById('timeBest');
    spaceWorst = document.getElementById('spaceWorst');
}

function bindEvents() {
    arraySizeSlider.addEventListener('input', updateArraySize);
    sortSpeedSlider.addEventListener('input', updateSortSpeed);
    generateArrayBtn.addEventListener('click', generateNewArray);
    
    algorithmButtons.forEach(btn => {
        btn.addEventListener('click', startSorting);
    });
}

function updateArraySize() {
    arraySize = parseInt(arraySizeSlider.value);
    arraySizeValue.textContent = arraySize;
    generateNewArray();
}

function updateSortSpeed() {
    sortSpeed = parseInt(sortSpeedSlider.value);
    const speedLabels = ['Very Slow', 'Slow', 'Medium', 'Fast', 'Very Fast'];
    sortSpeedValue.textContent = speedLabels[sortSpeed - 1];
}

function generateNewArray() {
    if (isSorting) return;
    
    array = [];
    arrayContainer.innerHTML = '';
    
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 5);
        
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${array[i]}%`;
        bar.style.width = `${100 / arraySize}%`;
        arrayContainer.appendChild(bar);
    }
}

function startSorting(e) {
    if (isSorting) return;
    
    isSorting = true;
    disableControls();
    
    const algorithm = e.target.dataset.algorithm;
    updateComplexityInfo(algorithm);
    
    // Reset array bars to default color
    const bars = document.querySelectorAll('.array-bar');
    bars.forEach(bar => {
        bar.style.backgroundColor = '';
    });
    
    switch (algorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'insertion':
            insertionSort();
            break;
        case 'merge':
            mergeSort();
            break;
        case 'quick':
            quickSort();
            break;
        case 'heap':
            heapSort();
            break;
    }
}

function disableControls() {
    arraySizeSlider.disabled = true;
    sortSpeedSlider.disabled = true;
    generateArrayBtn.disabled = true;
    algorithmButtons.forEach(btn => {
        btn.disabled = true;
    });
}

function enableControls() {
    arraySizeSlider.disabled = false;
    sortSpeedSlider.disabled = false;
    generateArrayBtn.disabled = false;
    algorithmButtons.forEach(btn => {
        btn.disabled = false;
    });
    isSorting = false;
}

function updateComplexityInfo(algorithm) {
    const complexities = {
        bubble: {
            timeWorst: 'O(n²)',
            timeAverage: 'Θ(n²)',
            timeBest: 'Ω(n)',
            spaceWorst: 'O(1)'
        },
        selection: {
            timeWorst: 'O(n²)',
            timeAverage: 'Θ(n²)',
            timeBest: 'Ω(n²)',
            spaceWorst: 'O(1)'
        },
        insertion: {
            timeWorst: 'O(n²)',
            timeAverage: 'Θ(n²)',
            timeBest: 'Ω(n)',
            spaceWorst: 'O(1)'
        },
        merge: {
            timeWorst: 'O(n log n)',
            timeAverage: 'Θ(n log n)',
            timeBest: 'Ω(n log n)',
            spaceWorst: 'O(n)'
        },
        quick: {
            timeWorst: 'O(n²)',
            timeAverage: 'Θ(n log n)',
            timeBest: 'Ω(n log n)',
            spaceWorst: 'O(log n)'
        },
        heap: {
            timeWorst: 'O(n log n)',
            timeAverage: 'Θ(n log n)',
            timeBest: 'Ω(n log n)',
            spaceWorst: 'O(1)'
        }
    };
    
    if (algorithm) {
        const comp = complexities[algorithm];
        timeWorst.textContent = comp.timeWorst;
        timeAverage.textContent = comp.timeAverage;
        timeBest.textContent = comp.timeBest;
        spaceWorst.textContent = comp.spaceWorst;
    } else {
        timeWorst.textContent = '-';
        timeAverage.textContent = '-';
        timeBest.textContent = '-';
        spaceWorst.textContent = '-';
    }
}

// Utility function for animations
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function highlightBars(index1, index2, color) {
    const bars = document.querySelectorAll('.array-bar');
    bars[index1].style.backgroundColor = color;
    bars[index2].style.backgroundColor = color;
    await sleep(animationSpeed[sortSpeed]);
}

async function resetBarColor(index, color) {
    const bars = document.querySelectorAll('.array-bar');
    bars[index].style.backgroundColor = color;
    await sleep(animationSpeed[sortSpeed]);
}

async function updateBarHeight(index, height) {
    const bars = document.querySelectorAll('.array-bar');
    bars[index].style.height = `${height}%`;
    await sleep(animationSpeed[sortSpeed]);
}

// Sorting Algorithms
async function bubbleSort() {
    const bars = document.querySelectorAll('.array-bar');
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            await highlightBars(j, j + 1, '#e74c3c');
            
            if (array[j] > array[j + 1]) {
                // Swap values
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                
                // Update heights
                await updateBarHeight(j, array[j]);
                await updateBarHeight(j + 1, array[j + 1]);
            }
            
            await resetBarColor(j, '#3498db');
            await resetBarColor(j + 1, '#3498db');
        }
        
        // Mark sorted element
        bars[n - i - 1].style.backgroundColor = '#2ecc71';
    }
    
    // Mark first element as sorted
    bars[0].style.backgroundColor = '#2ecc71';
    enableControls();
}

async function selectionSort() {
    const bars = document.querySelectorAll('.array-bar');
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = '#f39c12';
        
        for (let j = i + 1; j < n; j++) {
            await highlightBars(j, minIndex, '#e74c3c');
            
            if (array[j] < array[minIndex]) {
                await resetBarColor(minIndex, '#3498db');
                minIndex = j;
                bars[minIndex].style.backgroundColor = '#f39c12';
            } else {
                await resetBarColor(j, '#3498db');
            }
        }
        
        if (minIndex !== i) {
            // Swap values
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            
            // Update heights
            await updateBarHeight(i, array[i]);
            await updateBarHeight(minIndex, array[minIndex]);
        }
        
        bars[i].style.backgroundColor = '#2ecc71';
        await resetBarColor(minIndex, '#3498db');
    }
    
    bars[n - 1].style.backgroundColor = '#2ecc71';
    enableControls();
}

async function insertionSort() {
    const bars = document.querySelectorAll('.array-bar');
    const n = array.length;
    
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        
        bars[i].style.backgroundColor = '#f39c12';
        await sleep(animationSpeed[sortSpeed]);
        
        while (j >= 0 && array[j] > key) {
            await highlightBars(j, j + 1, '#e74c3c');
            
            array[j + 1] = array[j];
            await updateBarHeight(j + 1, array[j + 1]);
            
            await resetBarColor(j, '#3498db');
            await resetBarColor(j + 1, '#f39c12');
            
            j--;
        }
        
        array[j + 1] = key;
        await updateBarHeight(j + 1, key);
        await resetBarColor(j + 1, '#3498db');
    }
    
    // Mark all as sorted
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = '#2ecc71';
        await sleep(animationSpeed[sortSpeed] / 2);
    }
    
    enableControls();
}

async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
    
    // Mark all as sorted
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = '#2ecc71';
        await sleep(animationSpeed[sortSpeed] / 2);
    }
    
    enableControls();
}

async function mergeSortHelper(l, r) {
    if (l >= r) return;
    
    const m = l + Math.floor((r - l) / 2);
    
    await mergeSortHelper(l, m);
    await mergeSortHelper(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    const bars = document.querySelectorAll('.array-bar');
    const n1 = m - l + 1;
    const n2 = r - m;
    
    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);
    
    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
        L[i] = array[l + i];
        bars[l + i].style.backgroundColor = '#f39c12';
    }
    for (let j = 0; j < n2; j++) {
        R[j] = array[m + 1 + j];
        bars[m + 1 + j].style.backgroundColor = '#9b59b6';
    }
    
    await sleep(animationSpeed[sortSpeed]);
    
    // Merge the temp arrays
    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        await highlightBars(l + i, m + 1 + j, '#e74c3c');
        
        if (L[i] <= R[j]) {
            array[k] = L[i];
            await updateBarHeight(k, array[k]);
            i++;
        } else {
            array[k] = R[j];
            await updateBarHeight(k, array[k]);
            j++;
        }
        
        await resetBarColor(k, '#3498db');
        k++;
    }
    
    // Copy remaining elements of L[]
    while (i < n1) {
        array[k] = L[i];
        await updateBarHeight(k, array[k]);
        await resetBarColor(k, '#3498db');
        i++;
        k++;
    }
    
    // Copy remaining elements of R[]
    while (j < n2) {
        array[k] = R[j];
        await updateBarHeight(k, array[k]);
        await resetBarColor(k, '#3498db');
        j++;
        k++;
    }
}

async function quickSort() {
    await quickSortHelper(0, array.length - 1);
    
    // Mark all as sorted
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = '#2ecc71';
        await sleep(animationSpeed[sortSpeed] / 2);
    }
    
    enableControls();
}

async function quickSortHelper(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.querySelectorAll('.array-bar');
    const pivot = array[high];
    bars[high].style.backgroundColor = '#f39c12';
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        await highlightBars(j, high, '#e74c3c');
        
        if (array[j] < pivot) {
            i++;
            
            [array[i], array[j]] = [array[j], array[i]];
            await updateBarHeight(i, array[i]);
            await updateBarHeight(j, array[j]);
        }
        
        await resetBarColor(j, '#3498db');
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    await updateBarHeight(i + 1, array[i + 1]);
    await updateBarHeight(high, array[high]);
    
    await resetBarColor(i + 1, '#3498db');
    await resetBarColor(high, '#3498db');
    
    return i + 1;
}

async function heapSort() {
    const n = array.length;
    const bars = document.querySelectorAll('.array-bar');
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        await updateBarHeight(0, array[0]);
        await updateBarHeight(i, array[i]);
        
        bars[i].style.backgroundColor = '#2ecc71';
        
        // call max heapify on the reduced heap
        await heapify(i, 0);
    }
    
    bars[0].style.backgroundColor = '#2ecc71';
    enableControls();
}

async function heapify(n, i) {
    const bars = document.querySelectorAll('.array-bar');
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    
    bars[i].style.backgroundColor = '#f39c12';
    if (l < n) bars[l].style.backgroundColor = '#e74c3c';
    if (r < n) bars[r].style.backgroundColor = '#e74c3c';
    await sleep(animationSpeed[sortSpeed]);
    
    // If left child is larger than root
    if (l < n && array[l] > array[largest]) {
        largest = l;
    }
    
    // If right child is larger than largest so far
    if (r < n && array[r] > array[largest]) {
        largest = r;
    }
    
    // If largest is not root
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        await updateBarHeight(i, array[i]);
        await updateBarHeight(largest, array[largest]);
        
        // Recursively heapify the affected sub-tree
        await heapify(n, largest);
    }
    
    bars[i].style.backgroundColor = '#3498db';
    if (l < n) bars[l].style.backgroundColor = '#3498db';
    if (r < n) bars[r].style.backgroundColor = '#3498db';
}