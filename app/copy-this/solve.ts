import { readFile } from "fs/promises";
import { resolve } from "path";

async function main() {
  const example = await readFile(resolve(__dirname, "example.txt"), "utf-8");
}

main().catch((error) => {
  console.error(`An error occurred: ${error}`);
});
