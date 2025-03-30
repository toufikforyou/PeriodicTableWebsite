class MatchGame {
  constructor(level) {
    this.level = level;
    this.timer = null;
    this.score = 0;
    this.matchedElements = 0;
    this.totalElements = 0;
    this.elements = window.periodicElements;
    this.positions = window.elementPositions;
    this.initialized = false;
    this.timeLeft = 0;
    this.remainingElements = new Set();
    this.elementQueue = [];
    this.maxVisibleElements = 5;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    const matchContainer = document.getElementById("match-container");
    const quizContainer = document.getElementById("quiz-container");

    matchContainer.classList.remove("hidden");
    quizContainer.classList.add("hidden");

    this.score = 0;
    document.getElementById("points").textContent = "0";

    this.setupTimer();
    this.renderElements();
  }

  setupTimer() {
    clearInterval(this.timer);
    this.timeLeft = 300; // 5 minutes

    const updateTimer = () => {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      document.getElementById("time").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        const addTime = confirm("Time's up! Would you like to continue?");
        if (addTime) {
          this.timeLeft = 300; // Add 5 more minutes
          this.timer = setInterval(updateTimer, 1000);
        } else {
          this.returnToMenu();
        }
        return;
      }
      this.timeLeft--;
    };

    updateTimer();
    this.timer = setInterval(updateTimer, 1000);
  }

  renderElements() {
    try {
      const elementBank = document.getElementById("element-bank");
      const gameBoard = document.getElementById("game-board");

      if (!elementBank || !gameBoard) {
        throw new Error("Required containers not found");
      }

      elementBank.innerHTML = '<div class="element-queue"></div>';
      gameBoard.innerHTML = "";

      const levelElements = this.getLevelElements();
      this.elementQueue = this.shuffleArray(levelElements); // Shuffle elements
      this.totalElements = levelElements.length; // Store total elements
      this.matchedElements = 0; // Reset matched elements

      // Initialize first 5 elements
      this.updateVisibleElements();
      this.createDropZones(levelElements);
    } catch (error) {
      console.error("Render error:", error);
      this.handleError(error);
    }
  }

  updateVisibleElements() {
    const queueContainer = document.querySelector(".element-queue");
    queueContainer.innerHTML = "";

    const visibleElements = this.elementQueue.slice(0, this.maxVisibleElements);

    visibleElements.forEach((element) => {
      const draggable = this.createDraggableElement(element);
      queueContainer.appendChild(draggable);
    });
  }

  getLevelElements() {
    try {
      console.log("Getting elements for level:", this.level);

      // Validate level
      if (!this.level || typeof this.level !== "number") {
        throw new Error(`Invalid level value: ${this.level}`);
      }

      // Define level ranges and their descriptions
      const levelRanges = {
        1: { start: 1, end: 18, desc: "Main Group (Period 1-2)" },
        2: { start: 1, end: 36, desc: "Main Group (Period 1-3)" },
        3: { start: 1, end: 54, desc: "Main Group + First Transition" },
        4: { start: 1, end: 86, desc: "Up to Period 5" },
        5: { start: 104, end: 118, desc: "Modern Elements" },
        6: { start: 57, end: 71, desc: "Lanthanides" },
        7: { start: 89, end: 103, desc: "Actinides" },
        8: { start: 1, end: 118, desc: "Full Table" },
        9: { start: 1, end: 118, desc: "Review Mode" },
      };

      const range = levelRanges[this.level];
      if (!range) {
        throw new Error(`Level ${this.level} is not defined`);
      }

      console.log(
        `Level ${this.level}: ${range.desc} (${range.start}-${range.end})`
      );

      if (!this.elements) {
        throw new Error("Elements data not loaded properly");
      }

      const filteredElements = Object.entries(this.elements)
        .filter(([atomic]) => {
          const num = parseInt(atomic);
          return num >= range.start && num <= range.end;
        })
        .map(([atomic, data]) => ({
          atomic: parseInt(atomic),
          ...data,
        }));

      console.log(
        `Found ${filteredElements.length} elements for level ${this.level}`
      );

      if (filteredElements.length === 0) {
        throw new Error(`No elements found for level ${this.level}`);
      }

      return filteredElements;
    } catch (error) {
      console.error("getLevelElements error:", error);
      this.handleError(error);
      return [];
    }
  }

  createDraggableElement(element) {
    const div = document.createElement("div");
    div.className = "draggable-element";
    div.draggable = true;
    div.dataset.atomic = element.atomic;
    div.innerHTML = `
      <div>${element.symbol}</div>
      <div class="atomic-number">${element.atomic}</div>
    `;

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", element.atomic);
    });

    return div;
  }

  getElementPositions() {
    return {
      // Period 1
      1: 1,
      2: 18,
      // Period 2
      3: 19,
      4: 20,
      5: 21,
      6: 22,
      7: 23,
      8: 24,
      9: 25,
      10: 26,
      // Period 3
      11: 37,
      12: 38,
      13: 39,
      14: 40,
      15: 41,
      16: 42,
      17: 43,
      18: 44,
      // And so on...
    };
  }

  createDropZones(elements) {
    const gameBoard = document.getElementById("game-board");
    const totalRows = 10;
    const totalCols = 18;

    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateRows = `repeat(${totalRows}, minmax(60px, 1fr))`;

    // Cell numbering reference
    const cellNumbers = {
      0: [
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        2,
      ],
      1: [
        3,
        4,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        6,
        7,
        8,
        9,
        10,
      ],
      2: [
        11,
        12,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        13,
        14,
        15,
        16,
        17,
        18,
      ],
      3: [
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ],
      4: [
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
      ],
      5: [
        55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
      ],
      6: [
        87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,
        116, 117, 118,
      ],
      7: [null], // Gap row
      8: [
        null,
        null,
        null,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
      ], // Lanthanides
      9: [
        null,
        null,
        null,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
      ], // Actinides
    };

    // Create grid
    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalCols; col++) {
        const cell = document.createElement("div");
        cell.className = "element-cell";

        const cellNumber = cellNumbers[row]?.[col];

        if (cellNumber === null) {
          // Handle empty cells
          cell.classList.add("empty-cell");
          cell.style.pointerEvents = "none"; // Disable interactions
        } else {
          // Add position number
          const posNumber = document.createElement("div");
          posNumber.className = "position-number";
          posNumber.textContent = cellNumber;
          cell.appendChild(posNumber);

          // Handle special rows
          if (row === 7) {
            cell.classList.add("gap-row");
          } else if (row === 8) {
            cell.classList.add("lanthanide");
          } else if (row === 9) {
            cell.classList.add("actinide");
          }

          // Set up drop zone if this position should have an element
          if (cellNumber !== null) {
            const atomicNumber = Object.keys(this.positions).find(
              (key) => this.positions[key] === cellNumber
            );
            if (
              atomicNumber &&
              elements.some((e) => e.atomic === parseInt(atomicNumber))
            ) {
              cell.dataset.position = cellNumber;
              cell.dataset.atomicNumber = atomicNumber;
              this.setupDropZone(cell);
            }
          }
        }

        gameBoard.appendChild(cell);
      }
    }
  }

  setupSpecialRow(cell, position, elements, positions) {
    const atomicNumber = Object.keys(positions).find(
      (key) => positions[key] === position
    );

    if (
      atomicNumber &&
      elements.some((e) => e.atomic === parseInt(atomicNumber))
    ) {
      cell.dataset.position = position;
      cell.dataset.atomicNumber = atomicNumber;
      this.setupDropZone(cell);
    }
  }

  setupRegularCell(cell, position, elements, positions) {
    const atomicNumber = Object.keys(positions).find(
      (key) => positions[key] === position
    );

    if (
      atomicNumber &&
      elements.some((e) => e.atomic === parseInt(atomicNumber))
    ) {
      cell.dataset.position = position;
      cell.dataset.atomicNumber = atomicNumber;
      this.setupDropZone(cell);
    }
  }

  setupDropZone(cell) {
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      cell.classList.add("dragover");
    });

    cell.addEventListener("dragleave", () => {
      cell.classList.remove("dragover");
    });

    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      const atomicNumber = e.dataTransfer.getData("text/plain");
      this.handleDrop(cell, atomicNumber);
    });
  }

  handleDrop(cell, atomicNumber) {
    const element = this.elements[atomicNumber];
    const targetPosition = parseInt(cell.dataset.position);
    const correctPosition = elementPositions[atomicNumber];

    // Modified level 1 check - don't disable dragging, just validate positions
    if (this.level === 1) {
      if (correctPosition === targetPosition) {
        // Allow correct placements
        cell.innerHTML = `
          <div>${element.symbol}</div>
          <div class="atomic-number">${atomicNumber}</div>
        `;
        cell.classList.add("correct");
        this.score += 10;
        document.getElementById("points").textContent = this.score;

        // Remove dragged element and update queue
        const draggedElement = document.querySelector(
          `[data-atomic="${atomicNumber}"]`
        );
        if (draggedElement) {
          draggedElement.remove();
        }

        this.remainingElements.delete(parseInt(atomicNumber));
        this.matchedElements++;
        this.elementQueue = this.elementQueue.filter(
          (el) => el.atomic !== parseInt(atomicNumber)
        );
        this.updateVisibleElements();

        if (this.matchedElements >= this.totalElements) {
          this.handleGameCompletion();
        }
      } else {
        // Wrong position
        cell.classList.add("wrong");
        setTimeout(() => {
          cell.classList.remove("wrong");
        }, 800);
      }
      return;
    }

    // Rest of the handling for other levels
    if (elementPositions[atomicNumber] === targetPosition) {
      cell.innerHTML = `
        <div>${element.symbol}</div>
        <div class="atomic-number">${atomicNumber}</div>
      `;
      cell.classList.add("correct");
      this.score += 10;
      document.getElementById("points").textContent = this.score;

      // Remove dragged element and update queue
      const draggedElement = document.querySelector(
        `[data-atomic="${atomicNumber}"]`
      );
      if (draggedElement) {
        draggedElement.remove();
      }

      this.remainingElements.delete(parseInt(atomicNumber));
      this.matchedElements++;
      this.elementQueue = this.elementQueue.filter(
        (el) => el.atomic !== parseInt(atomicNumber)
      );
      this.updateVisibleElements();

      if (this.matchedElements >= this.totalElements) {
        this.handleGameCompletion();
      }
    } else {
      cell.classList.add("wrong");
      setTimeout(() => {
        cell.classList.remove("wrong");
      }, 800);
    }
  }

  handleGameCompletion() {
    clearInterval(this.timer);

    // Add celebration effect
    const gameBoard = document.getElementById("game-board");
    gameBoard.style.animation = "celebrate 1s ease-in-out";

    setTimeout(() => {
      const playAgain = confirm(
        `Congratulations! You completed the level with score ${this.score}!\nWould you like to play again?`
      );

      if (playAgain) {
        this.initialize();
      } else {
        // Return to level selection
        document.getElementById("game-container").classList.add("hidden");
        document.getElementById("game-menu").classList.remove("hidden");
      }
    }, 1000);
  }

  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  handleError(error) {
    console.error("Game error:", error);
    alert(`Error: ${error.message}. Returning to menu...`);
    this.returnToMenu();
  }

  returnToMenu() {
    clearInterval(this.timer);
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("game-menu").classList.remove("hidden");
    this.initialized = false;
  }
}

// Make MatchGame available globally
window.MatchGame = MatchGame;
