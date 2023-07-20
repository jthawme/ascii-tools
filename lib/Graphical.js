import ShortUniqueId from "short-unique-id";
import { FONT } from "./characters.js";

const uid = new ShortUniqueId();

export class AsciiGraphical {
  #x = 0;
  #y = 0;

  #width = 0;
  #height = 0;

  font = "HEAVY";
  filled = false;

  id;

  constructor(width, height, { font = "HEAVY", filled = false } = {}) {
    this.#width = width;

    if (height) {
      this.#height = height;
    }

    this.font = font;
    this.filled = filled;
    this.id = uid();

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
    return this.#width;
  }

  set width(val) {
    this.#width = val;
  }

  get height() {
    return this.#height;
  }

  set height(val) {
    this.#height = val;
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
