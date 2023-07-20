import { AsciiBox } from "./Box.js";
import { AsciiCanvas } from "./Canvas.js";
import { AsciiGraphical } from "./Graphical.js";
import { AsciiText } from "./Text.js";

export class AsciiGrid extends AsciiGraphical {
  #cellHeight = 1;

  text = {};
  graphics = {};

  constructor(width, cellHeight, cols = 1, rows = 1, { graphics = {} } = {}) {
    super(width, (rows - 1) * (cellHeight - 1) + cellHeight, graphics);

    this.#cellHeight = cellHeight;

    this.cols = cols;
    this.rows = rows;
  }

  get cellWidth() {
    return Math.ceil(this.width / this.cols);
  }

  get cellHeight() {
    return this.#cellHeight;
  }

  boxFactory(x, y, opts) {
    const box = new AsciiBox(this.cellWidth, this.cellHeight, {
      ...opts,
      graphics: {
        ...(this.getGraphics(x, y) || {}),
      },
    });

    box.move(x * (this.cellWidth - 1), y * (this.cellHeight - 1));

    if (this.getText(x, y)) {
      const { text, align = "left" } = this.getText(x, y);

      box.text.addText(text).setAlign(align);
    }

    return box;
  }

  topRow() {
    const y = 0;
    return new Array(this.cols).fill(0).map((_, x, arr) => {
      return this.boxFactory(x, y, {
        continuesDown: this.rows > 1,
        continuesLeft: x > 0,
        continuesRight: x < arr.length - 1,
        continuesUp: false,
      });
    });
  }

  middleRow(y = 1) {
    return new Array(this.cols).fill(0).map((_, x, arr) => {
      return this.boxFactory(x, y + 1, {
        continuesDown: true,
        continuesLeft: x > 0,
        continuesRight: x < arr.length - 1,
        continuesUp: true,
      });
    });
  }

  bottomRow() {
    const y = this.rows - 1;

    return new Array(this.cols).fill(0).map((_, x, arr) => {
      return this.boxFactory(x, y, {
        continuesDown: false,
        continuesLeft: x > 0,
        continuesRight: x < arr.length - 1,
        continuesUp: true,
      });
    });
  }

  get characters() {
    const lineWidth = " ".repeat(this.width);

    const lines = () => {
      switch (this.rows) {
        case 1:
          return [...this.topRow()];
        case 2:
          return [...this.topRow(), ...this.bottomRow()];
        default:
          return [
            this.topRow(),
            ...new Array(this.rows - 2)
              .fill(0)
              .flatMap((_, row) => this.middleRow(row)),
            this.bottomRow(),
          ].flat();
      }
    };

    return lines().reduce((total, box) => {
      return AsciiCanvas.spliceChars(total, box.render(), box.x, box.y);
    }, lineWidth);
  }

  /**
   *
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {'left' | 'center' | 'right'} align
   */
  addText(text, x = 0, y = 0, align = AsciiText.TEXT_ALIGN.LEFT) {
    this.text[x] = {
      ...(this.text[x] ?? {}),
      [y]: { text, align },
    };
  }

  removeText(x = 0, y = 0) {
    delete this.text[x][y];
  }

  getText(x = 0, y = 0) {
    return this.text[x]?.[y];
  }

  addGraphics(opts = {}, x = 0, y = 0) {
    this.graphics[x] = {
      ...(this.graphics[x] ?? {}),
      [y]: { ...opts },
    };
  }

  removeGraphics(x = 0, y = 0) {
    delete this.graphics[x][y];
  }

  getGraphics(x = 0, y = 0) {
    return this.graphics[x]?.[y];
  }

  render() {
    return this.characters;
  }
}
