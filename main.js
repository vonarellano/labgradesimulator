/* ==========================================================
   LAB GRADE SIMULATOR
   Author: Von Michael B. Arellano
========================================================== */

/* ==========================================================
   INPUT HELPERS
========================================================== */

/**
 * Returns the numeric value of an input field.
 *
 * @param {string} id
 * @returns {number}
 */
function getNumber(id) {
  return Number(document.getElementById(id).value) || 0;
}

/**
 * Retrieves all user inputs.
 *
 * @returns {Object}
 */
function getInputs() {
  return {
    // Checkboxes
    hasQuiz: document.getElementById("quizzesCheckbox").checked,
    quizAsExercise: document.getElementById("quizzesAsExerCheckbox").checked,
    hasExer: document.getElementById("exerCheckbox").checked,

    // Quiz
    quizPercent: getNumber("quizPercent"),
    perfectQuiz: getNumber("perfectQuizScore"),
    quizScore: getNumber("quizScore"),

    // Exercise
    exerPercent: getNumber("exerPercent"),
    perfectExer: getNumber("perfectExerScore"),

    exerciseScores: [...document.querySelectorAll(".exerScores")].map(
      (input) => Number(input.value) || 0
    ),
  };
}

/* ==========================================================
     VALIDATION
  ========================================================== */

/**
 * Validates whether the input contains a valid number.
 *
 * @param {HTMLInputElement} input
 * @param {string} errorContainer
 */
function isNumber(input, errorContainer) {
  const error = document.getElementById(errorContainer);

  if (input.value.trim() === "" || isNaN(input.value)) {
    error.innerText = "Please enter a valid number.";
  } else {
    error.innerText = "";
  }

  computeLabScore();
}

/* ==========================================================
     CALCULATION
  ========================================================== */

/**
 * Computes all laboratory grade components.
 *
 * @param {Object} data
 * @returns {Object}
 */
function calculateLabGrade(data) {
  let totalExercise = data.exerciseScores.reduce(
    (sum, score) => sum + score,
    0
  );

  let perfectExercise = data.perfectExer;
  let quizEquivalent = 0;

  // Count quiz as an exercise
  if (data.hasQuiz && data.quizAsExercise && data.perfectQuiz > 0) {
    quizEquivalent = (data.quizScore / data.perfectQuiz) * 10;

    totalExercise += quizEquivalent;
    perfectExercise += 10;
  }

  // Compute normalized exercise score
  const normalizedExercise =
    perfectExercise > 0 && data.exerPercent > 0
      ? (totalExercise / perfectExercise) * data.exerPercent
      : 0;

  // Compute normalized quiz score
  const normalizedQuiz =
    data.perfectQuiz > 0 && data.quizPercent > 0
      ? (data.quizScore / data.perfectQuiz) * data.quizPercent
      : 0;

  // Compute total laboratory standing
  const labStanding =
    (data.hasQuiz && !data.quizAsExercise ? normalizedQuiz : 0) +
    (data.hasExer ? normalizedExercise : 0);

  return {
    quizEquivalent,
    totalExercise,
    normalizedExercise,
    normalizedQuiz,
    labStanding,
  };
}

/* ==========================================================
     DISPLAY
  ========================================================== */

/**
 * Displays the computed results.
 *
 * @param {Object} data
 * @param {Object} result
 */
function displayResults(data, result) {
  document.getElementById("quizAsExer").innerText =
    result.quizEquivalent.toFixed(2);

  document.getElementById("totalExer").innerText =
    result.totalExercise.toFixed(2);

  document.getElementById("normalizedQuiz").innerText =
    result.normalizedQuiz.toFixed(2);

  document.getElementById("normalizedExer").innerText =
    result.normalizedExercise.toFixed(2);

  document.getElementById("labStanding").innerText =
    result.labStanding.toFixed(2);

  document.getElementById("quizPercentResult").innerText =
    data.quizPercent > 0 ? `Quiz (in ${data.quizPercent}%):` : "Quiz (in __%):";

  document.getElementById("exerPercentResult").innerText =
    data.exerPercent > 0
      ? `Exercise (in ${data.exerPercent}%):`
      : "Exercise (in __%):";
}

/* ==========================================================
     CONTROLLER
  ========================================================== */

/**
 * Computes and displays the laboratory grade.
 */
function computeLabScore() {
  const inputs = getInputs();
  const results = calculateLabGrade(inputs);

  displayResults(inputs, results);
}
