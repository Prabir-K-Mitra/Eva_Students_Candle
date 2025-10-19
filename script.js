// Redirect to login if not logged in
/*if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "login.html";
}*/

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});


// "Database" – names grouped by class
const classes = {
  class1A: [
    { number: 1, name: "Eldrid" },
    { number: 2, name: "David" },
    { number: 3, name: "Tobias" },
    { number: 4, name: "Sophie" },
    { number: 5, name: "Kiara" },
    { number: 6, name: "Noel" },
    { number: 7, name: "Romy" },
    { number: 8, name: "Dankred" },
    { number: 9, name: "Leo" },
    { number: 10, name: "Fabian" },
    { number: 11, name: "Kristin" },
    { number: 12, name: "Joana-Francesca" },
    { number: 13, name: "Elias" },
    { number: 14, name: "Florian" },
    { number: 15, name: "Llucia" },
    { number: 16, name: "Greta" },
    { number: 17, name: "Raphael S" },
    { number: 18, name: "Phillip" },
    { number: 19, name: "Sofia" },
    { number: 20, name: "Raphael W" },
    { number: 21, name: "Maximilian" },
    { number: 21, name: "Martin" }
  ],
  class1C: [
    { number: 1, name: "Helena-Lara" },
    { number: 2, name: "Emma" },
    { number: 3, name: "Samuel" },
    { number: 4, name: "Felix" },
    { number: 5, name: "Gustav" },
    { number: 6, name: "Karla" },
    { number: 7, name: "Lukas" },
    { number: 8, name: "Marcel" },
    { number: 9, name: "Ella" },
    { number: 10, name: "Konstantin" },
    { number: 11, name: "Anna" },
    { number: 12, name: "Franziska" },
    { number: 13, name: "Severin" },
    { number: 14, name: "Marie" },
    { number: 15, name: "Sigrid" },
    { number: 16, name: "Elisabeth" },
    { number: 17, name: "Linda Charlotte" }
  ],
  class2B: [
    { number: 1, name: "Niklas" },
    { number: 2, name: "Theresa" },
    { number: 3, name: "Lena" },
    { number: 4, name: "Sophie" },
    { number: 5, name: "Jonas" },
    { number: 6, name: "Jana" },
    { number: 7, name: "Carlotta" },
    { number: 8, name: "Simon" },
    { number: 9, name: "Lia" },
    { number: 10, name: "Laura" },
    { number: 11, name: "Annika" },
    { number: 12, name: "Marilena" },
    { number: 13, name: "Valentina" },
    { number: 14, name: "Katharina" },
    { number: 15, name: "Thorsten" },
    { number: 16, name: "Connor" },
    { number: 17, name: "Stefan" },
    { number: 18, name: "Moritz R" },
    { number: 19, name: "Eva" },
    { number: 20, name: "Benjamin S" },
    { number: 21, name: "Moritz S" },
    { number: 22, name: "Tobias" },
    { number: 23, name: "Benjamin W" },
    { number: 24, name: "Ella" }
  ],
  class2D: [
    { number: 1, name: "Amelie" },
    { number: 2, name: "Friedrich" },
    { number: 3, name: "Leonora" },
    { number: 4, name: "Finy-Simone" },
    { number: 5, name: "Alina" },
    { number: 6, name: "Julia" },
    { number: 7, name: "Nadja" },
    { number: 8, name: "Florian" },
    { number: 9, name: "Leon" },
    { number: 10, name: "Philipp" },
    { number: 11, name: "Colin" },
    { number: 12, name: "Franziska" },
    { number: 13, name: "Pia" },
    { number: 14, name: "Lena R" },
    { number: 15, name: "Emma" },
    { number: 16, name: "Lena S" },
    { number: 17, name: "Raphael" }
  ],
  class3B: [
    { number: 1, name: "Finja" },
    { number: 2, name: "Sophie" },
    { number: 3, name: "Alisa" },
    { number: 4, name: "Clemens" },
    { number: 5, name: "Bennet" },
    { number: 6, name: "David" },
    { number: 7, name: "Maximilian P" },
    { number: 8, name: "Marlene" },
    { number: 9, name: "Lena" },
    { number: 10, name: "Emilia" },
    { number: 11, name: "Maximilian S" },
    { number: 12, name: "Antonia" },
    { number: 13, name: "Albert" },
    { number: 14, name: "Lennard" },
    { number: 15, name: "Sofia" },
    { number: 16, name: "Emelie" },
    { number: 17, name: "Leopoldine" },
    { number: 17, name: "Lilith" }
  ]
};

let selectedClass = null;
let excludedNames = [];

const classSelection = document.getElementById("classSelection");
const missingSelection = document.getElementById("missingSelection");
const generatorSection = document.getElementById("generatorSection");

const classSelect = document.getElementById("classSelect");
const missingList = document.getElementById("missingList");
const classTitle = document.getElementById("classTitle");
const classCount = document.getElementById("classCount");
const resultEl = document.getElementById("result");

// Step 1: User selects class
document.getElementById("nextBtn").addEventListener("click", () => {
  selectedClass = classSelect.value;
  if (!selectedClass) {
    alert("Please select a class first!");
    return;
  }

  const studentList = classes[selectedClass];

  // Show missing selection
  missingList.innerHTML = "";
  studentList.forEach((s) => {
    const div = document.createElement("div");
    div.innerHTML = `<label>
      <input type="checkbox" value="${s.name}" /> ${s.name}
    </label>`;
    missingList.appendChild(div);
  });
  
  classSelection.classList.add("hidden");
  missingSelection.classList.remove("hidden");
  generatorSection.classList.add("hidden");
});

// Step 2: User selects missing people
document.getElementById("startBtn").addEventListener("click", () => {
  const checkboxes = missingList.querySelectorAll("input[type='checkbox']");
  excludedNames = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
    
  const allStudents = classes[selectedClass];
  const activeStudents = allStudents.filter(s => !excludedNames.includes(s.name));

  if (activeStudents.length === 0) {
    alert("No students left to choose from!");
    return;
  }

  classTitle.textContent = "Klasse: " + classSelect.options[classSelect.selectedIndex].text;
  classCount.textContent = `Anzahl der anwesenden Studierenden: ${activeStudents.length}`;

  missingSelection.classList.add("hidden");
  generatorSection.classList.remove("hidden");
  
});

// Step 3: Random generation
document.getElementById("generateBtn").addEventListener("click", () => {
  const active = classes[selectedClass].filter(s => !excludedNames.includes(s.name));
  const randomIndex = Math.floor(Math.random() * active.length);
  const name = active[randomIndex].name;

  const sparkContainer = document.querySelector(".spark-container");
  const flame = document.querySelector(".flame");
  const result = document.getElementById("result");
  
  // Reset previous animations
  sparkContainer.innerHTML = "";
  flame.classList.remove("animate");
  result.classList.remove("animate");
  result.textContent = "";

  // --- Trigger Sparks ---
  for (let i = 0; i < 50; i++) { // 8 sparks
    const dotYellow = document.createElement("div");
    const dotOrage = document.createElement("div");
    dotYellow.classList.add("spark-dot-yellow");
    dotOrage.classList.add("spark-dot-orange");

    const angleYellow = Math.random() * 2 * Math.PI;
    const distanceYellow = 50 + Math.random() * 200; // px
    const angleOrange = Math.random() * 2 * Math.PI;
    const distanceOrange = 50 + Math.random() * 100; // px

    dotYellow.style.setProperty('--x', `${Math.cos(angleYellow)*distanceYellow}px`);
    dotYellow.style.setProperty('--y', `${Math.sin(angleYellow)*distanceYellow}px`);
    
    dotOrage.style.setProperty('--x', `${Math.cos(angleOrange)*distanceOrange}px`);
    dotOrage.style.setProperty('--y', `${Math.sin(angleOrange)*distanceOrange}px`);

    sparkContainer.appendChild(dotYellow);
    sparkContainer.appendChild(dotOrage);

    document.querySelector(".right-column").classList.remove("hidden");
    document.querySelector(".candle").classList.add("hidden");

    // Trigger animation
    setTimeout(() => {
      dotYellow.classList.add("animate");
    }, 10);
    setTimeout(() => {
      dotOrage.classList.add("animate");
    }, 10);
  }

  document.querySelector(".candle").classList.remove("hidden");
  
  // --- Trigger candle after sparks finish ---
  setTimeout(() => {
    //candle.style.display = "block";
    flame.classList.add("animate");
  }, 600);
 
  // --- Show name after flame animation ---
  setTimeout(() => {
    result.textContent = name;
    result.classList.add("animate");
  }, 600);
}); // ← This is the correct closing parenthesis for addEventListener


// Step 4: Back buttons
document.getElementById("backToMissingSelection").addEventListener("click", () => {
  generatorSection.classList.add("hidden");
  missingSelection.classList.remove("hidden");
});

document.getElementById("backToClass").addEventListener("click", () => {
  missingSelection.classList.add("hidden");
  classSelection.classList.remove("hidden");
});
