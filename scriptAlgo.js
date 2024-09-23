// JavaScript for sorting algorithm tab navigation
document.addEventListener("DOMContentLoaded", () => {
    const algorithmButtons = document.querySelectorAll('.algorithm-button');
    const languageButtons = document.querySelectorAll('.language-button');
    const codeContainer = document.getElementById('codeContainer');

    let selectedAlgorithm = "bubble-sort";  // default algorithm
    let selectedLanguage = "JavaScript";    // default language

    const updateCodeDisplay = () => {
        if (algorithms[selectedAlgorithm] && algorithms[selectedAlgorithm][selectedLanguage]) {
            codeContainer.textContent = algorithms[selectedAlgorithm][selectedLanguage];
        } else {
            codeContainer.textContent = "Code not available for this combination.";
        }
    };

    // Event listeners for algorithm buttons
    algorithmButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedAlgorithm = button.dataset.algorithm;
            updateCodeDisplay();  // Update the code when an algorithm is selected
        });
    });

    // Event listeners for language buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedLanguage = button.dataset.language;
            updateCodeDisplay();  // Update the code when a language is selected
        });
    });

    const algorithms = {
        "bubble-sort": {
            "C": `#include <stdio.h>\n\nvoid bubbleSort(int arr[], int n) {\n    int i, j;\n    for (i = 0; i < n-1; i++)\n        for (j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n}`,
            "C++": `#include <iostream>\nusing namespace std;\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1])\n                swap(arr[j], arr[j+1]);\n}`,
            "Java": `class BubbleSort {\n    void bubbleSort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++)\n            for (int j = 0; j < n-i-1; j++)\n                if (arr[j] > arr[j+1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j+1];\n                    arr[j+1] = temp;\n                }\n    }\n}`,
            "Python": `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        for j in range(n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]`,
            "JavaScript": `function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n-1; i++) {\n        for (let j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                let temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n        }\n    }\n}`
        },
        "selection-sort": {
            "C": `#include <stdio.h>\n\nvoid selectionSort(int arr[], int n) {\n    int i, j, minIndex;\n    for (i = 0; i < n-1; i++) {\n        minIndex = i;\n        for (j = i + 1; j < n; j++)\n            if (arr[j] < arr[minIndex])\n                minIndex = j;\n        int temp = arr[minIndex];\n        arr[minIndex] = arr[i];\n        arr[i] = temp;\n    }\n}`,
            "C++": `#include <iostream>\nusing namespace std;\n\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int minIndex = i;\n        for (int j = i + 1; j < n; j++)\n            if (arr[j] < arr[minIndex])\n                minIndex = j;\n        swap(arr[minIndex], arr[i]);\n    }\n}`,
            "Java": `class SelectionSort {\n    void selectionSort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            int minIndex = i;\n            for (int j = i + 1; j < n; j++)\n                if (arr[j] < arr[minIndex])\n                    minIndex = j;\n            int temp = arr[minIndex];\n            arr[minIndex] = arr[i];\n            arr[i] = temp;\n        }\n    }\n}`,
            "Python": `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        min_index = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_index]:\n                min_index = j\n        arr[i], arr[min_index] = arr[min_index], arr[i]`,
            "JavaScript": `function selectionSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        let minIndex = i;\n        for (let j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIndex]) {\n                minIndex = j;\n            }\n        }\n        let temp = arr[minIndex];\n        arr[minIndex] = arr[i];\n        arr[i] = temp;\n    }\n}`
        },
        "insertion-sort": {
            "C": `#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n    int i, key, j;\n    for (i = 1; i < n; i++) {\n        key = arr[i];\n        j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
            "C++": `#include <iostream>\nusing namespace std;\n\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
            "Java": `class InsertionSort {\n    void insertionSort(int arr[]) {\n        int n = arr.length;\n        for (int i = 1; i < n; i++) {\n            int key = arr[i];\n            int j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n    }\n}`,
            "Python": `def insertion_sort(arr):\n    n = len(arr)\n    for i in range(1, n):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key`,
            "JavaScript": `function insertionSort(arr) {\n    let n = arr.length;\n    for (let i = 1; i < n; i++) {\n        let key = arr[i];\n        let j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`
        },
        "merge-sort": {
            "C": `#include <stdio.h>\n\nvoid merge(int arr[], int left, int mid, int right) {\n    int i, j, k;\n    int n1 = mid - left + 1;\n    int n2 = right - mid;\n    int L[n1], R[n2];\n    for (i = 0; i < n1; i++)\n        L[i] = arr[left + i];\n    for (j = 0; j < n2; j++)\n        R[j] = arr[mid + 1 + j];\n    i = 0;\n    j = 0;\n    k = left;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j])\n            arr[k++] = L[i++];\n        else\n            arr[k++] = R[j++];\n    }\n    while (i < n1)\n        arr[k++] = L[i++];\n    while (j < n2)\n        arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int left, int right) {\n    if (left < right) {\n        int mid = left + (right - left) / 2;\n        mergeSort(arr, left, mid);\n        mergeSort(arr, mid + 1, right);\n        merge(arr, left, mid, right);\n    }\n}`,
            "C++": `#include <iostream>\nusing namespace std;\n\nvoid merge(int arr[], int left, int mid, int right) {\n    int n1 = mid - left + 1;\n    int n2 = right - mid;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++)\n        L[i] = arr[left + i];\n    for (int j = 0; j < n2; j++)\n        R[j] = arr[mid + 1 + j];\n    int i = 0, j = 0, k = left;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j])\n            arr[k++] = L[i++];\n        else\n            arr[k++] = R[j++];\n    }\n    while (i < n1)\n        arr[k++] = L[i++];\n    while (j < n2)\n        arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int left, int right) {\n    if (left < right) {\n        int mid = left + (right - left) / 2;\n        mergeSort(arr, left, mid);\n        mergeSort(arr, mid + 1, right);\n        merge(arr, left, mid, right);\n    }\n}`,
            "Java": `class MergeSort {\n    void merge(int arr[], int left, int mid, int right) {\n        int n1 = mid - left + 1;\n        int n2 = right - mid;\n        int L[] = new int[n1];\n        int R[] = new int[n2];\n        for (int i = 0; i < n1; i++)\n            L[i] = arr[left + i];\n        for (int j = 0; j < n2; j++)\n            R[j] = arr[mid + 1 + j];\n        int i = 0, j = 0, k = left;\n        while (i < n1 && j < n2) {\n            if (L[i] <= R[j])\n                arr[k++] = L[i++];\n            else\n                arr[k++] = R[j++];\n        }\n        while (i < n1)\n            arr[k++] = L[i++];\n        while (j < n2)\n            arr[k++] = R[j++];\n    }\n\n    void mergeSort(int arr[], int left, int right) {\n        if (left < right) {\n            int mid = left + (right - left) / 2;\n            mergeSort(arr, left, mid);\n            mergeSort(arr, mid + 1, right);\n            merge(arr, left, mid, right);\n        }\n    }\n}`,
            "Python": `def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1`,
            "JavaScript": `function mergeSort(arr) {\n    if (arr.length <= 1) return arr;\n    const mid = Math.floor(arr.length / 2);\n    const left = mergeSort(arr.slice(0, mid));\n    const right = mergeSort(arr.slice(mid));\n    return merge(left, right);\n}\n\nfunction merge(left, right) {\n    let result = [];\n    let i = 0;\n    let j = 0;\n    while (i < left.length && j < right.length) {\n        if (left[i] < right[j]) {\n            result.push(left[i]);\n            i++;\n        } else {\n            result.push(right[j]);\n            j++;\n        }\n    }\n    return result.concat(left.slice(i)).concat(right.slice(j));\n}`
        },
        "quick-sort": {
            "C": `#include <stdio.h>\n\nvoid swap(int* a, int* b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
            "C++": `#include <iostream>\nusing namespace std;\n\nvoid swap(int* a, int* b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
            "Java": `class QuickSort {\n    void swap(int a, int b) {\n        int temp = a;\n        a = b;\n        b = temp;\n    }\n\n    int partition(int arr[], int low, int high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                swap(arr[i], arr[j]);\n            }\n        }\n        swap(arr[i + 1], arr[high]);\n        return i + 1;\n    }\n\n    void quickSort(int arr[], int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            quickSort(arr, low, pi - 1);\n            quickSort(arr, pi + 1, high);\n        }\n    }\n}`,
            "Python": `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[-1]\n    left = [x for x in arr[:-1] if x < pivot]\n    right = [x for x in arr[:-1] if x >= pivot]\n    return quick_sort(left) + [pivot] + quick_sort(right)`,
            "JavaScript": `function quickSort(arr) {\n    if (arr.length <= 1) return arr;\n    let pivot = arr[arr.length - 1];\n    let left = [];\n    let right = [];\n    for (let i = 0; i < arr.length - 1; i++) {\n        if (arr[i] < pivot) {\n            left.push(arr[i]);\n        } else {\n            right.push(arr[i]);\n        }\n    }\n    return [...quickSort(left), pivot, ...quickSort(right)];\n}`
        },
        "heap-sort": {
            "C": `#include <stdio.h>\n\nvoid swap(int* x, int* y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nvoid heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest])\n        largest = left;\n    if (right < n && arr[right] > arr[largest])\n        largest = right;\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n    for (int i = n - 1; i >= 0; i--) {\n        swap(&arr[0], &arr[i]);\n        heapify(arr, i, 0);\n    }\n}`,
            "C++": `#include <iostream>\nusing namespace std;\n\nvoid swap(int* x, int* y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nvoid heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest])\n        largest = left;\n    if (right < n && arr[right] > arr[largest])\n        largest = right;\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n    for (int i = n - 1; i >= 0; i--) {\n        swap(&arr[0], &arr[i]);\n        heapify(arr, i, 0);\n    }\n}`,
            "Java": `class HeapSort {\n    void swap(int x, int y) {\n        int temp = x;\n        x = y;\n        y = temp;\n    }\n\n    void heapify(int arr[], int n, int i) {\n        int largest = i;\n        int left = 2 * i + 1;\n        int right = 2 * i + 2;\n        if (left < n && arr[left] > arr[largest])\n            largest = left;\n        if (right < n && arr[right] > arr[largest])\n            largest = right;\n        if (largest != i) {\n            swap(arr[i], arr[largest]);\n            heapify(arr, n, largest);\n        }\n    }\n\n    void heapSort(int arr[], int n) {\n        for (int i = n / 2 - 1; i >= 0; i--)\n            heapify(arr, n, i);\n        for (int i = n - 1; i >= 0; i--) {\n            swap(arr[0], arr[i]);\n            heapify(arr, i, 0);\n        }\n    }\n}`,
            "Python": `def heapify(arr, n, i):\n    largest = i\n    left = 2 * i + 1\n    right = 2 * i + 2\n    if left < n and arr[left] > arr[largest]:\n        largest = left\n    if right < n and arr[right] > arr[largest]:\n        largest = right\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n\ndef heap_sort(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[i], arr[0] = arr[0], arr[i]\n        heapify(arr, i, 0)`,
            "JavaScript": `function heapify(arr, n, i) {\n    let largest = i;\n    let left = 2 * i + 1;\n    let right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest])\n        largest = left;\n    if (right < n && arr[right] > arr[largest])\n        largest = right;\n    if (largest !== i) {\n        [arr[i], arr[largest]] = [arr[largest], arr[i]];\n        heapify(arr, n, largest);\n    }\n}\n\nfunction heapSort(arr) {\n    let n = arr.length;\n    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)\n        heapify(arr, n, i);\n    for (let i = n - 1; i > 0; i--) {\n        [arr[0], arr[i]] = [arr[i], arr[0]];\n        heapify(arr, i, 0);\n    }\n}`
        }
    };

    // Algorithm button click event
    algorithmButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const algorithm = e.target.dataset.algorithm;
            codeContainer.innerHTML = ''; // Clear existing code
            languageButtons.forEach(langBtn => langBtn.classList.remove('active'));
            document.querySelector('.language-button[data-language="JavaScript"]').classList.add('active');
            const code = algorithms[algorithm]["JavaScript"];
            codeContainer.innerHTML = `<pre><code>${code}</code></pre>`;
        });
    });

    // Language button click event
    languageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const language = e.target.dataset.language;
            const activeAlgorithm = document.querySelector('.algorithm-button.active').dataset.algorithm;
            const code = algorithms[activeAlgorithm][language];
            codeContainer.innerHTML = `<pre><code>${code}</code></pre>`;
            languageButtons.forEach(langBtn => langBtn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    function activateButton(buttons, clickedButton) {
        // Remove the 'active' class from all buttons
        buttons.forEach(button => button.classList.remove('active'));
        // Add the 'active' class to the clicked button
        clickedButton.classList.add('active');
    }

    // Add click event listeners to algorithm buttons
    algorithmButtons.forEach(button => {
        button.addEventListener('click', () => {
            activateButton(algorithmButtons, button);
        });
    });
});
