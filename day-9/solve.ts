import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, {
  encoding: "utf8",
});

function convertDiskMap(diskmap: string) {
  const split = diskmap.split("").map(Number);
  const fs: string[] = [];

  let id = 0;
  for (let i = 0; i < split.length; i++) {
    const count = Number(split[i]);
    if (i % 2 === 0) {
      const files = Array(count).fill(id.toString());
      id++;
      for (const file of files) {
        fs.push(file);
      }
    } else {
      const dots = ".".repeat(count);
      for (const dot of dots) {
        fs.push(dot);
      }
    }
  }

  return fs;
}

function compactDiskMap(fs: string[]) {
  for (let i = 0; i < fs.length; i++) {
    if (fs[i] === ".") {
      while (true) {
        const temp = fs.pop()!;
        if (temp === ".") {
          continue;
        } else {
          fs[i] = temp;
          break;
        }
      }
    }
  }
  return fs;
}

const fs = convertDiskMap(input);
const compact = compactDiskMap(fs);

const checksum = compact.reduce((acc, id, idx) => {
  return acc + Number(id) * idx;
}, 0);

console.log(checksum);
