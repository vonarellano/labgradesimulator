/* ==========================================================
   LAB GRADE SIMULATOR
   Author: Von Michael B. Arellano
========================================================== */

let exerciseCount = 0;

/* ==========================================================
   UI VISIBILITY
========================================================== */

/**
 * Shows or hides all elements with the specified class.
 *
 * @param {HTMLInputElement} checkbox
 * @param {string} className
 * @param {boolean} showWhenChecked
 */
function hideOrUnhide(checkbox, className, showWhenChecked = true) {
  const elements = document.querySelectorAll(`.${className}`);

  elements.forEach((element) => {
    element.hidden = showWhenChecked ? !checkbox.checked : checkbox.checked;
  });

  computeLabScore();
}

/**
 * Updates the visibility of all quiz-related components.
 */
function hideOrUnhideQuiz() {
  const hasQuiz = document.getElementById("quizzesCheckbox").checked;
  const quizAsExercise = document.getElementById(
    "quizzesAsExerCheckbox"
  ).checked;

  // Show or hide all quiz sections.
  hideOrUnhide(document.getElementById("quizzesCheckbox"), "quiz");

  toggleElement("quizPercentContainer", hasQuiz && !quizAsExercise);
  toggleElement("quizExerCheckboxContainer", hasQuiz);
  toggleElement("quizAsExerComputed", hasQuiz && quizAsExercise);
  toggleElement("normalizedQuizContainer", hasQuiz && !quizAsExercise);

  computeLabScore();
}

/**
 * Shows or hides a single element.
 *
 * @param {string} id
 * @param {boolean} show
 */
function toggleElement(id, show) {
  document.getElementById(id).hidden = !show;
}

/* ==========================================================
   EXERCISE MANAGEMENT
========================================================== */

/**
 * Adds a new exercise input row.
 */
function addExercise() {
  exerciseCount++;

  const row = createExerciseRow(exerciseCount);

  document.getElementById("exerciseContainer").appendChild(row);

  computeLabScore();
}

/**
 * Creates one exercise row.
 *
 * @param {number} number
 * @returns {HTMLDivElement}
 */
function createExerciseRow(number) {
  const row = document.createElement("div");

  row.className = "exercise-row";

  row.innerHTML = `
    <label><i>Exer ${number}:</i></label>

    <input
      id="exer${number}"
      class="exerScores"
      type="number"
      placeholder="10"
      oninput="isNumber(this,'exer${number}Error')"
    />

    <button
      type="button"
      onclick="removeExercise(this)"
    >
      <span
        class="material-symbols-outlined"
        style="font-size:16px;"
      >
        delete
      </span>
    </button>

    <div
      id="exer${number}Error"
      class="error"
    ></div>
  `;

  return row;
}

/**
 * Removes an exercise row.
 *
 * @param {HTMLButtonElement} button
 */
function removeExercise(button) {
  button.parentElement.remove();

  renumberExercises();

  computeLabScore();
}

/**
 * Renumbers all remaining exercise rows.
 */
function renumberExercises() {
  const rows = document.querySelectorAll(".exercise-row");

  exerciseCount = rows.length;

  rows.forEach((row, index) => {
    const number = index + 1;

    updateExerciseRow(row, number);
  });
}

/**
 * Updates the IDs and labels of an exercise row.
 *
 * @param {HTMLDivElement} row
 * @param {number} number
 */
function updateExerciseRow(row, number) {
  row.querySelector("label").innerHTML = `<i>Exercise ${number}:</i>`;

  const input = row.querySelector(".exerScores");

  input.id = `exer${number}`;

  input.setAttribute("oninput", `isNumber(this,'exer${number}Error')`);

  row.querySelector(".error").id = `exer${number}Error`;
}

/* ==========================================================
   INITIALIZATION
========================================================== */

/**
 * Initializes the simulator.
 */
function initializeUI() {
  hideOrUnhideQuiz();
  computeLabScore();
}

window.addEventListener("DOMContentLoaded", initializeUI);
