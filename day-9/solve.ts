import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/example.txt`, { 
  encoding: "utf8"
});

function convertDenseDiskMapToFull(diskmap: string) {
  let id = 0;
  return diskmap.split("").map((char, idx) => {
    if (idx % 2 === 0) {
      const files = id.toString().repeat(Number(char));
      id++;
      return files;
    } else if (idx % 2 === 1) {
      return ".".repeat(Number(char));
    } else {
      return;
    }
  }).join("");
}

const diskmap = convertDenseDiskMapToFull(input);
console.log(diskmap);

function compactDiskmap(diskmap: string) {
  const chars = diskmap.split("");
  const compacted: string[] = [];
  let dotCount = 0;

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === ".") {
      dotCount++;
    } else {
      // Move characters from the end based on the dot count
      // Problem while loop works up until it encounters dots on the other side
      while (chars.at(-1) === ".") {
        chars.pop();
      }
      while (dotCount > 0 && chars.at(-1) !== ".") {
        const char = chars.pop()!;
        compacted.push(char);
        dotCount--;
      }
      compacted.push(chars[i]);
    }
  }

  return compacted.join("");
}

const compacted = compactDiskmap(diskmap);
// Part 1 and part 2, not solved yet
// const checksum = compacted.reduce((acc, num, idx) => {
//   const sum = acc += (idx * Number(num));
//   console.log(sum, "index", idx, "num", num);
//   return sum;
// }, 0);

console.log(compacted);