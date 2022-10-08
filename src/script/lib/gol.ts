/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Universe } from "wasm-game-of-life/wasm_game_of_life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import { clientToRect } from "./util";

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const speedInput = document.getElementById("speed-select") as HTMLInputElement;
const speedText = document.getElementById("speed-indicator") as HTMLElement;
const pauseResumeButton = document.getElementById("pause-resume") as HTMLButtonElement;
const pauseResumeIcon = pauseResumeButton.getElementsByTagName("img")[0] as HTMLImageElement;

const CELL_SIZE = 16; // px
const DELAYS = [2_000, 1_000, 500, 250, 100, 50, 10];

let cellCntX = Math.ceil(window.innerWidth / CELL_SIZE);
let cellCntY = Math.ceil(window.innerHeight / CELL_SIZE);
let delay = DELAYS[0];
let autostep = true;

const COL_LIVE = '#47BA00';
const COL_DEAD = '#D0D0D0';
const COL_GRID = '#000000';

canvas.width = cellCntX * CELL_SIZE;
canvas.height = cellCntY * CELL_SIZE;

let universe = Universe.random(cellCntX, cellCntY);
let redraw: 'none' | 'full' | 'cells' = 'full';
let lastDraw = Date.now();

window.addEventListener('resize', () => {
	cellCntX = Math.ceil(window.innerWidth / CELL_SIZE);
	cellCntY = Math.ceil(window.innerHeight / CELL_SIZE);
	canvas.width = cellCntX * CELL_SIZE;
	canvas.height = cellCntY * CELL_SIZE;
	
	universe.free();
	universe = Universe.random(cellCntX, cellCntY);
	
	redraw = 'full';
});

document.getElementById('step')!.onclick = stepSimulation;

canvas.addEventListener('click', event => {
	const canvasRect = canvas.getBoundingClientRect();
	const { x, y } = clientToRect(event, canvasRect);

	if (event.ctrlKey || event.metaKey) {
		universe.spawn_glider(Math.floor(x*cellCntX), Math.floor(y*cellCntY));
	} else {
		universe.toggle(Math.floor(x*cellCntX), Math.floor(y*cellCntY));
	}
	redraw = 'cells';
});

window.addEventListener('keypress', event => {
	if (event.key == ' ') {
		stepSimulation();
	}
});

speedInput.min = "0";
speedInput.max = `${DELAYS.length - 1}`;

speedInput.oninput = updateDelay;
updateDelay();

pauseResumeButton.onclick = () => {
	autostep = !autostep;
	updatePausePlayIcon();
}
updatePausePlayIcon();

function updatePausePlayIcon() {
	if (autostep) {
		pauseResumeIcon.src = "images/pause.svg";
		pauseResumeIcon.alt = "pause";
	} else {
		pauseResumeIcon.src = "images/resume.svg";
		pauseResumeIcon.alt = "resume";
	}
}

function stepSimulation() {
	universe.tick();
	redraw = 'cells';
}

function updateDelay() {
	delay = DELAYS[+speedInput.value];
	speedText.textContent = `${1000 / delay}x`;
}

function drawGrid() {
	ctx.strokeStyle = COL_GRID;
	
	// Vertical lines.
	for (let x = 0; x <= cellCntX; ++x) {
		ctx.moveTo(x * CELL_SIZE, 0);
		ctx.lineTo(x * CELL_SIZE, CELL_SIZE * cellCntY);
	}

	// Horizontal lines.
	for (let y = 0; y <= cellCntY; ++y) {
		ctx.moveTo(0, y * CELL_SIZE);
		ctx.lineTo(CELL_SIZE * cellCntX, y * CELL_SIZE);
	}

	ctx.stroke();
}

function cellAlive(cells: Uint8Array, x: number, y: number): boolean {
	const idx = (y * cellCntX) + x;
	const byte = Math.floor(idx / 8);
	const mask = 1 << (idx % 8);
	return (cells[byte] & mask) === mask;
}

function drawCells() {
	const cells = new Uint8Array(memory.buffer, universe.cells_ptr(), universe.cells_size());
  
	ctx.beginPath();
  
	for (let y = 0; y < cellCntY; ++y) {
		for (let x = 0; x < cellCntX; ++x) {  
			ctx.fillStyle = cellAlive(cells, x, y) ? COL_LIVE : COL_DEAD;
  
			ctx.fillRect(
				x * CELL_SIZE,
				y * CELL_SIZE,
				CELL_SIZE - 1,
				CELL_SIZE - 1
			);
		}
	}
  
	ctx.stroke();
}

function drawLoop() {
	const now = Date.now();

	if (autostep && ((now - lastDraw) >= delay)) {
		universe.tick();
		lastDraw = now;
		if (redraw != 'full') {
			redraw = 'cells';
		}
	}

	switch (redraw) {
	case 'full':
		drawGrid();
		drawCells();
		break;
	case 'cells':
		drawCells();
		break;
	}

	requestAnimationFrame(drawLoop);
}

drawLoop();