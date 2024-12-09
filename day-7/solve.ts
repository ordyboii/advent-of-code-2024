import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, "utf-8");

const calibrations = input.split("\n").map((line) => {
  const test = Number(line.split(":")[0]);
  const sequence = line.split(":")[1].split(" ").filter(Boolean).map(Number);
  return { test, sequence };
});

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
