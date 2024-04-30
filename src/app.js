const canvas = document.querySelector('canvas');
const lineWidth = document.querySelector('#lineWidth');
const colorChange = document.querySelector('#colorChange');
const colorOption = [...document.querySelectorAll('.colorOption')];
const modeBtn = document.querySelector('#modeBtn');
const resetBtn = document.querySelector('#resetBtn');
const eraseBtn = document.querySelector('#eraseBtn');

const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMounseUpDown(e) {
  if (e.type === 'mousedown') {
    isPainting = true;
  } else if (e.type === 'mouseup' || e.type === 'mouseleave') {
    isPainting = false;
  }
}

function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}
function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}
function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  colorChange.value = colorValue;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
  } else {
    isFilling = true;
    modeBtn.innerText = 'Draw';
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onResetClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraseClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = 'Fill';
  ctx.lineWidth = lineWidth.value;
  ctx.stroke();
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMounseUpDown);
canvas.addEventListener('mouseup', onMounseUpDown);
canvas.addEventListener('mouseleave', onMounseUpDown);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
colorChange.addEventListener('change', onColorChange);
colorOption.forEach((color) => {
  color.addEventListener('click', onColorClick);
});

modeBtn.addEventListener('click', onModeClick);
resetBtn.addEventListener('click', onResetClick);
eraseBtn.addEventListener('click', onEraseClick);
