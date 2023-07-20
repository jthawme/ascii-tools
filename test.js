import { AsciiBox } from "./lib/Box.js";
import { AsciiCanvas } from "./lib/Canvas.js";
import { AsciiGrid } from "./lib/Grid.js";

const LINE_WIDTH = 60;

const canvas = new AsciiCanvas(LINE_WIDTH);

const cols = 6;
const grid = new AsciiGrid(
  LINE_WIDTH,
  Math.round(LINE_WIDTH * 0.5 * (1 / cols)),
  cols,
  4
);
grid.addText("Test", 0, 0);
grid.addGraphics(
  {
    filled: true,
  },
  1
);
canvas.add(grid);

console.log(canvas.render());
