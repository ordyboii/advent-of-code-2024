import { readFile } from "fs/promises";

const example = await readFile(`${import.meta.dirname}/input.txt`, "utf-8");
