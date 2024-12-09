import { readFile } from "fs/promises";
import { waitFor } from "../lib";

const input = await readFile(`${import.meta.dirname}/example.txt`, "utf-8");
const grid = input.split("\n").map((row) => row.split(""));

let [x, y] = getStartCoords(grid) ?? [];

function getStartCoords(grid: string[][]) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "^") {
        return [x, y];
      }
    }
  }
}

// Simulate the walk
// Can only travel up, down, left and right
const directions = [
  { dx: -1, dy: 0 }, // Up
  { dx: 0, dy: 1 }, // Right
  { dx: 1, dy: 0 }, // Down
  { dx: 0, dy: -1 }, // Left
];

let direction = 0; // Up: 0, Right: 1, Down: 2, Left: 3
const visited = new Set<string>();
while (true) {
  grid[x][y] = "X";
  visited.add(`${x}:${y}`);

  console.log(`Current position, ${x}:${y}:${direction}`);
  console.log(grid.map((row) => row.join(" ")).join("\n"));

  // Debugging
  // await waitFor(100);

  // Check the next position
  const nextX = x + directions[direction].dx;
  const nextY = y + directions[direction].dy;

  // Out of bounds
  if (
    nextX < 0 ||
    nextX >= grid.length ||
    nextY < 0 ||
    nextY >= grid[0].length
  ) {
    break;
  }

  if (grid[nextX][nextY] === "#") {
    // Turn 90 degrees right to avoid the obstacle
    direction = (direction + 1) % 4;
  } else {
    // Move forward
    x = nextX;
    y = nextY;
  }
}

console.log(visited.size);

// Part 2
// NOT SOLVED

// const newInput = await readFile(`${import.meta.dirname}/example.txt`, "utf-8");
// const newGrid = newInput.split("\n").map((row) => row.split(""));

// let [newX, newY] = getStartCoords(newGrid) ?? [];

// let obstacles = 0;
// for (const place of visited) {
//   if (await willLoop(place)) obstacles++;
// }

// console.log(obstacles);

// async function willLoop(place: string) {
//   const [oX, oY] = place.split(":").map(Number);
//   if (newGrid[oX][oY] === "#") return false;

//   newGrid[oX][oY] = "#";

//   let direction = 0;
//   const seen = new Set<string>();
//   while (true) {
//     const state = `${newX}:${newY}:${direction}`;
//     if (seen.has(state)) {
//       newGrid[oX][oY] = ".";
//       return true;
//     }

//     visited.add(`${newX}:${newY}`);

//     console.log(`Current position, ${newX}:${newY}:${direction}`);
//     console.log(newGrid.map((row) => row.join(" ")).join("\n"));

//     // Debugging
//     await waitFor(1000);

//     // Check the next position
//     const nextX = newX + directions[direction].dx;
//     const nextY = newY + directions[direction].dy;

//     // Out of bounds
//     if (
//       nextX < 0 ||
//       nextX >= newGrid.length ||
//       nextY < 0 ||
//       nextY >= newGrid[0].length
//     ) {
//       break;
//     }

//     if (newGrid[nextX][nextY] === "#") {
//       // Turn 90 degrees right to avoid the obstacle
//       direction = (direction + 1) % 4;
//     } else {
//       // Move forward
//       newX = nextX;
//       newY = nextY;
//     }
//   }

//   newGrid[oX][oY] = ".";
//   return false;
// }
