import { AsciiGraphical } from "./Graphical.js";

/**
 * @typedef {'left' | 'center' | 'right'} TextAlign
 */

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

  constructor(width, { graphics = {} } = {}) {
    super(width, null, graphics);
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
    return this.text
      .split(" ")
      .reduce(
        (total, word) => {
          const currentLineLength = total[total.length - 1].join(" ").length;

          if (currentLineLength + " " + word.length > this.width - 2) {
            total.push([]);
          }

          total[total.length - 1].push(word);

          return total;
        },
        [[]]
      )
      .map((line) => line.join(" "))
      .map((line) => {
        const lineLength = line.length;
        const diff = this.width - lineLength;

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
      });
  }

  get height() {
    return this.lines.length;
  }

  render() {
    console.log(this.lines);
    return this.lines.join("\n");
  }
}
