const canvas = document.querySelector('canvas');
const lineWidth = document.querySelector('#lineWidth');
const colorChange = document.querySelector('#colorChange');
const colorOption = [...document.querySelectorAll('.colorOption')];
const modeBtn = document.querySelector('#modeBtn');
const resetBtn = document.querySelector('#resetBtn');
const eraseBtn = document.querySelector('#eraseBtn');
const fileInput = document.querySelector('#file');
const textInput = document.querySelector('#text');
const saveBtn = document.querySelector('#save');

const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';

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
function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);

  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}
function onDoubleClick(e) {
  const text = textInput.value;
  if (text !== '') {
    ctx.save(); // ctx의 현재 상태를 저장
    // ctx.lineWidth = 1;
    ctx.font = '48px serif';
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore(); // 상태 저장값으로 복구
  }
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
}

canvas.addEventListener('mousemove', onMove);
// === canvas.onmousemove = onMove;
canvas.addEventListener('mousedown', onMounseUpDown);
canvas.addEventListener('mouseup', onMounseUpDown);
canvas.addEventListener('mouseleave', onMounseUpDown);
canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('dblclick', onDoubleClick);

lineWidth.addEventListener('change', onLineWidthChange);
colorChange.addEventListener('change', onColorChange);
colorOption.forEach((color) => {
  color.addEventListener('click', onColorClick);
});

modeBtn.addEventListener('click', onModeClick);
resetBtn.addEventListener('click', onResetClick);
eraseBtn.addEventListener('click', onEraseClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
