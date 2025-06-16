// DOM Elements
let networkSizeSlider, networkSizeValue;
let generateNetworkBtn, algorithmButtons, networkContainer;

// State
let nodes = [];
let nodeCount = 10;
let isSorting = false;

// Initialize Network Flow Visualizer
export function initNetworkFlow() {
    cacheDOM();
    bindEvents();
    createNetwork();
}

function cacheDOM() {
    networkSizeSlider = document.getElementById('networkSize');
    networkSizeValue = document.getElementById('networkSizeValue');
    generateNetworkBtn = document.getElementById('generateNetwork');
    algorithmButtons = document.querySelectorAll('.algorithm-btn');
    networkContainer = document.getElementById('networkContainer');
}

function bindEvents() {
    networkSizeSlider.addEventListener('input', updateNetworkSize);
    generateNetworkBtn.addEventListener('click', createNetwork);
    
    algorithmButtons.forEach(btn => {
        btn.addEventListener('click', startNetworkSort);
    });
}

function updateNetworkSize() {
    nodeCount = parseInt(networkSizeSlider.value);
    networkSizeValue.textContent = nodeCount;
    createNetwork();
}

function createNetwork() {
    if (isSorting) return;
    
    nodes = [];
    networkContainer.innerHTML = '';
    
    // Create nodes with random values
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(Math.floor(Math.random() * 100) + 5);
        
        const node = document.createElement('div');
        node.className = 'network-node';
        node.textContent = nodes[i];
        
        // Position nodes in a circular layout
        const angle = (i / nodeCount) * 2 * Math.PI;
        const radius = 150;
        const centerX = networkContainer.offsetWidth / 2;
        const centerY = networkContainer.offsetHeight / 2;
        
        node.style.left = `${centerX + radius * Math.cos(angle) - 25}px`;
        node.style.top = `${centerY + radius * Math.sin(angle) - 25}px`;
        
        networkContainer.appendChild(node);
    }
}

function startNetworkSort(e) {
    if (isSorting) return;
    
    isSorting = true;
    disableControls();
    
    const algorithm = e.target.dataset.algorithm;
    
    // Reset node colors
    const nodeElements = document.querySelectorAll('.network-node');
    nodeElements.forEach(node => {
        node.style.backgroundColor = '#3498db';
    });
    
    switch (algorithm) {
        case 'bubble':
            bubbleSortNetwork();
            break;
        case 'selection':
            selectionSortNetwork();
            break;
        case 'insertion':
            insertionSortNetwork();
            break;
        case 'merge':
            mergeSortNetwork();
            break;
        case 'quick':
            quickSortNetwork();
            break;
        case 'heap':
            heapSortNetwork();
            break;
    }
}

function disableControls() {
    networkSizeSlider.disabled = true;
    generateNetworkBtn.disabled = true;
    algorithmButtons.forEach(btn => {
        btn.disabled = true;
    });
}

function enableControls() {
    networkSizeSlider.disabled = false;
    generateNetworkBtn.disabled = false;
    algorithmButtons.forEach(btn => {
        btn.disabled = false;
    });
    isSorting = false;
}

// Utility functions for network visualization
async function highlightNodes(index1, index2, color) {
    const nodeElements = document.querySelectorAll('.network-node');
    nodeElements[index1].style.backgroundColor = color;
    nodeElements[index2].style.backgroundColor = color;
    await sleep(300);
}

async function resetNodeColor(index, color) {
    const nodeElements = document.querySelectorAll('.network-node');
    nodeElements[index].style.backgroundColor = color;
    await sleep(300);
}

async function updateNodeValue(index, value) {
    const nodeElements = document.querySelectorAll('.network-node');
    nodeElements[index].textContent = value;
    await sleep(300);
}

async function moveNode(index, x, y) {
    const nodeElements = document.querySelectorAll('.network-node');
    nodeElements[index].style.left = `${x}px`;
    nodeElements[index].style.top = `${y}px`;
    await sleep(300);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Network Sorting Algorithms
async function bubbleSortNetwork() {
    const nodeElements = document.querySelectorAll('.network-node');
    const n = nodes.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            await highlightNodes(j, j + 1, '#e74c3c');
            
            if (nodes[j] > nodes[j + 1]) {
                // Swap values
                [nodes[j], nodes[j + 1]] = [nodes[j + 1], nodes[j]];
                
                // Update node values
                await updateNodeValue(j, nodes[j]);
                await updateNodeValue(j + 1, nodes[j + 1]);
                
                // Animate swap movement
                const tempX = nodeElements[j].style.left;
                const tempY = nodeElements[j].style.top;
                
                await moveNode(j, 
                    parseInt(nodeElements[j + 1].style.left),
                    parseInt(nodeElements[j + 1].style.top)
                );
                
                await moveNode(j + 1, 
                    parseInt(tempX),
                    parseInt(tempY)
                );
                
                // Swap DOM elements
                networkContainer.insertBefore(nodeElements[j + 1], nodeElements[j]);
            }
            
            await resetNodeColor(j, '#3498db');
            await resetNodeColor(j + 1, '#3498db');
        }
        
        // Mark sorted node
        nodeElements[n - i - 1].style.backgroundColor = '#2ecc71';
    }
    
    // Mark first node as sorted
    nodeElements[0].style.backgroundColor = '#2ecc71';
    enableControls();
}

async function selectionSortNetwork() {
    const nodeElements = document.querySelectorAll('.network-node');
    const n = nodes.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        nodeElements[minIndex].style.backgroundColor = '#f39c12';
        
        for (let j = i + 1; j < n; j++) {
            await highlightNodes(j, minIndex, '#e74c3c');
            
            if (nodes[j] < nodes[minIndex]) {
                await resetNodeColor(minIndex, '#3498db');
                minIndex = j;
                nodeElements[minIndex].style.backgroundColor = '#f39c12';
            } else {
                await resetNodeColor(j, '#3498db');
            }
        }
        
        if (minIndex !== i) {
            // Swap values
            [nodes[i], nodes[minIndex]] = [nodes[minIndex], nodes[i]];
            
            // Update node values
            await updateNodeValue(i, nodes[i]);
            await updateNodeValue(minIndex, nodes[minIndex]);
            
            // Animate swap movement
            const tempX = nodeElements[i].style.left;
            const tempY = nodeElements[i].style.top;
            
            await moveNode(i, 
                parseInt(nodeElements[minIndex].style.left),
                parseInt(nodeElements[minIndex].style.top)
            );
            
            await moveNode(minIndex, 
                parseInt(tempX),
                parseInt(tempY)
            );
            
            // Swap DOM elements
            networkContainer.insertBefore(nodeElements[minIndex], nodeElements[i]);
        }
        
        nodeElements[i].style.backgroundColor = '#2ecc71';
        await resetNodeColor(minIndex, '#3498db');
    }
    
    nodeElements[n - 1].style.backgroundColor = '#2ecc71';
    enableControls();
}

async function insertionSortNetwork() {
    const nodeElements = document.querySelectorAll('.network-node');
    const n = nodes.length;
    
    for (let i = 1; i < n; i++) {
        let key = nodes[i];
        let j = i - 1;
        
        nodeElements[i].style.backgroundColor = '#f39c12';
        await sleep(300);
        
        while (j >= 0 && nodes[j] > key) {
            await highlightNodes(j, j + 1, '#e74c3c');
            
            nodes[j + 1] = nodes[j];
            await updateNodeValue(j + 1, nodes[j + 1]);
            
            // Animate movement
            await moveNode(j + 1, 
                parseInt(nodeElements[j].style.left),
                parseInt(nodeElements[j].style.top)
            );
            
            await resetNodeColor(j, '#3498db');
            await resetNodeColor(j + 1, '#f39c12');
            
            j--;
        }
        
        nodes[j + 1] = key;
        await updateNodeValue(j + 1, key);
        await resetNodeColor(j + 1, '#3498db');
    }
    
    // Mark all as sorted
    for (let i = 0; i < n; i++) {
        nodeElements[i].style.backgroundColor = '#2ecc71';
        await sleep(150);
    }
    
    enableControls();
}

async function mergeSortNetwork() {
    await mergeSortNetworkHelper(0, nodes.length - 1);
    
    // Mark all as sorted
    const nodeElements = document.querySelectorAll('.network-node');
    for (let i = 0; i < nodeElements.length; i++) {
        nodeElements[i].style.backgroundColor = '#2ecc71';
        await sleep(150);
    }
    
    enableControls();
}

async function mergeSortNetworkHelper(l, r) {
    if (l >= r) return;
    
    const m = l + Math.floor((r - l) / 2);
    
    await mergeSortNetworkHelper(l, m);
    await mergeSortNetworkHelper(m + 1, r);
    await mergeNetwork(l, m, r);
}

async function mergeNetwork(l, m, r) {
    const nodeElements = document.querySelectorAll('.network-node');
    const n1 = m - l + 1;
    const n2 = r - m;
    
    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);
    
    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
        L[i] = nodes[l + i];
        nodeElements[l + i].style.backgroundColor = '#f39c12';
    }
    for (let j = 0; j < n2; j++) {
        R[j] = nodes[m + 1 + j];
        nodeElements[m + 1 + j].style.backgroundColor = '#9b59b6';
    }
    
    await sleep(300);
    
    // Merge the temp arrays
    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        await highlightNodes(l + i, m + 1 + j, '#e74c3c');
        
        if (L[i] <= R[j]) {
            nodes[k] = L[i];
            await updateNodeValue(k, nodes[k]);
            i++;
        } else {
            nodes[k] = R[j];
            await updateNodeValue(k, nodes[k]);
            j++;
        }
        
        await resetNodeColor(k, '#3498db');
        k++;
    }
    
    // Copy remaining elements of L[]
    while (i < n1) {
        nodes[k] = L[i];
        await updateNodeValue(k, nodes[k]);
        await resetNodeColor(k, '#3498db');
        i++;
        k++;
    }
    
    // Copy remaining elements of R[]
    while (j < n2) {
        nodes[k] = R[j];
        await updateNodeValue(k, nodes[k]);
        await resetNodeColor(k, '#3498db');
        j++;
        k++;
    }
}

async function quickSortNetwork() {
    await quickSortNetworkHelper(0, nodes.length - 1);
    
    // Mark all as sorted
    const nodeElements = document.querySelectorAll('.network-node');
    for (let i = 0; i < nodeElements.length; i++) {
        nodeElements[i].style.backgroundColor = '#2ecc71';
        await sleep(150);
    }
    
    enableControls();
}

async function quickSortNetworkHelper(low, high) {
    if (low < high) {
        const pi = await partitionNetwork(low, high);
        
        await quickSortNetworkHelper(low, pi - 1);
        await quickSortNetworkHelper(pi + 1, high);
    }
}

async function partitionNetwork(low, high) {
    const nodeElements = document.querySelectorAll('.network-node');
    const pivot = nodes[high];
    nodeElements[high].style.backgroundColor = '#f39c12';
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        await highlightNodes(j, high, '#e74c3c');
        
        if (nodes[j] < pivot) {
            i++;
            
            [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
            await updateNodeValue(i, nodes[i]);
            await updateNodeValue(j, nodes[j]);
            
            // Animate swap movement
            const tempX = nodeElements[i].style.left;
            const tempY = nodeElements[i].style.top;
            
            await moveNode(i, 
                parseInt(nodeElements[j].style.left),
                parseInt(nodeElements[j].style.top)
            );
            
            await moveNode(j, 
                parseInt(tempX),
                parseInt(tempY)
            );
            
            // Swap DOM elements
            networkContainer.insertBefore(nodeElements[j], nodeElements[i]);
        }
        
        await resetNodeColor(j, '#3498db');
    }
    
    [nodes[i + 1], nodes[high]] = [nodes[high], nodes[i + 1]];
    await updateNodeValue(i + 1, nodes[i + 1]);
    await updateNodeValue(high, nodes[high]);
    
    // Animate swap movement for pivot
    const tempX = nodeElements[i + 1].style.left;
    const tempY = nodeElements[i + 1].style.top;
    
    await moveNode(i + 1, 
        parseInt(nodeElements[high].style.left),
        parseInt(nodeElements[high].style.top)
    );
    
    await moveNode(high, 
        parseInt(tempX),
        parseInt(tempY)
    );
    
    // Swap DOM elements
    networkContainer.insertBefore(nodeElements[high], nodeElements[i + 1]);
    
    await resetNodeColor(i + 1, '#3498db');
    await resetNodeColor(high, '#3498db');
    
    return i + 1;
}

async function heapSortNetwork() {
    const n = nodes.length;
    const nodeElements = document.querySelectorAll('.network-node');
    
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapifyNetwork(n, i);
    }
    
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [nodes[0], nodes[i]] = [nodes[i], nodes[0]];
        await updateNodeValue(0, nodes[0]);
        await updateNodeValue(i, nodes[i]);
        
        // Animate swap movement
        const tempX = nodeElements[0].style.left;
        const tempY = nodeElements[0].style.top;
        
        await moveNode(0, 
            parseInt(nodeElements[i].style.left),
            parseInt(nodeElements[i].style.top)
        );
        
        await moveNode(i, 
            parseInt(tempX),
            parseInt(tempY)
        );
        
        // Swap DOM elements
        networkContainer.insertBefore(nodeElements[i], nodeElements[0]);
        
        nodeElements[i].style.backgroundColor = '#2ecc71';
        
        // call max heapify on the reduced heap
        await heapifyNetwork(i, 0);
    }
    
    nodeElements[0].style.backgroundColor = '#2ecc71';
    enableControls();
}

async function heapifyNetwork(n, i) {
    const nodeElements = document.querySelectorAll('.network-node');
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    
    nodeElements[i].style.backgroundColor = '#f39c12';
    if (l < n) nodeElements[l].style.backgroundColor = '#e74c3c';
    if (r < n) nodeElements[r].style.backgroundColor = '#e74c3c';
    await sleep(300);
    
    // If left child is larger than root
    if (l < n && nodes[l] > nodes[largest]) {
        largest = l;
    }
    
    // If right child is larger than largest so far
    if (r < n && nodes[r] > nodes[largest]) {
        largest = r;
    }
    
    // If largest is not root
    if (largest !== i) {
        [nodes[i], nodes[largest]] = [nodes[largest], nodes[i]];
        await updateNodeValue(i, nodes[i]);
        await updateNodeValue(largest, nodes[largest]);
        
        // Animate swap movement
        const tempX = nodeElements[i].style.left;
        const tempY = nodeElements[i].style.top;
        
        await moveNode(i, 
            parseInt(nodeElements[largest].style.left),
            parseInt(nodeElements[largest].style.top)
        );
        
        await moveNode(largest, 
            parseInt(tempX),
            parseInt(tempY)
        );
        
        // Swap DOM elements
        networkContainer.insertBefore(nodeElements[largest], nodeElements[i]);
        
        // Recursively heapify the affected sub-tree
        await heapifyNetwork(n, largest);
    }
    
    nodeElements[i].style.backgroundColor = '#3498db';
    if (l < n) nodeElements[l].style.backgroundColor = '#3498db';
    if (r < n) nodeElements[r].style.backgroundColor = '#3498db';
}