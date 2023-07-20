import { AsciiGraphical } from "./Graphical.js";

export class AsciiCanvas {
  /**
   * @type {number}
   */
  #width = 0;

  /**
   * @type {AsciiGraphical[]}
   */
  #children = [];

  constructor(width) {
    this.#width = width;
  }

  add(child) {
    this.#children.push(child);
  }

  addAll(children) {
    this.#children.push(...children);
  }

  remove(childId) {
    this.#children.splice(
      this.#children.findIndex((_child) => _child.id === childId),
      1
    );
  }

  /**
   *
   * @param {AsciiGraphical | string} childOrId
   */
  #resolveChild(childOrId) {
    return typeof childOrId === "string"
      ? this.#children.find((child) => child.id === childOrId)
      : childOrId;
  }

  /**
   *
   * @param {AsciiGraphical | string} childOrId
   */
  moveToTop(childOrId) {
    const child = this.#resolveChild(childOrId);

    if (!child) {
      return;
    }

    this.remove(child.id);
    this.#children = [...this.#children, child];
  }

  /**
   *
   * @param {AsciiGraphical | string} childOrId
   */
  moveToBack(childOrId) {
    const child = this.#resolveChild(childOrId);

    if (!child) {
      return;
    }

    this.remove(child.id);
    this.#children = [...this.#children, child];
  }

  render() {
    const height = Math.max(
      ...this.#children.map((child) => child.y + child.height)
    );

    const grid = new Array(height).fill(" ".repeat(this.#width)).join("\n");

    return this.#children
      .reduce((canvas, child) => {
        const chars = child.render();

        return AsciiCanvas.spliceChars(canvas, chars, child.x, child.y);
      }, grid)
      .split("\n")
      .map((line) => line.slice(0, this.#width))
      .join("\n");
  }

  static spliceLine(baseLine, spliceLine, start = 0) {
    return [
      baseLine.slice(0, start),
      spliceLine,
      baseLine.slice(start + spliceLine.length),
    ].join("");
  }

  static spliceChars(baseChars, spliceChars, x = 0, y = 0) {
    const lines = baseChars.split("\n");
    const spliceLines = spliceChars.split("\n");

    const totalHeight = Math.max(lines.length, spliceLines.length + y);

    if (lines.length < totalHeight) {
      lines.push(
        ...new Array(totalHeight - lines.length).fill(
          " ".repeat(lines[0].length)
        )
      );
    }

    return lines
      .map((line, row) => {
        if (row >= y && row < spliceLines.length + y) {
          return AsciiCanvas.spliceLine(line, spliceLines[row - y], x);
        }

        return line;
      })
      .join("\n");
  }
}
