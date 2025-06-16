document.addEventListener('DOMContentLoaded', () => {
    // Maze configuration
    let mazeSize = 15;
    let maze = [];
    let start = { x: 0, y: 0 };
    let end = { x: mazeSize - 1, y: mazeSize - 1 };
    let isDraggingStart = false;
    let isDraggingEnd = false;
    
    // DOM elements
    const mazeElement = document.getElementById('maze');
    const generateBtn = document.getElementById('generate-btn');
    const solveBtn = document.getElementById('solve-btn');
    const clearBtn = document.getElementById('clear-btn');
    const algorithmSelect = document.getElementById('algorithm');
    const mazeSizeSelect = document.getElementById('maze-size');
    const visitedCountElement = document.getElementById('visited-count');
    const pathLengthElement = document.getElementById('path-length');
    const timeElement = document.getElementById('time');
    
    // Initialize the maze
    function initializeMaze() {
        maze = [];
        mazeElement.innerHTML = '';
        mazeElement.style.gridTemplateColumns = `repeat(${mazeSize}, 25px)`;
        
        for (let y = 0; y < mazeSize; y++) {
            maze[y] = [];
            for (let x = 0; x < mazeSize; x++) {
                maze[y][x] = {
                    x,
                    y,
                    isWall: false,
                    element: document.createElement('div')
                };
                
                const cell = maze[y][x].element;
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                // Set start and end positions
                if (x === start.x && y === start.y) {
                    cell.classList.add('start');
                } else if (x === end.x && y === end.y) {
                    cell.classList.add('end');
                }
                
                // Event listeners
                cell.addEventListener('mousedown', handleCellMouseDown);
                cell.addEventListener('mouseenter', handleCellMouseEnter);
                cell.addEventListener('mouseup', handleCellMouseUp);
                
                mazeElement.appendChild(cell);
            }
        }
    }
    
    // Generate a random maze
    function generateRandomMaze() {
        clearSolution();
        
        // Reset all cells to not walls
        for (let y = 0; y < mazeSize; y++) {
            for (let x = 0; x < mazeSize; x++) {
                maze[y][x].isWall = false;
                maze[y][x].element.classList.remove('wall', 'visited', 'path');
            }
        }
        
        // Set start and end positions
        maze[start.y][start.x].element.classList.add('start');
        maze[end.y][end.x].element.classList.add('end');
        
        // Generate random walls (about 25% of cells)
        for (let y = 0; y < mazeSize; y++) {
            for (let x = 0; x < mazeSize; x++) {
                // Don't place walls on start or end
                if ((x === start.x && y === start.y) || (x === end.x && y === end.y)) {
                    continue;
                }
                
                if (Math.random() < 0.25) {
                    maze[y][x].isWall = true;
                    maze[y][x].element.classList.add('wall');
                }
            }
        }
    }
    
    // Clear the solution (visited and path cells)
    function clearSolution() {
        for (let y = 0; y < mazeSize; y++) {
            for (let x = 0; x < mazeSize; x++) {
                maze[y][x].element.classList.remove('visited', 'path');
            }
        }
        
        // Reset stats
        visitedCountElement.textContent = '0';
        pathLengthElement.textContent = '0';
        timeElement.textContent = '0';
    }
    
    // Handle cell mouse down
    function handleCellMouseDown(e) {
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        
        if (maze[y][x].element.classList.contains('start')) {
            isDraggingStart = true;
            return;
        }
        
        if (maze[y][x].element.classList.contains('end')) {
            isDraggingEnd = true;
            return;
        }
        
        // Toggle wall
        maze[y][x].isWall = !maze[y][x].isWall;
        maze[y][x].element.classList.toggle('wall');
    }
    
    // Handle cell mouse enter
    function handleCellMouseEnter(e) {
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        
        if (isDraggingStart) {
            // Don't allow placing start on walls or end
            if (!maze[y][x].isWall && !maze[y][x].element.classList.contains('end')) {
                // Remove start from previous position
                maze[start.y][start.x].element.classList.remove('start');
                
                // Set new start position
                start = { x, y };
                maze[y][x].element.classList.add('start');
            }
            return;
        }
        
        if (isDraggingEnd) {
            // Don't allow placing end on walls or start
            if (!maze[y][x].isWall && !maze[y][x].element.classList.contains('start')) {
                // Remove end from previous position
                maze[end.y][end.x].element.classList.remove('end');
                
                // Set new end position
                end = { x, y };
                maze[y][x].element.classList.add('end');
            }
            return;
        }
    }
    
    // Handle cell mouse up
    function handleCellMouseUp() {
        isDraggingStart = false;
        isDraggingEnd = false;
    }
    
    // Solve the maze using the selected algorithm
    async function solveMaze() {
        clearSolution();
        
        const algorithm = algorithmSelect.value;
        let path = [];
        let visitedCount = 0;
        let pathLength = 0;
        let time = 0;
        
        switch (algorithm) {
            case 'bfs':
                ({ path, visitedCount, time } = await bfs());
                break;
            case 'dfs':
                ({ path, visitedCount, time } = await dfs());
                break;
            case 'astar':
                ({ path, visitedCount, time } = await aStar());
                break;
            case 'dijkstra':
                ({ path, visitedCount, time } = await dijkstra());
                break;
        }
        
        // Update stats
        visitedCountElement.textContent = visitedCount;
        pathLengthElement.textContent = path.length;
        timeElement.textContent = time;
        
        // Show the path
        if (path.length > 0) {
            for (const node of path) {
                await sleep(20);
                maze[node.y][node.x].element.classList.add('path');
            }
        }
    }
    
    // Breadth-First Search
    async function bfs() {
        const startTime = performance.now();
        let visitedCount = 0;
        
        const queue = [[start]];
        const visited = new Set();
        visited.add(`${start.x},${start.y}`);
        
        while (queue.length > 0) {
            const path = queue.shift();
            const { x, y } = path[path.length - 1];
            
            // If we reached the end, return the path
            if (x === end.x && y === end.y) {
                const endTime = performance.now();
                return { 
                    path, 
                    visitedCount, 
                    time: Math.round(endTime - startTime) 
                };
            }
            
            // Explore neighbors
            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx >= 0 && nx < mazeSize && ny >= 0 && ny < mazeSize && 
                    !maze[ny][nx].isWall && !visited.has(`${nx},${ny}`)) {
                    
                    visited.add(`${nx},${ny}`);
                    visitedCount++;
                    
                    // Visualize visited nodes
                    if (!(nx === end.x && ny === end.y)) {
                        maze[ny][nx].element.classList.add('visited');
                        await sleep(5);
                    }
                    
                    queue.push([...path, { x: nx, y: ny }]);
                }
            }
        }
        
        const endTime = performance.now();
        return { 
            path: [], 
            visitedCount, 
            time: Math.round(endTime - startTime) 
        };
    }
    
    // Depth-First Search
    async function dfs() {
        const startTime = performance.now();
        let visitedCount = 0;
        
        const stack = [[start]];
        const visited = new Set();
        visited.add(`${start.x},${start.y}`);
        
        while (stack.length > 0) {
            const path = stack.pop();
            const { x, y } = path[path.length - 1];
            
            // If we reached the end, return the path
            if (x === end.x && y === end.y) {
                const endTime = performance.now();
                return { 
                    path, 
                    visitedCount, 
                    time: Math.round(endTime - startTime) 
                };
            }
            
            // Explore neighbors
            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx >= 0 && nx < mazeSize && ny >= 0 && ny < mazeSize && 
                    !maze[ny][nx].isWall && !visited.has(`${nx},${ny}`)) {
                    
                    visited.add(`${nx},${ny}`);
                    visitedCount++;
                    
                    // Visualize visited nodes
                    if (!(nx === end.x && ny === end.y)) {
                        maze[ny][nx].element.classList.add('visited');
                        await sleep(5);
                    }
                    
                    stack.push([...path, { x: nx, y: ny }]);
                }
            }
        }
        
        const endTime = performance.now();
        return { 
            path: [], 
            visitedCount, 
            time: Math.round(endTime - startTime) 
        };
    }
    
    // A* Search
    async function aStar() {
        const startTime = performance.now();
        let visitedCount = 0;
        
        // Heuristic function (Manhattan distance)
        const heuristic = (node) => {
            return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
        };
        
        const openSet = new PriorityQueue();
        openSet.enqueue(start, 0);
        
        const cameFrom = {};
        const gScore = {};
        const fScore = {};
        
        // Initialize scores
        for (let y = 0; y < mazeSize; y++) {
            for (let x = 0; x < mazeSize; x++) {
                gScore[`${x},${y}`] = Infinity;
                fScore[`${x},${y}`] = Infinity;
            }
        }
        
        gScore[`${start.x},${start.y}`] = 0;
        fScore[`${start.x},${start.y}`] = heuristic(start);
        
        const openSetHash = new Set();
        openSetHash.add(`${start.x},${start.y}`);
        
        while (!openSet.isEmpty()) {
            const current = openSet.dequeue().element;
            openSetHash.delete(`${current.x},${current.y}`);
            
            // If we reached the end, reconstruct the path
            if (current.x === end.x && current.y === end.y) {
                const path = [];
                let node = current;
                while (node.x !== start.x || node.y !== start.y) {
                    path.unshift(node);
                    node = cameFrom[`${node.x},${node.y}`];
                }
                
                const endTime = performance.now();
                return { 
                    path, 
                    visitedCount, 
                    time: Math.round(endTime - startTime) 
                };
            }
            
            // Explore neighbors
            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const neighbor = { x: current.x + dx, y: current.y + dy };
                
                // Skip if out of bounds or wall
                if (neighbor.x < 0 || neighbor.x >= mazeSize || 
                    neighbor.y < 0 || neighbor.y >= mazeSize || 
                    maze[neighbor.y][neighbor.x].isWall) {
                    continue;
                }
                
                // Tentative gScore
                const tentativeGScore = gScore[`${current.x},${current.y}`] + 1;
                
                if (tentativeGScore < gScore[`${neighbor.x},${neighbor.y}`]) {
                    cameFrom[`${neighbor.x},${neighbor.y}`] = current;
                    gScore[`${neighbor.x},${neighbor.y}`] = tentativeGScore;
                    fScore[`${neighbor.x},${neighbor.y}`] = tentativeGScore + heuristic(neighbor);
                    
                    if (!openSetHash.has(`${neighbor.x},${neighbor.y}`)) {
                        openSet.enqueue(neighbor, fScore[`${neighbor.x},${neighbor.y}`]);
                        openSetHash.add(`${neighbor.x},${neighbor.y}`);
                        
                        // Visualize visited nodes
                        if (!(neighbor.x === end.x && neighbor.y === end.y)) {
                            maze[neighbor.y][neighbor.x].element.classList.add('visited');
                            visitedCount++;
                            await sleep(5);
                        }
                    }
                }
            }
        }
        
        const endTime = performance.now();
        return { 
            path: [], 
            visitedCount, 
            time: Math.round(endTime - startTime) 
        };
    }
    
    // Dijkstra's Algorithm (similar to A* but without heuristic)
    async function dijkstra() {
        const startTime = performance.now();
        let visitedCount = 0;
        
        const priorityQueue = new PriorityQueue();
        priorityQueue.enqueue(start, 0);
        
        const distances = {};
        const previous = {};
        
        // Initialize distances
        for (let y = 0; y < mazeSize; y++) {
            for (let x = 0; x < mazeSize; x++) {
                distances[`${x},${y}`] = Infinity;
            }
        }
        
        distances[`${start.x},${start.y}`] = 0;
        
        while (!priorityQueue.isEmpty()) {
            const current = priorityQueue.dequeue().element;
            
            // If we reached the end, reconstruct the path
            if (current.x === end.x && current.y === end.y) {
                const path = [];
                let node = current;
                while (node.x !== start.x || node.y !== start.y) {
                    path.unshift(node);
                    node = previous[`${node.x},${node.y}`];
                }
                
                const endTime = performance.now();
                return { 
                    path, 
                    visitedCount, 
                    time: Math.round(endTime - startTime) 
                };
            }
            
            // Explore neighbors
            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const neighbor = { x: current.x + dx, y: current.y + dy };
                
                // Skip if out of bounds or wall
                if (neighbor.x < 0 || neighbor.x >= mazeSize || 
                    neighbor.y < 0 || neighbor.y >= mazeSize || 
                    maze[neighbor.y][neighbor.x].isWall) {
                    continue;
                }
                
                const newDistance = distances[`${current.x},${current.y}`] + 1;
                
                if (newDistance < distances[`${neighbor.x},${neighbor.y}`]) {
                    distances[`${neighbor.x},${neighbor.y}`] = newDistance;
                    previous[`${neighbor.x},${neighbor.y}`] = current;
                    priorityQueue.enqueue(neighbor, newDistance);
                    
                    // Visualize visited nodes
                    if (!(neighbor.x === end.x && neighbor.y === end.y)) {
                        maze[neighbor.y][neighbor.x].element.classList.add('visited');
                        visitedCount++;
                        await sleep(5);
                    }
                }
            }
        }
        
        const endTime = performance.now();
        return { 
            path: [], 
            visitedCount, 
            time: Math.round(endTime - startTime) 
        };
    }
    
    // Priority Queue implementation for A* and Dijkstra
    class PriorityQueue {
        constructor() {
            this.elements = [];
        }
        
        enqueue(element, priority) {
            this.elements.push({ element, priority });
            this.elements.sort((a, b) => a.priority - b.priority);
        }
        
        dequeue() {
            return this.elements.shift();
        }
        
        isEmpty() {
            return this.elements.length === 0;
        }
    }
    
    // Helper function for delays in visualization
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generateRandomMaze);
    solveBtn.addEventListener('click', solveMaze);
    clearBtn.addEventListener('click', clearSolution);
    
    mazeSizeSelect.addEventListener('change', () => {
        mazeSize = parseInt(mazeSizeSelect.value);
        start = { x: 0, y: 0 };
        end = { x: mazeSize - 1, y: mazeSize - 1 };
        initializeMaze();
    });
    
    // Initialize the maze on page load
    initializeMaze();
});