import { readFile } from "node:fs/promises";
import { join } from "node:path";

const example = await readFile(join("app/1/example.txt"), "utf-8");

const lines = example.split("\n");
const columnOne: number[] = [];
const columnTwo: number[] = [];

lines.forEach((line) => {
  const [first, second] = line.split("  ").map(Number);
  columnOne.push(first);
  columnTwo.push(second);
});

const lowToHighOne = columnOne.toSorted((a, b) => a - b);
const lowToHighTwo = columnTwo.toSorted((a, b) => a - b);

const total = lowToHighOne
  .map((num, index) => {
    return Math.abs(num - lowToHighTwo[index]);
  })
  .reduce((a, b) => a + b, 0);

console.log("Total of distances", total);

let score = 0;
columnOne.forEach((num) => {
  const instances = columnTwo.reduce((a, b) => {
    if (num === b) {
      return a + 1;
    }
    return a;
  }, 0);

  console.log(`${num} appears ${instances} times in column 2`);

  score += num * instances;
});

console.log("Total similarity score", score);
