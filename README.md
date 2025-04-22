# Pathfinding Visualizer

A web-based tool to visualize various pathfinding algorithms in action. This project allows users to create a grid, add obstacles, and watch the algorithms find the shortest path step by step.

## Live Demo

Try it out here: [Pathfinding Visualizer](https://khaishea.github.io/pathfinding-visualizer/)

---

## Features

- **Pathfinding Algorithms**: Visualize the following algorithms:
  - Dijkstra's Algorithm
  - A* Search
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Greedy Best-First Search
  - Bidirectional Search

- **Interactive Grid**:
  - Draw walls and obstacles to simulate real-world scenarios.
  - Set start and end points for the pathfinding process.
- **Customizable Settings**:
  - Adjust visualization speed.
- **Visualization**:
  - Step-by-step animation of the algorithm's execution.

---

## How to Use

1. **Visit the Live Demo**: Open the [Pathfinding Visualizer](https://khaishea.github.io/pathfinding-visualizer/) in your browser.
2. **Create a Grid**: Use the interface to draw walls and obstacles.
3. **Set Start and End Points**: Click on the grid to set the start and end points.
4. **Choose an Algorithm**: Select a pathfinding algorithm from the menu.
5. **Run the Algorithm**: Click the "Visualize" button to start the visualization.
6. **Reset the Grid**: Use the "Clear" button to reset the grid and start over.

---

## Pathfinding Algorithms Explained

### 1. **Dijkstra's Algorithm**
- **Time Complexity**: O(V²) (with adjacency matrix), O(E + V log V) (with adjacency list and priority queue)
- **Space Complexity**: O(V)
- Finds the shortest path from the start node to all other nodes in a weighted graph.

### 2. **A* Search**
- **Time Complexity**: O(E)
- **Space Complexity**: O(V)
- Combines the benefits of Dijkstra's Algorithm and Greedy Best-First Search using a heuristic function.

### 3. **Breadth-First Search (BFS)**
- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V)
- Explores all nodes at the current depth before moving to the next depth level.

### 4. **Depth-First Search (DFS)**
- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V)
- Explores as far as possible along each branch before backtracking.

### 5. **Greedy Best-First Search**
- **Time Complexity**: O(E)
- **Space Complexity**: O(V)
- Uses a heuristic to prioritize nodes that are closer to the goal, but does not guarantee the shortest path.

### 6. **Bidirectional Search**
- **Time Complexity**: O(b^(d/2)) (where b is the branching factor and d is the depth of the solution)
- **Space Complexity**: O(b^(d/2))
- Searches simultaneously from the start and goal nodes, meeting in the middle to reduce search space.

---

## Development

### Prerequisites
- A modern web browser (e.g., Chrome, Edge, Firefox).
- A text editor (e.g., VS Code) for local development.

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/khaishea/pathfinding-visualizer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pathfinding-visualizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```

---

## License

This project is licensed under the **GNU Affero General Public License (AGPL)**.  
You are free to use, modify, and distribute this project, provided that any modifications or derivative works are also licensed under the AGPL.  
For more details, see the [LICENSE](LICENSE) file.

---

## Acknowledgments

- Inspired by various pathfinding visualizers.
- Built with ❤️ by [khaishea](https://github.com/khaishea).
