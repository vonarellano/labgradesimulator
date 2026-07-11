// Checks if the user input is a number
function isNumber(input, errorContainer) {
  const error = document.getElementById(errorContainer);

  if (input.value === "" || isNaN(input.value)) {
    error.innerText =
      "This field cannot be empty. Please enter a valid number.";
  } else {
    error.innerText = "";
  }

  computeLabScore();
}

// Hides or unhide a specific container based on whether the checkbox is checked on unchecked.
function hideOrUnhide(checkbox, containerId) {
  document.getElementById(containerId).hidden = !checkbox.checked;
}

// Compute the laboratory score
function computeLabScore() {
  const exers = document.querySelectorAll(".exerScores");

  const hasQuiz = Boolean(document.getElementById("quizzes").value);
  const quizScore = Number(document.getElementById("quizScore").value);
  const perfectQuiz = Number(document.getElementById("perfectQuizScore").value);

  var computedQuizAsExer = 0;
  // Get total quiz as exer score
  if (hasQuiz && perfectQuiz > 0) {
    computedQuizAsExer = (quizScore / perfectQuiz) * 10;
  }

  // Get total laboratory exercise score
  var totalExer = 0;
  exers.forEach((input) => {
    if (input.value !== "") {
      totalExer += Number(input.value);
    }
  });
  totalExer += computedQuizAsExer;

  document.getElementById("totalExer").innerText = totalExer;
  document.getElementById("quizAsExer").innerText = computedQuizAsExer;
}
