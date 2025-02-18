// Load Flinty's stats from localStorage, or initialize to 100
let hunger = parseInt(localStorage.getItem("hunger"), 10) || 100;
let happiness = parseInt(localStorage.getItem("happiness"), 10) || 100;
let energy = parseInt(localStorage.getItem("energy"), 10) || 100;

setInterval(toggleIdleAnimation, 5000); // Switch every 5 seconds

function updateStats() {
  localStorage.setItem("hunger", hunger);
  localStorage.setItem("happiness", happiness);
  localStorage.setItem("energy", energy);

  updateStatBar("hunger-fill", hunger);
  updateStatBar("happiness-fill", happiness);
  updateStatBar("energy-fill", energy);
}

// Toggle between idle and idle2 animations
let idleState = true; // Tracks which idle animation is active

function toggleIdleAnimation() {
  if (!flinty.classList.contains("eating") && !flinty.classList.contains("playing") && !flinty.classList.contains("sleeping")) {
    idleState = !idleState;
    changeAnimation(idleState ? "idle" : "idle2");
  }
}

function updateStatBar(statId, value) {
  const fillElement = document.getElementById(statId);
  fillElement.style.width = `${value}%`;

  if (value < 20) {
    fillElement.style.backgroundColor = "#d10000"; // Red
  } else if (value < 40) {
    fillElement.style.backgroundColor = "#d1a000"; // Dark Yellow
  } else {
    fillElement.style.backgroundColor = "#76c7c0"; // Default Teal
  }
}

const flinty = document.getElementById("flinty");

function changeAnimation(newClass) {
  flinty.className = "";
  void flinty.offsetWidth; // Force reflow to restart the animation
  flinty.classList.add(newClass);

  if (newClass !== "idle" && newClass !== "idle2") {
    setTimeout(() => checkFlintyMood(), 1000); // Ensure Flinty returns to idle
  }
}

function feedFlinty() {
  hunger = Math.min(100, hunger + 20);
  changeAnimation("eating");
  updateStats();
}

function playWithFlinty() {
  happiness = Math.min(100, happiness + 20);
  changeAnimation("playing");
  updateStats();
}

function putFlintyToSleep() {
  energy = Math.min(100, energy + 30);
  changeAnimation("sleeping");
  updateStats();
}

function checkFlintyMood() {
  let lowStatsCount = 0;

  if (hunger <= 20) lowStatsCount++;
  if (happiness <= 20) lowStatsCount++;
  if (energy <= 20) lowStatsCount++;

  if (lowStatsCount >= 2) {
    changeAnimation("sick");
    return;
  }

  lowStatsCount = 0; // Reset count for hurt condition

  if (hunger <= 40) lowStatsCount++;
  if (happiness <= 40) lowStatsCount++;
  if (energy <= 40) lowStatsCount++;

  if (lowStatsCount >= 2) {
    changeAnimation("hurt");
    return;
  }

  if (hunger <= 30) {
    changeAnimation("hungry");
  } else if (energy <= 20) {
    changeAnimation("tired");
  } else {
    changeAnimation("idle");
  }
}

setInterval(() => {
  hunger = Math.max(0, hunger - 2);
  happiness = Math.max(0, happiness - 1);
  energy = Math.max(0, energy - 1);
  updateStats();
  checkFlintyMood();
}, 10000);

const music = document.getElementById("background-music");
const musicBtn = document.getElementById("music-btn");

function toggleMusic() {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "Pause Music";
  } else {
    music.pause();
    musicBtn.textContent = "Play Music";
  }
}

updateStats();
