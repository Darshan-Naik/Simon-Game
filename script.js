const targets = document.querySelectorAll(".color-box");
const startButton = document.querySelector(".start-button");
const flashing = document.querySelector(".flashing");
const levelTarget = document.querySelector(".level");
targets.forEach((target) => {
  target.addEventListener("click", targetClick);
});
let sequence = [];
let sequenceClone = [];
let block = true;
let level = 1;
async function targetClick({ target }) {
  if (block) return;
  const sequenceTarget = sequenceClone.shift();
  target.classList.add("flash");
  setTimeout(() => {
    target.classList.remove("flash");
  }, 100);
  await delay(100);
  if (target !== sequenceTarget) {
    flashing.innerHTML = `Game over! Score : ${level}`;
    reset();
  } else if (sequenceClone.length === 0) {
    flashing.innerHTML = "Nice!";
    await delay(1000);
    flash();
    level++;
    levelTarget.innerHTML = level;
  }
}

function getRandomTarget() {
  return targets[Math.floor(Math.random() * targets.length)];
}

async function flash() {
  flashing.innerHTML = "";
  block = true;
  await delay(1000);
  flashing.innerHTML = "Flashing...";
  sequence.push(getRandomTarget());
  sequenceClone = [...sequence];
  for (const target of sequence) {
    target.classList.add("flash");
    await new Promise((resolve) => {
      setTimeout(() => {
        target.classList.remove("flash");
        setTimeout(resolve, 250);
      }, 1000);
    });
  }
  flashing.innerHTML = "";
  block = false;
}

function pop() {}

function start() {
  startButton.disabled = true;
  flash();
}
function reset() {
  sequence = [];
  sequenceClone = [];
  startButton.disabled = false;
  startButton.innerText = "Start Again";
  level = 1;
  levelTarget.innerHTML = level;
}

startButton.addEventListener("click", start);

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
