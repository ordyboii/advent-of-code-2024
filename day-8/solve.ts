import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/example.txt`, "utf-8");
const grid = input.split("\r\n").map((line) => line.split(""));

function inBounds(x: number, y: number) {
  const n = grid.length;
  return x >= 0 && x < n && y >= 0 && y < n;
}

function getAntinodes(antenna: typeof antennas[0]) {
  // Part 1 and 2 not solved
  return [];
}

const antennas: { value: string; coords: [number, number] }[] = [];
for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    if (grid[x][y] !== ".") {
      antennas.push({ value: grid[x][y], coords: [x, y] });
    }
  }
}

const antinodes = new Set<string>();
for (const antenna of antennas) {
  const newAntinodes = getAntinodes(antenna);
}

console.log(antinodes.size);
