import { readFile } from "node:fs/promises";
import { join } from "node:path";

const example = await readFile(join("app/4/example.txt"), "utf-8");

const grid = example.split("\n").map((row) => row.split(""));
const word = "XMAS".split("");

let count = 0;
for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    count += checkAllDirections(x, y);
  }
}

console.log("XMAS count", count);

let newCount = 0;
for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    if (grid[x][y] === "A") {
      newCount += checkDiagonals(x, y);
    }
  }
}

console.log("New MAS count", newCount);

// Every direction on a 2d grid
function checkAllDirections(x: number, y: number) {
  // Map of directions
  const directions = [
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ];

  // Check if XMAS exists in all directions using map and return a total
  return directions.reduce((acc, { dx, dy }) => {
    const match = word.every(
      (char, index) => char === grid?.[x + index * dx]?.[y + index * dy]
    );

    return match ? acc + 1 : acc;
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
      { char: "M", dx: -1, dy: -1 },
      { char: "M", dx: -1, dy: 1 },
      { char: "S", dx: 1, dy: -1 },
      { char: "S", dx: 1, dy: 1 },
    ],
    [
      { char: "S", dx: -1, dy: -1 },
      { char: "S", dx: -1, dy: 1 },
      { char: "M", dx: 1, dy: -1 },
      { char: "M", dx: 1, dy: 1 },
    ],
    [
      { char: "M", dx: -1, dy: -1 },
      { char: "S", dx: -1, dy: 1 },
      { char: "M", dx: 1, dy: -1 },
      { char: "S", dx: 1, dy: 1 },
    ],
    [
      { char: "S", dx: -1, dy: -1 },
      { char: "M", dx: -1, dy: 1 },
      { char: "S", dx: 1, dy: -1 },
      { char: "M", dx: 1, dy: 1 },
    ],
  ];

  // Map over and check each pattern
  return patterns.reduce((acc, pattern) => {
    const match = pattern.every(
      ({ char, dx, dy }) =>
        grid?.[x + (dx as number)]?.[y + (dy as number)] === char
    );

    return match ? acc + 1 : acc;
  }, 0);
}
