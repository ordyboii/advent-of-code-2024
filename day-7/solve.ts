import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/example.txt`, "utf-8");

// Parse into [{ test: 123, sequence [1,2,3] }]
const calibrations = input.split("\n").map((line) => {
  const test = Number(line.split(":")[0]);
  const sequence = line.split(":")[1].split(" ").filter(Boolean).map(Number);
  return { test, sequence };
});

// Recursively call to find all operations of + * (part 1) and || (part 2)
// Example: 3267: 81 40 27
// 1: 3267, [81,40,27]
// 2: 3267, [81,40,27] [+,+,+]
// 3: Match length, evalute called
function findOperators(
  { test, sequence }: (typeof calibrations)[0],
  operators: string[] = []
) {
  if (operators.length === sequence.length - 1) {
    return evaluateExpression(sequence, operators) === test;
  }
  return (
    findOperators({ sequence, test }, operators.concat("+")) ||
    findOperators({ sequence, test }, operators.concat("*")) ||
    findOperators({ sequence, test }, operators.concat("||"))
  );
}

// Loop through the sequence
function evaluateExpression(sequence: number[], operators: string[]) {
  let result = sequence[0];
  for (let i = 1; i < sequence.length; i++) {
    if (operators[i - 1] === "+") {
      result += sequence[i];
    } else if (operators[i - 1] === "*") {
      result *= sequence[i];
    } else if (operators[i - 1] === "||") {
      result = Number(result.toString() + sequence[i].toString());
    }
  }
  return result;
}

const validCalibrationsTotal = calibrations
  .filter((calibration) => findOperators(calibration))
  .reduce((acc, calibration) => acc + calibration.test, 0);

console.log(validCalibrationsTotal);
