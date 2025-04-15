const grid = document.getElementById('grid');
const rows = 20;
const cols = 20;
let startNode = null;
let endNode = null;

// Create grid
function createGrid() {
    grid.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            grid.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
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

// Initialize
createGrid();
