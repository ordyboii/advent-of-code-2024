import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/example.txt`, "utf-8");

const calibrations = input.split("\n").map((line) => {
  const test = Number(line.split(":")[0]);
  const sequence = line.split(":")[1].split(" ").filter(Boolean).map(Number);
  return { test, sequence };
});

const validCalibrations = calibrations.filter((calibration) => {
  // Test addition
  const addition = calibration.sequence.reduce((acc, num) => {
    return acc + num;
  });
  if (addition === calibration.test) return calibration;

  // Test multiplication
  const multiply = calibration.sequence.reduce((acc, num) => {
    return acc * num;
  });
  if (multiply === calibration.test) return calibration;

  if (calibration.sequence.length > 1) {
    // Test multiplcation and addition
    let lastOperator1 = "*";
    const multiply = calibration.sequence.reduce((acc, num) => {
      if (lastOperator1 === "*") {
        lastOperator1 = "+";
        return acc * num;
      }
      if (lastOperator1 === "+") {
        lastOperator1 = "*";
        return acc + num;
      }
      return acc;
    });
    if (multiply === calibration.test) return calibration;

    let lastOperator2 = "+";
    const addition = calibration.sequence.reduce((acc, num) => {
      if (lastOperator2 === "*") {
        lastOperator2 = "+";
        return acc * num;
      }
      if (lastOperator2 === "+") {
        lastOperator2 = "*";
        return acc + num;
      }
      return acc;
    });
    if (addition === calibration.test) return calibration;
  }

  return false;
});

const totalValidSum = validCalibrations.reduce(
  (acc, calibration) => acc + calibration.test,
  0
);

console.log(totalValidSum);
