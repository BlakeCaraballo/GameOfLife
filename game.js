const numRows = 50;
const numCols = 50;
let grid = [];
let generations = 0;

// Initialize the grid with empty cells
function initGrid() {
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(false);
    }
    grid.push(row);
  }
}

// Create cells and add them to the grid
function renderGrid() {
    const gridContainer = document.querySelector("#grid");
    gridContainer.innerHTML = ""; // remove all child elements
    
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        if (grid[i][j]) {
          cell.classList.add("alive");
        }
        gridContainer.appendChild(cell);
      }
    }
    const generationsElem = document.querySelector("#generations");
    generationsElem.textContent = `Generations: ${generations}`;
    
  }

// Update the cells based on the rules of the game
function updateGrid() {
  const newGrid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      const neighbors = countNeighbors(i, j);
      if (grid[i][j]) {
        if (neighbors < 2 || neighbors > 3) {
          row.push(false);
        } else {
          row.push(true);
        }
      } else {
        if (neighbors === 3) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
    }
    newGrid.push(row);
  }
  grid = newGrid;
  generations++;
}

// Count the number of live neighbors around a cell
function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const r = (row + i + numRows) % numRows;
        const c = (col + j + numCols) % numCols;
        if (grid[r][c]) {
          count++;
        }
      }
    }
    return count;
  }
  
  function setCell(row, col, alive) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (alive) {
      cell.classList.add("alive");
    } else {
      cell.classList.remove("alive");
    }
    grid[row][col] = alive;
  }

// Handle user input
function initControls() {
  const startBtn = document.querySelector("#startBtn");
  const pauseBtn = document.querySelector("#pauseBtn");
  const patternSelect = document.querySelector("#patternSelect");
  const resetBtn = document.querySelector("#resetBtn");
  const randomBtn = document.querySelector("#randomBtn");
  const skip1Btn = document.querySelector("#skip1Btn");
  const skip23Btn = document.querySelector("#skip23Btn");

  startBtn.addEventListener("click", startGame);
  pauseBtn.addEventListener("click", pauseGame);
  patternSelect.addEventListener("change", selectPattern);
  resetBtn.addEventListener("click", resetGame);
  randomBtn.addEventListener("click", randomizeGrid);
  skip1Btn.addEventListener("click", () => {
    updateGrid();
    renderGrid();
  });
  skip23Btn.addEventListener("click", skip23Generations);
}

// Start the game loop
let intervalId;
let isRunning = false;
function startGame() {
    if(isRunning){
        return;
        }
  clearInterval(intervalId);
  intervalId = setInterval(() => {  
    updateGrid();
    renderGrid();
}, 100);
isRunning = true;
}

// Pause the game loop
function pauseGame() {
    isRunning = false;
    clearInterval(intervalId);
}

// Select a predefined pattern
function selectPattern(event) {
    const pattern = event.target.value;
    if (pattern === "blank") {
      return;
    }
    pauseGame();

      /* Clear the existing grid
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      grid[i][j] = false;
    }
  }*/
    
    switch (pattern) {
      case "blinker":
        grid[23][24] = true;
        grid[24][24] = true;
        grid[25][24] = true;
        break;
      case "block":
        grid[24][24] = true;
        grid[24][25] = true;
        grid[25][24] = true;
        grid[25][25] = true;
        break;
        case "toad":
        grid[23][24] = true;
        grid[23][25] = true;
        grid[23][26] = true;
        grid[24][23] = true;
        grid[24][24] = true;
        grid[24][25] = true;
            break;
        case "octagon2":
        grid[22][22] = true;
        grid[22][23] = true;
        grid[23][21] = true;
        grid[24][20] = true;
        grid[25][19] = true;
        grid[23][24] = true;
        grid[24][25] = true;
        grid[25][26] = true;
        grid[29][22] = true;
        grid[29][23] = true;
        grid[28][21] = true;
        grid[27][20] = true;
        grid[26][19] = true;
        grid[28][24] = true;
        grid[27][25] = true;
        grid[26][26] = true;
            break;
    }
    renderGrid();
  }

// Reset the game to an empty grid
function resetGame() {
    pauseGame();
    grid = [];
    initGrid();
    generations = 0;
    renderGrid();
    
  }

  function randomizeGrid() {
    // Clear the existing grid
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        grid[i][j] = false;
      }
    }
  
    // Randomly set some cells to be alive
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (Math.random() > 0.5) {
          grid[i][j] = true;
        }
      }
    }
  
    renderGrid();
  }

  function skip23Generations() {
    for (let i = 0; i < 23; i++) {
      updateGrid();
    }
    renderGrid();
  }

  function skip1Generation(){
    for (let i = 0; i <= 1; i++) {
        updateGrid();
      }
      renderGrid();
  }

// Initialize the grid and controls
initGrid();
renderGrid();
initControls();