import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

export const getId = () => uid();

export const convertOrdinance = (numOrArr) => {
  const arr = Array.isArray(numOrArr) ? numOrArr : [numOrArr];

  switch (arr.length) {
    case 1:
      return new Array(4).fill(arr[0]);
    case 2:
      return [arr[0], arr[1], arr[0], arr[1]];
    case 3:
      return [arr[0], arr[1], arr[2], arr[1]];
    default:
      return arr.slice(0, 4);
  }
};
