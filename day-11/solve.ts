import { readFile } from "fs/promises";
// Last one this year
const input = await readFile(`${import.meta.dirname}/example.txt`, { 
  encoding: "utf8"
});

let state = input.split(" ").map(Number);
let loop = 0
while (loop < 25) {
  loop++;
  for (let i = 0; i < state.length; i++) {
    const pebble = state[i];
    if (pebble === 0) {
      // Replace with 1 in array at current index
    } else if (pebble % 2 === 0) {
      // Split number into 2 parts left and right of current index
    } else {
      // Times number by 2024 and replace in array at current index
    }
  }
}

