class PeriodicTableGame {
  constructor() {
    this.currentLevel = 1;
    this.timeLimit = 300; // 5 minutes
    this.score = 0;
    this.timer = null;
    this.gameActive = false;
    this.gameMode = "match"; // or 'quiz'
    this.elements = this.getElements();
  }

  getElements() {
    return {
      1: { symbol: "H", name: "Hydrogen" },
      2: { symbol: "He", name: "Helium" },
      // Add more elements as needed
    };
  }

  initializeGame(level) {
    this.currentLevel = level;
    this.gameActive = true;
    this.score = 0;
    this.setupTimer();
    this.setupGameBoard();
    this.setupGameModeButtons();
    this.setupMatchMode();
  }

  setupTimer() {
    clearInterval(this.timer);
    let timeLeft = this.timeLimit;

    this.timer = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById("time").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 0) {
        this.endGame("Time's up!");
      }
    }, 1000);
  }

  setupGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    // Implementation will vary based on level
  }

  setupGameModeButtons() {
    const matchBtn = document.getElementById("matchMode");
    const quizBtn = document.getElementById("quizMode");

    matchBtn.addEventListener("click", () => this.switchGameMode("match"));
    quizBtn.addEventListener("click", () => this.switchGameMode("quiz"));
  }

  switchGameMode(mode) {
    this.gameMode = mode;
    document
      .querySelectorAll(".game-mode")
      .forEach((el) => el.classList.add("hidden"));
    document.getElementById(`${mode}-container`).classList.remove("hidden");

    if (mode === "match") {
      this.setupMatchMode();
    } else {
      this.setupQuizMode();
    }
  }

  setupMatchMode() {
    const elementBank = document.getElementById("element-bank");
    const gameBoard = document.getElementById("game-board");

    elementBank.innerHTML = "";
    gameBoard.innerHTML = "";

    // Create draggable elements based on current level
    const levelElements = this.getLevelElements();
    levelElements.forEach((element) => {
      const draggable = this.createDraggableElement(element);
      elementBank.appendChild(draggable);
    });

    // Create drop zones on game board
    this.createDropZones();
  }

  setupQuizMode() {
    const levelElements = this.getLevelElements();
    this.currentQuestionIndex = 0;
    this.questions = this.generateQuestions(levelElements);
    this.showQuestion();
  }

  getLevelElements() {
    const ranges = {
      1: [1, 18],
      2: [1, 36],
      // Add more level ranges
    };
    const [start, end] = ranges[this.currentLevel] || [1, 18];
    return Object.entries(this.elements)
      .filter(([atomic]) => atomic >= start && atomic <= end)
      .map(([atomic, data]) => ({ atomic: parseInt(atomic), ...data }));
  }

  createDraggableElement(element) {
    const div = document.createElement("div");
    div.className = "draggable-element";
    div.draggable = true;
    div.dataset.atomic = element.atomic;
    div.textContent = element.symbol;

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", element.atomic);
    });

    return div;
  }

  // Add more methods for drag-drop and quiz functionality

  endGame(message) {
    clearInterval(this.timer);
    this.gameActive = false;
    alert(message);
    // Show replay option
  }
}

class GameManager {
  constructor() {
    this.currentLevel = 1;
    this.gameMode = null;
    this.modal = document.getElementById("mode-selection-modal");
    this.gameContainer = document.getElementById("game-container");
    this.gameMenu = document.getElementById("game-menu");
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Level button clicks
    document.querySelectorAll(".level-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const level = parseInt(e.currentTarget.dataset.level);
        if (isNaN(level)) {
          console.error("Invalid level data:", e.currentTarget.dataset);
          return;
        }
        console.log("Selected level:", level);
        this.currentLevel = level;
        this.showModeSelection();
      });
    });

    // Game mode buttons
    document.getElementById("startMatch").addEventListener("click", () => {
      this.hideModal();
      this.startGame("match");
    });

    document.getElementById("startQuiz").addEventListener("click", () => {
      this.hideModal();
      this.startGame("quiz");
    });

    // Modal close on outside click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });
  }

  showModeSelection() {
    this.modal.classList.add("active");
  }

  hideModal() {
    this.modal.classList.remove("active");
  }

  startGame(mode) {
    if (
      isNaN(this.currentLevel) ||
      this.currentLevel < 1 ||
      this.currentLevel > 9
    ) {
      console.error("Invalid level:", this.currentLevel);
      alert("Please select a valid level");
      return;
    }

    this.gameMode = mode;
    this.gameMenu.classList.add("hidden");
    this.gameContainer.classList.remove("hidden");

    // Reset game state
    document.getElementById("time").textContent = "05:00";
    document.getElementById("points").textContent = "0";

    console.log(`Starting ${mode} game at level ${this.currentLevel}`);

    if (mode === "match") {
      const matchGame = new MatchGame(this.currentLevel);
      matchGame.initialize();
    } else {
      const quizGame = new QuizGame(this.currentLevel);
      quizGame.initialize();
    }
  }
}

// Initialize game manager when document loads
document.addEventListener("DOMContentLoaded", () => {
  new GameManager();
});
