class QuizGame {
  constructor(level) {
    this.level = level;
    this.timer = null;
    this.score = 0;
    this.currentQuestion = 0;
    this.questions = [];
    this.elements = window.periodicElements;
    this.elementTypes = window.elementTypes;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    const quizContainer = document.getElementById("quiz-container");
    const matchContainer = document.getElementById("match-container");

    quizContainer.classList.remove("hidden");
    matchContainer.classList.add("hidden");

    this.score = 0;
    this.currentQuestion = 0;
    document.getElementById("points").textContent = "0";

    this.setupTimer();
    this.loadQuestions();
  }

  setupTimer() {
    clearInterval(this.timer);
    let timeLeft = 300; // 5 minutes

    const updateTimer = () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById("time").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 0) {
        clearInterval(this.timer);
        this.endQuiz();
        return;
      }
      timeLeft--;
    };

    updateTimer();
    this.timer = setInterval(updateTimer, 1000);
  }

  loadQuestions() {
    try {
      const levelElements = this.getLevelElements();
      if (!levelElements.length) {
        throw new Error("No elements found for this level");
      }

      this.questions = this.generateQuestions(levelElements);
      this.showQuestion(0);
    } catch (error) {
      console.error("Error loading questions:", error);
      alert("Error loading questions. Returning to menu...");
      this.returnToMenu();
    }
  }

  getLevelElements() {
    const ranges = {
      1: [1, 18],
      2: [1, 36],
      3: [1, 54],
      4: [1, 86],
      5: [104, 118],
      6: [57, 71],
      7: [89, 103],
      8: [1, 118],
      9: [1, 118],
    };

    const [start, end] = ranges[this.level];
    return Object.entries(this.elements)
      .filter(([atomic]) => atomic >= start && atomic <= end)
      .map(([atomic, data]) => ({ atomic: parseInt(atomic), ...data }));
  }

  generateQuestions(elements) {
    if (!elements || elements.length === 0) return [];

    const shuffledElements = [...elements].sort(() => Math.random() - 0.5);
    return shuffledElements.map((element) => ({
      question: this.getRandomQuestion(element),
      correctAnswer: element.symbol,
      options: this.generateOptions(elements, element),
    }));
  }

  getRandomQuestion(element) {
    const questions = [
      `What is the symbol for ${element.name}?`,
      `Which element has atomic number ${element.atomic}?`,
      `Find the element: ${element.name}`,
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  generateTypeOptions(correctType) {
    return this.generateRandomOptions(this.elementTypes, correctType, 4);
  }

  generateRandomOptions(array, correct, count) {
    const options = [correct];
    while (options.length < count) {
      const random = array[Math.floor(Math.random() * array.length)];
      if (!options.includes(random)) {
        options.push(random);
      }
    }
    return this.shuffleArray(options);
  }

  generateOptions(allElements, correctElement) {
    const options = [correctElement.symbol];
    const otherElements = allElements.filter(
      (e) => e.symbol !== correctElement.symbol
    );

    while (options.length < 4 && otherElements.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherElements.length);
      const randomElement = otherElements.splice(randomIndex, 1)[0];
      options.push(randomElement.symbol);
    }

    return this.shuffleArray(options);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  showQuestion(index) {
    if (!this.questions || index >= this.questions.length) {
      this.endQuiz();
      return;
    }

    const question = this.questions[index];
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");

    if (!questionElement || !optionsContainer) {
      console.error("Required elements not found");
      return;
    }

    questionElement.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.textContent = option;
      button.onclick = () => this.checkAnswer(option, question.correctAnswer);
      optionsContainer.appendChild(button);
    });
  }

  checkAnswer(selected, correct) {
    const isCorrect = selected === correct;

    // Visual feedback
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((button) => {
      if (button.textContent === selected) {
        button.classList.add(isCorrect ? "correct" : "wrong");
      }
      button.disabled = true;
    });

    this.score += isCorrect ? 10 : 0;
    document.getElementById("points").textContent = this.score;

    setTimeout(() => {
      this.currentQuestion++;
      this.showQuestion(this.currentQuestion);
    }, 1000);
  }

  returnToMenu() {
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("game-menu").classList.remove("hidden");
  }

  endQuiz() {
    clearInterval(this.timer);
    const message = `Quiz completed!\nFinal score: ${
      this.score
    }\nCorrect answers: ${this.score / 10} out of ${this.questions.length}`;
    alert(message);
    this.returnToMenu();
  }
}

// Make QuizGame available globally
window.QuizGame = QuizGame;
