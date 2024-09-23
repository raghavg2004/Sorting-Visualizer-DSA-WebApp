const networkContainer = document.getElementById("networkContainer");
let array = [];

// Helper function to create random array with network nodes (circles)
function createRandomArray(size = 10) {
    array = [];
    networkContainer.innerHTML = "";
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);

        const node = document.createElement("div");
        node.classList.add("node");
        node.style.left = `${i * 80}px`;  // Position each node with spacing
        node.style.top = `${150 - value}px`;  // Position vertically based on value
        node.textContent = value;
        networkContainer.appendChild(node);
    }
}

// Helper function to update the nodes
function updateNodes() {
    const nodes = document.querySelectorAll(".node");
    array.forEach((value, index) => {
        nodes[index].textContent = value;
        nodes[index].style.top = `${150 - value}px`; // Move based on value
        nodes[index].style.left = `${index * 80}px`;  // Reposition based on index
    });
}

// Delay for animations
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Visualization using Network Flow
async function bubbleSort() {
    const nodes = document.querySelectorAll(".node");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            nodes[j].style.backgroundColor = "red";
            nodes[j + 1].style.backgroundColor = "red";

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                updateNodes();
            }

            await sleep(500);
            nodes[j].style.backgroundColor = "#3498db";
            nodes[j + 1].style.backgroundColor = "#3498db";
        }
    }
}

// Selection Sort Visualization using Network Flow
async function selectionSort() {
    const nodes = document.querySelectorAll(".node");
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        nodes[i].style.backgroundColor = "red";

        for (let j = i + 1; j < array.length; j++) {
            nodes[j].style.backgroundColor = "red";
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            await sleep(500);
            nodes[j].style.backgroundColor = "#3498db";
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            updateNodes();
        }

        nodes[i].style.backgroundColor = "#3498db";
    }
}

// Insertion Sort Visualization using Network Flow
async function insertionSort() {
    const nodes = document.querySelectorAll(".node");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        nodes[i].style.backgroundColor = "red";
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            updateNodes();
            await sleep(500);
        }
        array[j + 1] = key;
        nodes[i].style.backgroundColor = "#3498db";
    }
}

// Merge Sort Visualization using Network Flow
async function mergeSort(arr = array, start = 0, end = arr.length) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid, end);

    let temp = [];
    let i = start, j = mid;
    while (i < mid && j < end) {
        if (arr[i] < arr[j]) {
            temp.push(arr[i++]);
        } else {
            temp.push(arr[j++]);
        }
    }
    while (i < mid) temp.push(arr[i++]);
    while (j < end) temp.push(arr[j++]);

    for (i = start; i < end; i++) {
        arr[i] = temp[i - start];
        updateNodes();
        await sleep(500);
    }
}

// Quick Sort Visualization using Network Flow
async function quickSort(arr = array, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    const nodes = document.querySelectorAll(".node");

    for (let j = low; j < high; j++) {
        nodes[j].style.backgroundColor = "red";
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            updateNodes();
        }
        await sleep(500);
        nodes[j].style.backgroundColor = "#3498db";
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    updateNodes();
    return i + 1;
}

// Heap Sort Visualization using Network Flow
async function heapSort() {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        await heapify(array.length, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        updateNodes();
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    const nodes = document.querySelectorAll(".node");

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
        nodes[i].style.backgroundColor = "red";
        nodes[largest].style.backgroundColor = "red";

        [array[i], array[largest]] = [array[largest], array[i]];
        updateNodes();

        await sleep(500);
        nodes[i].style.backgroundColor = "#3498db";
        nodes[largest].style.backgroundColor = "#3498db";

        await heapify(n, largest);
    }
}

// Event listeners for buttons
document.getElementById("bubbleSortButton").addEventListener("click", bubbleSort);
document.getElementById("selectionSortButton").addEventListener("click", selectionSort);
document.getElementById("insertionSortButton").addEventListener("click", insertionSort);
document.getElementById("mergeSortButton").addEventListener("click", () => mergeSort());
document.getElementById("quickSortButton").addEventListener("click", () => quickSort());
document.getElementById("heapSortButton").addEventListener("click", heapSort);

// Create a random array when the page loads
createRandomArray();
