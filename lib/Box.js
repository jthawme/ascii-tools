import { AsciiCanvas } from "./Canvas.js";
import { AsciiGraphical } from "./Graphical.js";
import { AsciiText } from "./Text.js";
import { BOX } from "./characters.js";

export class AsciiBox extends AsciiGraphical {
  continuesLeft = false;
  continuesRight = false;
  continuesDown = false;
  continuesUp = false;

  /** @type {AsciiText} */
  text;

  constructor(
    width,
    height,
    {
      graphics = {},
      continuesRight = false,
      continuesLeft = false,
      continuesDown = false,
      continuesUp = false,
    } = {}
  ) {
    super(width, height, graphics);

    this.continuesLeft = continuesLeft;
    this.continuesRight = continuesRight;
    this.continuesDown = continuesDown;
    this.continuesUp = continuesUp;

    this.text = new AsciiText(width - 2);
  }

  get tl() {
    if (this.continuesUp && this.continuesLeft) {
      return BOX.MIDDLE_SPLIT;
    }

    if (this.continuesLeft) {
      return BOX.TOP_SPLIT;
    }

    if (this.continuesUp) {
      return BOX.LEFT_SPLIT;
    }

    return BOX.TL;
  }

  get tr() {
    if (this.continuesUp && this.continuesRight) {
      return BOX.MIDDLE_SPLIT;
    }

    if (this.continuesRight) {
      return BOX.TOP_SPLIT;
    }

    if (this.continuesUp) {
      return BOX.RIGHT_SPLIT;
    }

    return BOX.TR;
  }

  get bl() {
    if (this.continuesDown && this.continuesLeft) {
      return BOX.MIDDLE_SPLIT;
    }

    if (this.continuesLeft) {
      return BOX.BOTTOM_SPLIT;
    }

    if (this.continuesDown) {
      return BOX.LEFT_SPLIT;
    }

    return BOX.BL;
  }

  get br() {
    if (this.continuesDown && this.continuesRight) {
      return BOX.MIDDLE_SPLIT;
    }

    if (this.continuesRight) {
      return BOX.BOTTOM_SPLIT;
    }

    if (this.continuesDown) {
      return BOX.RIGHT_SPLIT;
    }

    return BOX.BR;
  }

  get characters() {
    const box = [
      [this.tl, ...new Array(this.width - 2).fill(BOX.TOP), this.tr],
      ...new Array(this.height - 2).fill([
        BOX.LEFT,
        ...new Array(this.width - 2).fill(BOX.BLANK),
        BOX.RIGHT,
      ]),
      [this.bl, ...new Array(this.width - 2).fill(BOX.BOTTOM), this.br],
    ]
      .map(this.convertLine)
      .map((line) => line.join(""))
      .join("\n");

    if (!!this.text.text) {
      console.log("hey there", this.text.render(), this.text.text);
      return AsciiCanvas.spliceChars(box, this.text.render(), 1, 1);
    }

    return box;
  }

  render() {
    return this.characters;
  }
}
