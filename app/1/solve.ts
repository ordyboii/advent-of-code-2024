import { readFile } from "fs/promises";
import { resolve } from "path";

async function main() {
  // Part 1

  const example = await readFile(resolve(__dirname, "example.txt"), "utf-8");
  console.log("File input:", example);

  // 1. Split input into 2 arrays of numbers
  // 2. Sort both arrays from smallest to largest number
  // 3. Run a loop and find difference between the pair and sum

  const lines = example.split("\n");
  const columnOne: number[] = [];
  const columnTwo: number[] = [];

  lines.forEach((line) => {
    const [first, second] = line.split("  ").map((value) => parseInt(value));
    columnOne.push(first);
    columnTwo.push(second);
  });

  console.log("First column", columnOne);
  console.log("Second column", columnTwo);

  const lowToHighOne = columnOne.toSorted((a, b) => a - b);
  const lowToHighTwo = columnTwo.toSorted((a, b) => a - b);

  console.log("First column low to high", lowToHighOne);
  console.log("Second column low to high", lowToHighTwo);

  const total = lowToHighOne
    .map((num, index) => {
      return Math.abs(num - lowToHighTwo[index]);
    })
    .reduce((a, b) => a + b, 0);

  console.log("Total of distances", total);

  // Part 2

  // 1. Loop through column 1 and reduce
  // 2. Reduce to find how many instances of the number are in column 2
  // 3. Sum all instances

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
}

main().catch((error) => {
  console.error(`An error occured ${error}`);
});
