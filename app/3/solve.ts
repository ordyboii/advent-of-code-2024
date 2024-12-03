import { readFile } from "fs/promises";
import { resolve } from "path";

async function main() {
  const example = await readFile(resolve(__dirname, "example.txt"), "utf-8");

  const matches = example.match(/mul\(\d+,\d+\)/g);

  const total = matches.reduce((acc, match) => {
    return acc + calculate(match);
  }, 0);

  console.log("Total", total);

  const matches2 = example.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);

  let enabled = true;
  const total2 = matches2.reduce((acc, match) => {
    if (match === "do()") {
      enabled = true;
    } else if (match === "don't()") {
      enabled = false;
    } else if (enabled) {
      acc += calculate(match);
    } else {
      return acc;
    }

    return acc;
  }, 0);

  console.log("Total 2", total2);

  function calculate(match: string) {
    const remove = match.replace("mul(", "");
    const remove2 = remove.replace(")", "");
    const [num1, num2] = remove2.split(",").map(Number);
    return num1 * num2;
  }
}

main().catch((error) => {
  console.error(`An error occurred: ${error}`);
});
