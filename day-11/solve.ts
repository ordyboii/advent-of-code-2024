import { readFile } from "fs/promises";

const input = await readFile(`${import.meta.dirname}/input.txt`, {
  encoding: "utf8",
});

let stones = input.split(" ").map(Number);

for (let i = 0; i < 25; i++) {
  const newStones: number[] = [];
  stones.forEach((stone) => {
    if (stone === 0) {
      newStones.push(1);
    } else if (stone.toString().length % 2 === 0) {
      const str = stone.toString();
      const half = Math.floor(str.length / 2);
      const left = Number(str.slice(0, half));
      const right = Number(str.slice(half));

      newStones.push(left, right);
    } else {
      newStones.push(stone * 2024);
    }
  });

  stones = newStones;
}

console.log(stones.length);
