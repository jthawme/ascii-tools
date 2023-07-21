import { AsciiCanvas } from "./Canvas.js";
import { getId } from "./common.js";

/**
 * @typedef {Array.<AsciiCanvas | AsciiMultiCanvas>} CanvasChild
 */

export class AsciiMultiCanvas {
  /** @type {CanvasChild} */
  #children = [];

  /** @type {string} */
  id;

  constructor(padding = 0) {
    this.id = getId();

    this.padding = padding;
  }

  get width() {
    return this.#children[0].width || 0;
  }

  /**
   *
   * @param {AsciiCanvas | AsciiCanvas[] | AsciiMultiCanvas | AsciiMultiCanvas[]} childOrChildren
   */
  add(childOrChildren) {
    const adders = Array.isArray(childOrChildren)
      ? childOrChildren
      : [childOrChildren];
    this.#children.push(...adders);

    return this;
  }

  remove(id) {
    this.#children.splice(
      this.#children.findIndex((child) => child.id === id),
      1
    );

    return this;
  }

  render() {
    const visuals = this.#children
      .map((child) => child.render())
      .map((characters) => ({
        characters,
        height: characters.split("\n").length,
      }));

    return visuals.reduce((totalCanvas, current, idx, arr) => {
      const prev = arr.slice(0, idx);
      const accumulativeHeight =
        prev.reduce((t, c) => t + c.height, 0) + prev.length * this.padding;

      return AsciiCanvas.spliceChars(
        totalCanvas,
        current.characters,
        0,
        accumulativeHeight + this.padding
      );
    }, " ".repeat(this.#children[0].width));
  }
}
