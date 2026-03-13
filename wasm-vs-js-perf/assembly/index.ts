
import { JSON } from "json-as";

@json
class InputItem {
  id: string = "";
  value: f64 = 0;
  status: string = "";
  tags: string[] = [];
}

@json
class OutputItem {
  id: string = "";
  score: f64 = 0;
  tags: string[] = [];
  active: bool = false;
}

export function task1(jsonInput: string): f64 {
  const data = JSON.parse<InputItem[]>(jsonInput);
  let sum: f64 = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].value > 50) {
      sum += data[i].value;
    }
  }
  return sum;
}

export function task2(jsonInput: string): string {
  const data = JSON.parse<InputItem[]>(jsonInput);
  const result: OutputItem[] = new Array<OutputItem>(data.length);

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const processed = new OutputItem();
    processed.id = item.id;
    processed.score = calculateComplexScore(item);

    const upperTags = new Array<string>(item.tags.length);
    for (let j = 0; j < item.tags.length; j++) {
      upperTags[j] = item.tags[j].toUpperCase();
    }
    processed.tags = upperTags;
    processed.active = item.status == "active" && item.value > 10;
    result[i] = processed;
  }

  return JSON.stringify(result);
}

export function task3(n: i32): i32 {
  let count = 0;
  let num = 2;
  while (count < n) {
    if (isPrime(num)) {
      count++;
    }
    if (count < n) num++;
  }
  return num;
}

function isPrime(n: i32): bool {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}

function calculateComplexScore(item: InputItem): f64 {
  let score = item.value * 1.5;
  if (item.tags.includes("premium")) score *= 2;
  if (item.tags.includes("old")) score /= 2;
  return Math.round(score * 100) / 100;
}
