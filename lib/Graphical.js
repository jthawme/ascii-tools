import { FONT } from "./characters.js";
import { getId } from "./common.js";

export class AsciiGraphical {
  #x = 0;
  #y = 0;

  _width = 0;
  _height = 0;

  font = "HEAVY";
  filled = false;

  id;

  constructor(width, height, { font = "HEAVY", filled = false } = {}) {
    this._width = width;

    if (height) {
      this._height = height;
    }

    this.font = font;
    this.filled = filled;
    this.id = getId();

    this.convertLine = this.convertLine.bind(this);

    return this;
  }

  move(x, y) {
    this.#x = x;
    this.#y = y;

    return this;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get width() {
    return this._width;
  }

  set width(val) {
    this._width = val;
  }

  get height() {
    return this._height;
  }

  set height(val) {
    this._height = val;
  }

  /**
   *
   * @param {string[]} arr
   */
  convertLine(arr) {
    const getFont = () => {
      if (this.filled && `${this.font}_FILLED` in FONT) {
        return FONT[`${this.font}_FILLED`];
      }

      return FONT[this.font];
    };

    return arr.map((char) => getFont()[char]);
  }

  render() {
    return `${this.id} has not got a render`;
  }
}
