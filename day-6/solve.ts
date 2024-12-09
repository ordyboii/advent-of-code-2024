import { readFile } from "fs/promises";

const example = await readFile(`${import.meta.dirname}/input.txt`, "utf-8");

const [block1, block2] = example.replace(/\r/g, "").split("\n\n");

const rules = block1.split("\n").map((line) => line.split("|"));
const updates = block2.split("\n").map((line) => line.split(","));

const correctUpdates = updates.filter((update) => checkRules(rules, update));
console.log(getMiddleSum(correctUpdates));

const notInOrderUpdates = updates.filter(
  (update) => !checkRules(rules, update)
);

const inOrderUpdates = notInOrderUpdates.map((update) => {
  const pages = new Set(update);
  const orderedPages: string[] = [];

  while (pages.size > 0) {
    for (const page of pages) {
      const canPlace = [...pages].every((otherPage) => {
        const rule = rules.find(([x, y]) => x === otherPage && y === page);
        return !rule || orderedPages.includes(rule[0]);
      });

      if (canPlace) {
        orderedPages.push(page);
        pages.delete(page);
        break;
      }
    }
  }

  return orderedPages;
});

console.log(getMiddleSum(inOrderUpdates));

function checkRules(rules: string[][], update: string[]) {
  return rules.every(([x, y]) => {
    const indexX = update.indexOf(x);
    const indexY = update.indexOf(y);
    return indexX === -1 || indexY === -1 || indexX < indexY;
  });
}

function getMiddleSum(updates: string[][]) {
  return updates.reduce((acc, update) => {
    const middle = update[Math.floor(update.length / 2)];
    return acc + Number(middle);
  }, 0);
}
