import { AsciiGraphical } from "./Graphical.js";
import { convertOrdinance } from "./common.js";

/**
 * @typedef {'left' | 'center' | 'right'} TextAlign
 */

const NEW_LINE_DELIMITER = "\\--@@--\\";

export class AsciiText extends AsciiGraphical {
  static get TEXT_ALIGN() {
    return {
      LEFT: "left",
      CENTER: "center",
      RIGHT: "right",
    };
  }

  /** @type {string} */
  text = "";

  /** @type {TextAlign} */
  align = AsciiText.TEXT_ALIGN.LEFT;

  #padding = [0, 0, 0, 0];

  /**
   *
   * @param {number} width
   * @param {number | [number, number] | [number, number, number] | [number,number,number,number]} padding
   * @param {*} param2
   */
  constructor(width, padding = 0, { graphics = {} } = {}) {
    super(width, null, graphics);

    this.#padding = convertOrdinance(padding);
  }

  set padding(val) {
    this.#padding = convertOrdinance(val);
  }

  get height() {
    return this.lines.length + (this.#padding[0] + this.#padding[2]);
  }

  /**
   *
   * @param {string} text
   * @returns {AsciiText}
   */
  addText(text) {
    this.text = text;

    return this;
  }

  /**
   *
   * @param {TextAlign} align
   * @returns
   */
  setAlign(align) {
    this.align = align;
    return this;
  }

  get lines() {
    const maxLineLength = this.width - this.#padding[1] * this.#padding[3];

    const paddingLinesTop = new Array(this.#padding[0]).fill(
      " ".repeat(this.width)
    );
    const paddingLinesBottom = new Array(this.#padding[2]).fill(
      " ".repeat(this.width)
    );

    return [
      ...paddingLinesTop,
      ...this.text
        .split("\n")
        .join(` ${NEW_LINE_DELIMITER} `)
        .split(" ")
        .reduce(
          (total, word) => {
            const currentLineLength = total[total.length - 1].join(" ").length;

            if (
              currentLineLength + " " + word.length > maxLineLength ||
              word === NEW_LINE_DELIMITER
            ) {
              total.push([]);
            }

            if (word !== NEW_LINE_DELIMITER) {
              total[total.length - 1].push(word);
            }

            return total;
          },
          [[]]
        )
        .map((line) =>
          [
            " ".repeat(this.#padding[3]),
            line.join(" "),
            " ".repeat(this.#padding[4]),
          ].join("")
        )
        .map((line) => {
          const lineLength = line.length;
          const diff = maxLineLength - lineLength;

          switch (this.align) {
            case "right":
              return " ".repeat(diff) + line;
            case "center":
              return (
                " ".repeat(Math.ceil(diff / 2)) +
                line +
                " ".repeat(Math.floor(diff / 2))
              );
            case "left":
              return line + " ".repeat(diff);
          }
        }),
      ...paddingLinesBottom,
    ];
  }

  get height() {
    return this.lines.length;
  }

  render() {
    return this.lines.join("\n");
  }
}
