export const BOX = {
  TOP: "TOP",
  TR: "TR",
  RIGHT: "RIGHT",
  BR: "BR",
  BOTTOM: "BOTTOM",
  BL: "BL",
  LEFT: "LEFT",
  TL: "TL",
  BLANK: "BLANK",
  TOP_SPLIT: "TOP_SPLIT",
  RIGHT_SPLIT: "RIGHT_SPLIT",
  BOTTOM_SPLIT: "BOTTOM_SPLIT",
  LEFT_SPLIT: "LEFT_SPLIT",
  MIDDLE_SPLIT: "MIDDLE_SPLIT",
};

const HEAVY = {
  TOP: "━",
  TR: "┓",
  RIGHT: "┃",
  BR: "┛",
  BOTTOM: "━",
  BL: "┗",
  LEFT: "┃",
  TL: "┏",
  BLANK: " ",
  TOP_SPLIT: "┳",
  RIGHT_SPLIT: "┫",
  BOTTOM_SPLIT: "┻",
  LEFT_SPLIT: "┣",
  MIDDLE_SPLIT: "╋",
};

const HEAVY_FILLED = {
  ...HEAVY,
  // BLANK: "╬",
  BLANK: "▓",
};

export const FONT = {
  HEAVY,
  HEAVY_FILLED,
};
