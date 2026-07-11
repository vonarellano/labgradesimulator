let exerciseCount = 0;

// Adds a new input if the user decides to add a new exercise.
function addExercise() {
  exerciseCount++;

  const container = document.getElementById("exerciseContainer");

  const row = document.createElement("div");
  row.className = "exercise-row";

  row.innerHTML = `
      <label><i>Exer ${exerciseCount}:</i></label>
      <input
          type="number"
          class="exerScores"
          id="exer${exerciseCount}"
          placeholder="10"
          oninput="isNumber(this, 'exer${exerciseCount}Error')"
      >
      <button type="button" onclick="removeExercise(this)">
          <span class="material-symbols-outlined" style="font-size:16px;">
              delete
          </span>
      </button>
      <div id="exer${exerciseCount}Error" class="error"></div>
  `;

  container.appendChild(row);
}

// Function that removes the row of exer
function removeExercise(button) {
  const row = button.parentElement;
  row.remove();

  renumberExercises();
  computeLabScore();
}

// Renumber the exercises
function renumberExercises() {
  const rows = document.querySelectorAll(".exercise-row");

  exerciseCount = rows.length;

  rows.forEach((row, index) => {
    const number = index + 1;

    row.querySelector("label").innerHTML = `<i>Exer ${number}:</i>`;

    const input = row.querySelector("input");
    input.id = "exer" + number;
  });
}
