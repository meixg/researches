
// Task 1: Simple filtering and aggregation
export function task1(data) {
  return data
    .filter(item => item.value > 50)
    .reduce((acc, item) => acc + item.value, 0);
}

// Task 2: Complex transformation
// Expects an array of objects with nested children
export function task2(data) {
  const result = [];
  for (const item of data) {
    const processed = {
      id: item.id,
      score: calculateComplexScore(item),
      tags: item.tags.map(t => t.toUpperCase()),
      active: item.status === 'active' && item.value > 10
    };
    result.push(processed);
  }
  return result;
}

function calculateComplexScore(item) {
  let score = item.value * 1.5;
  if (item.tags.includes('premium')) score *= 2;
  if (item.tags.includes('old')) score /= 2;
  return Math.round(score * 100) / 100;
}

function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export function task3(n) {
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
