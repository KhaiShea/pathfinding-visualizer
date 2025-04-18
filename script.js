const grid = document.getElementById('grid');
const rows = 18; // Ensure rows match the grid styling
const cols = 18; // Ensure columns match the grid styling
let startNode = null;
let endNode = null;

const runButton = document.getElementById('run-btn');
const algorithmSelect = document.getElementById('algorithm-select');
const spinner = document.getElementById('spinner');

const resetButton = document.getElementById('reset-btn');
const clearPathButton = document.getElementById('clear-path-btn');
const themeToggleButton = document.getElementById('theme-toggle-btn');

let isMouseDown = false;

// Create grid
function createGrid() {
    grid.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('mousedown', handleCellMouseDown);
            cell.addEventListener('mouseover', handleCellMouseOver);
            cell.addEventListener('mouseup', handleCellMouseUp);
            grid.appendChild(cell);
        }
    }
}

// Handle mouse down
function handleCellMouseDown(event) {
    const cell = event.target;
    isMouseDown = true;

    if (!startNode) {
        cell.classList.add('start');
        startNode = cell;
    } else if (!endNode) {
        cell.classList.add('end');
        endNode = cell;
    } else {
        cell.classList.toggle('wall');
    }
}

// Handle mouse over
function handleCellMouseOver(event) {
    if (isMouseDown && startNode && endNode) {
        const cell = event.target;
        cell.classList.add('wall');
    }
}

// Handle mouse up
function handleCellMouseUp() {
    isMouseDown = false;
}

// Add event listener to the document to handle mouse up globally
document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Helper function to get neighbors
function getNeighbors(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const neighbors = [];

    [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([dx, dy]) => {
        const neighbor = document.querySelector(
            `.grid-cell[data-row="${row + dx}"][data-col="${col + dy}"]`
        );
        if (neighbor && !neighbor.classList.contains('wall')) {
            neighbors.push(neighbor);
        }
    });

    return neighbors;
}

// BFS Algorithm
async function bfs(start, end) {
    const queue = [start];
    const visited = new Set();
    const parentMap = new Map();

    visited.add(start);

    while (queue.length > 0) {
        const current = queue.shift();
        if (current === end) break;

        current.classList.add('visited');
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

        for (const neighbor of getNeighbors(current)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parentMap.set(neighbor, current);
                queue.push(neighbor);
            }
        }
    }

    // Trace back the path
    let current = end;
    while (current && current !== start) {
        current.classList.add('path');
        current = parentMap.get(current);
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
    }
}

// Helper function to show a celebration
function showCelebration() {
    alert('Pathfinding Complete! 🎉');
}

// Depth-First Search (DFS)
async function dfs(start, end) {
    const stack = [start];
    const visited = new Set();
    const parentMap = new Map();

    visited.add(start);

    while (stack.length > 0) {
        const current = stack.pop();
        if (current === end) break;

        current.classList.add('visited');
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

        for (const neighbor of getNeighbors(current)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parentMap.set(neighbor, current);
                stack.push(neighbor);
            }
        }
    }

    // Trace back the path
    let current = end;
    while (current && current !== start) {
        current.classList.add('path');
        current = parentMap.get(current);
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
    }
}

// Dijkstra's Algorithm
async function dijkstra(start, end) {
    const distances = new Map();
    const parentMap = new Map();
    const visited = new Set();
    const priorityQueue = [{ node: start, distance: 0 }];

    distances.set(start, 0);

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node: current } = priorityQueue.shift();

        if (visited.has(current)) continue;
        visited.add(current);

        current.classList.add('visited');
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

        if (current === end) break;

        for (const neighbor of getNeighbors(current)) {
            const newDist = (distances.get(current) || 0) + 1;
            if (newDist < (distances.get(neighbor) || Infinity)) {
                distances.set(neighbor, newDist);
                parentMap.set(neighbor, current);
                priorityQueue.push({ node: neighbor, distance: newDist });
            }
        }
    }

    // Trace back the path
    let current = end;
    while (current && current !== start) {
        current.classList.add('path');
        current = parentMap.get(current);
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
    }
}

// A* Search
async function astar(start, end) {
    const distances = new Map();
    const parentMap = new Map();
    const visited = new Set();
    const priorityQueue = [{ node: start, fScore: 0 }];

    distances.set(start, 0);

    function heuristic(node) {
        const [row1, col1] = [parseInt(node.dataset.row), parseInt(node.dataset.col)];
        const [row2, col2] = [parseInt(end.dataset.row), parseInt(end.dataset.col)];
        return Math.abs(row1 - row2) + Math.abs(col1 - col2);
    }

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a.fScore - b.fScore);
        const { node: current } = priorityQueue.shift();

        if (visited.has(current)) continue;
        visited.add(current);

        current.classList.add('visited');
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

        if (current === end) break;

        for (const neighbor of getNeighbors(current)) {
            const newDist = (distances.get(current) || 0) + 1;
            if (newDist < (distances.get(neighbor) || Infinity)) {
                distances.set(neighbor, newDist);
                parentMap.set(neighbor, current);
                const fScore = newDist + heuristic(neighbor);
                priorityQueue.push({ node: neighbor, fScore });
            }
        }
    }

    // Trace back the path
    let current = end;
    while (current && current !== start) {
        current.classList.add('path');
        current = parentMap.get(current);
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
    }
}

// Greedy Best-First Search
async function greedyBestFirstSearch(start, end) {
    const visited = new Set();
    const parentMap = new Map();
    const priorityQueue = [{ node: start, heuristic: 0 }];

    function heuristic(node) {
        const [row1, col1] = [parseInt(node.dataset.row), parseInt(node.dataset.col)];
        const [row2, col2] = [parseInt(end.dataset.row), parseInt(end.dataset.col)];
        return Math.abs(row1 - row2) + Math.abs(col1 - col2);
    }

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a.heuristic - b.heuristic);
        const { node: current } = priorityQueue.shift();

        if (visited.has(current)) continue;
        visited.add(current);

        current.classList.add('visited');
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

        if (current === end) break;

        for (const neighbor of getNeighbors(current)) {
            if (!visited.has(neighbor)) {
                parentMap.set(neighbor, current);
                priorityQueue.push({ node: neighbor, heuristic: heuristic(neighbor) });
            }
        }
    }

    // Trace back the path
    let current = end;
    while (current && current !== start) {
        current.classList.add('path');
        current = parentMap.get(current);
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
    }
}

// Bidirectional Search
async function bidirectionalSearch(start, end) {
    const startQueue = [start];
    const endQueue = [end];
    const startVisited = new Set();
    const endVisited = new Set();
    const startParentMap = new Map();
    const endParentMap = new Map();

    startVisited.add(start);
    endVisited.add(end);

    while (startQueue.length > 0 && endQueue.length > 0) {
        // Expand from the start side
        const currentStart = startQueue.shift();
        currentStart.classList.add('visited');
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

        for (const neighbor of getNeighbors(currentStart)) {
            if (!startVisited.has(neighbor)) {
                startVisited.add(neighbor);
                startParentMap.set(neighbor, currentStart);
                startQueue.push(neighbor);
                if (endVisited.has(neighbor)) {
                    return traceBidirectionalPath(neighbor, startParentMap, endParentMap, start, end);
                }
            }
        }

        // Expand from the end side
        const currentEnd = endQueue.shift();
        currentEnd.classList.add('visited');
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization

        for (const neighbor of getNeighbors(currentEnd)) {
            if (!endVisited.has(neighbor)) {
                endVisited.add(neighbor);
                endParentMap.set(neighbor, currentEnd);
                endQueue.push(neighbor);
                if (startVisited.has(neighbor)) {
                    return traceBidirectionalPath(neighbor, startParentMap, endParentMap, start, end);
                }
            }
        }
    }
}

// Helper function to trace the path for bidirectional search
async function traceBidirectionalPath(meetingNode, startParentMap, endParentMap, start, end) {
    let current = meetingNode;

    // Trace back to the start
    while (current && current !== start) {
        current.classList.add('path');
        current = startParentMap.get(current);
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
    }

    current = meetingNode;

    // Trace back to the end
    while (current && current !== end) {
        current.classList.add('path');
        current = endParentMap.get(current);
        await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
    }
}

// Run Algorithm with Spinner and Celebration
async function runAlgorithm() {
    if (!startNode || !endNode) {
        alert('Please place both a start and an end node.');
        return;
    }

    spinner.style.display = 'inline-block'; // Show spinner

    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case 'bfs':
            await bfs(startNode, endNode);
            break;
        case 'dfs':
            await dfs(startNode, endNode);
            break;
        case 'dijkstra':
            await dijkstra(startNode, endNode);
            break;
        case 'astar':
            await astar(startNode, endNode);
            break;
        case 'greedy':
            await greedyBestFirstSearch(startNode, endNode);
            break;
        case 'bidirectional':
            await bidirectionalSearch(startNode, endNode);
            break;
        default:
            console.error('Unknown algorithm selected.');
    }

    spinner.style.display = 'none'; // Hide spinner
    showCelebration(); // Show celebration
}

// Reset the entire grid
function resetGrid() {
    startNode = null;
    endNode = null;
    grid.querySelectorAll('.grid-cell').forEach(cell => {
        cell.className = 'grid-cell';
    });
}

// Clear only the path and visited cells
function clearPath() {
    grid.querySelectorAll('.visited, .path').forEach(cell => {
        cell.classList.remove('visited', 'path');
    });
}

// Toggle dark/light mode
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light'); // Toggle the 'light' class
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark'); // Save theme preference
}

// Apply saved theme on load
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }
}

// Add event listener for the theme toggle button
themeToggleButton.addEventListener('click', toggleTheme);

// Apply theme on page load
applySavedTheme();

// Add event listeners for the buttons
resetButton.addEventListener('click', resetGrid);
clearPathButton.addEventListener('click', clearPath);
themeToggleButton.addEventListener('click', toggleTheme);

// Add event listener to the "Run" button
runButton.addEventListener('click', runAlgorithm);

// Initialize
createGrid();
