// TASK 1

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const book = "The Wind in the Willows (introductory fragment).txt";

const textToInsert = "Introductory fragment, copying is prohibited!\n";

const originalFile = path.join(__dirname, "files", book);
const updatedFile = path.join(__dirname, "files", "updated_" + book);

fs.readFile(originalFile, (err, data) => {
  if (err) throw err;

  const buffer = Buffer.from(data);
  const lines = buffer.toString().split("\n");
  const numLines = lines.length;
  const numInsertions = Math.floor(numLines / 10);

  for (let i = 0; i < numInsertions; i++) {
    const lineNumber = Math.floor(Math.random() * numLines);
    lines.splice(lineNumber, 0, textToInsert);
  }

  const updatedData = lines.join("\n");
  const updatedBuffer = Buffer.from(updatedData);

  fs.writeFile(updatedFile, updatedBuffer, (err) => {
    if (err) throw err;
    console.log("The text has been added to the file.");
  });
});

// TASK 2

function log(text) {
  process.stdout.write(text);
}

log("finish!");

// TASK 3

const ask = (question) => {
  return new Promise((resolve, reject) => {
    process.stdout.write(question);
    process.stdin.once("data", (data) => {
      const response = data.toString().trim();
      if (
        response === "Y" ||
        response === "y" ||
        response === "yes" ||
        response === "YES" ||
        response === "n" ||
        response === "N" ||
        response === "no" ||
        response === "NO"
      ) {
        resolve(response);
      } else {
        reject(new Error("Invalid response format"));
      }
    });
  });
};
(async () => {
  try {
    const scss = await ask("Do you want to use SCSS? ");
    const eslint = await ask("Do you want to use ESLint? ");
    process.stdout.write(`SCSS: ${scss}, ESLint: ${eslint}`);
    process.exit();
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
})();

// TASK 4

("Look at demo folder");
