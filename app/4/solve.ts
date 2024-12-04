import { readFile } from "fs/promises";

const file = new URL("input.txt", import.meta.url);
const example = await readFile(file, "utf-8");

const table = example.split("\n").map((row) => row.split(""));
const word = "XMAS".split("");

let count = 0;
for (let x = 0; x < table.length; x++) {
  for (let y = 0; y < table[0].length; y++) {
    count += checkAllDirections(x, y);
  }
}

console.log("XMAS count", count);

let newCount = 0;
for (let x = 0; x < table.length; x++) {
  for (let y = 0; y < table[0].length; y++) {
    if (table[x][y] === "A") {
      newCount += checkDiagonals(x, y);
    }
  }
}

console.log("New MAS count", newCount);

// Every direction on a 2d grid
function checkAllDirections(x: number, y: number) {
  // Map of directions
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  // Check if XMAS exists in all directions using map and return a total
  return directions.reduce((acc, [dx, dy]) => {
    const match = word.every(
      (char, index) => char === table?.[x + index * dx]?.[y + index * dy]
    );

    if (match) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

// 4 combintations of MAS as X shape, A is always in middle
// M M   S S   M S   S M
//  A     A     A     A
// S S   M M   M S   S M
function checkDiagonals(x: number, y: number) {
  // Map of the 4 patterns
  const patterns = [
    [
      ["M", -1, -1],
      ["M", -1, 1],
      ["S", 1, -1],
      ["S", 1, 1],
    ],
    [
      ["S", -1, -1],
      ["S", -1, 1],
      ["M", 1, -1],
      ["M", 1, 1],
    ],
    [
      ["M", -1, -1],
      ["S", -1, 1],
      ["M", 1, -1],
      ["S", 1, 1],
    ],
    [
      ["S", -1, -1],
      ["M", -1, 1],
      ["S", 1, -1],
      ["M", 1, 1],
    ],
  ];

  // Map over and check each pattern
  return patterns.reduce((acc, pattern) => {
    const match = pattern.every(
      ([char, dx, dy]) =>
        table?.[x + (dx as number)]?.[y + (dy as number)] === char
    );

    if (match) {
      return acc + 1;
    }
    return acc;
  }, 0);
}
