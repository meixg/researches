
import Benchmark from 'benchmark';
import { task1 as jsTask1, task2 as jsTask2, task3 as jsTask3 } from './tasks.js';
import * as wasm from '../build/release.js';

const wasmTask1 = wasm.task1;
const wasmTask2 = wasm.task2;
const wasmTask3 = wasm.task3;

function generateData(size) {
  const data = [];
  const statuses = ['active', 'inactive', 'pending'];
  const possibleTags = ['premium', 'new', 'old', 'sale', 'sold-out'];

  for (let i = 0; i < size; i++) {
    data.push({
      id: `id-${i}`,
      value: Math.random() * 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      tags: [
        possibleTags[Math.floor(Math.random() * possibleTags.length)],
        possibleTags[Math.floor(Math.random() * possibleTags.length)]
      ]
    });
  }
  return data;
}


const SIZES = [100, 1000, 10000];

for (const size of SIZES) {
  console.log(`\n--- Benchmarking with size: ${size} ---`);
  const data = generateData(size);
  const jsonInput = JSON.stringify(data);

  const suite = new Benchmark.Suite();

  suite
    .add(`JS Task 1 (Simple)`, () => {
      jsTask1(data);
    })
    .add(`Wasm Task 1 (Simple + JSON)`, () => {
      const input = JSON.stringify(data);
      wasmTask1(input);
    })
    .add(`Wasm Task 1 (Simple, reused JSON string)`, () => {
      // This measures just the wasm execution + its internal JSON.parse
      wasmTask1(jsonInput);
    })
    .add(`JS Task 2 (Complex)`, () => {
      jsTask2(data);
    })
    .add(`Wasm Task 2 (Complex + JSON serialization/deserialization)`, () => {
      const input = JSON.stringify(data);
      const output = wasmTask2(input);
      JSON.parse(output);
    })
    .add(`Wasm Task 2 (Complex, reused input JSON string)`, () => {
       const output = wasmTask2(jsonInput);
       JSON.parse(output);
    })
    .add(`JS Task 3 (Compute-heavy, no object)`, () => {
      jsTask3(size);
    })
    .add(`Wasm Task 3 (Compute-heavy, no object)`, () => {
      wasmTask3(size);
    })
    .on('error', (event) => {
      console.error(event.target.error);
    })
    .on('cycle', (event) => {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': false });
}
