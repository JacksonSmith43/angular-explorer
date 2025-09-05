import { Component } from '@angular/core';

@Component({
  selector: 'app-syntax-tester',
  imports: [],
  templateUrl: './syntax-tester.component.html',
  styleUrl: './syntax-tester.component.css'
})

export class SyntaxTesterComponent {
}

function addFive(n: number): number {
  console.log("addFive()_n", n);
  return n + 5;
}

const eight = addFive(3);
console.log("eight: ", eight);

const f = addFive;
console.log("f: ", f); // Output: f: function addFive(n) {

const seven = f(2);
console.log("seven: ", seven);

function runTwice(f: (x: number) => number): Function {
  console.log("runTwice()_Start.");

  function res(n: number): number {
    console.log("runTwice()_n: ", n);

    let value = f(n);
    console.log("runTwice()_value_1: ", value);

    value = f(value);
    console.log("runTwice()_value_2: ", value);
    return value;
  }
  console.log("runTwice()_value: ", res);
  return res;
}

console.log("Start.");
const addTen = runTwice(addFive);  // Output: runTwice()_Start.  runTwice()_value:  function res(n)
console.log("addTen: ", addTen); // Output: addTen:  function res(n)
console.log("Inbetween.");

const twelve = addTen(2);
console.log("twelve: ", twelve);
