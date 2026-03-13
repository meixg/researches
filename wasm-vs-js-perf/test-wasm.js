
import { task1, task2 } from "./build/release.js";

const testData = [
  { id: "1", value: 60, status: "active", tags: ["premium", "new"] },
  { id: "2", value: 30, status: "inactive", tags: ["old"] },
  { id: "3", value: 80, status: "active", tags: [] }
];

const jsonInput = JSON.stringify(testData);

console.log("Testing Task 1...");
const res1 = task1(jsonInput);
console.log("Result 1:", res1);
if (res1 === 140) {
  console.log("Task 1 PASS");
} else {
  console.error("Task 1 FAIL: expected 140, got", res1);
}

console.log("\nTesting Task 2...");
const res2Json = task2(jsonInput);
const res2 = JSON.parse(res2Json);
console.log("Result 2:", JSON.stringify(res2, null, 2));

const expectedRes2 = [
  { id: "1", score: 180, tags: ["PREMIUM", "NEW"], active: true },
  { id: "2", score: 22.5, tags: ["OLD"], active: false },
  { id: "3", score: 120, tags: [], active: true }
];

if (JSON.stringify(res2) === JSON.stringify(expectedRes2)) {
  console.log("Task 2 PASS");
} else {
  console.error("Task 2 FAIL");
  process.exit(1);
}
