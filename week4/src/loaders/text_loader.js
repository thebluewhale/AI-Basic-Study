import fs from "fs";

export function loadText(path) {
  return fs.readFileSync(path, "utf-8");
}
