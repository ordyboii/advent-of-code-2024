import { readFile } from "fs/promises";

const file = new URL("example.txt", import.meta.url);
const example = await readFile(file, "utf-8");

const reports = example.split("\n").map((line) => line.split(" ").map(Number));

type IncreaseOrDecrease = "increase" | "decrease";

const safeReports = reports.reduce((acc, report) => {
  if (checkReport(report)) {
    return acc + 1;
  } else {
    return acc;
  }
}, 0);

console.log("Safe reports:", safeReports);

// Part 2

let newSafeReports = 0;
reports.forEach((report) => {
  if (checkReport(report)) {
    newSafeReports += 1;
  } else {
    for (let i = 0; i < report.length; i++) {
      const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
      if (checkReport(modifiedReport)) {
        newSafeReports += 1;
        break;
      }
    }
  }
});

console.log("New safe reports:", newSafeReports);

// Common

function checkReport(report: number[]) {
  let unsafeReport = false;
  let previousIncreaseOrDecrease: IncreaseOrDecrease | undefined;
  let previousNumber: number | undefined;

  for (let i = 0; i < report.length; i++) {
    const currentNumber = report[i];
    if (i === 0) {
      previousNumber = currentNumber;
      continue;
    }

    let increaseOrDecrease: IncreaseOrDecrease;

    if (currentNumber > previousNumber!) {
      increaseOrDecrease = "increase";
    } else if (currentNumber < previousNumber!) {
      increaseOrDecrease = "decrease";
    } else {
      unsafeReport = true;
      break;
    }

    const difference = Math.abs(currentNumber - previousNumber!);

    if (difference < 1 || difference > 3) {
      unsafeReport = true;
      break;
    }

    if (
      previousIncreaseOrDecrease &&
      previousIncreaseOrDecrease !== increaseOrDecrease
    ) {
      unsafeReport = true;
      break;
    }

    previousIncreaseOrDecrease = increaseOrDecrease;
    previousNumber = currentNumber;
  }

  return !unsafeReport;
}
