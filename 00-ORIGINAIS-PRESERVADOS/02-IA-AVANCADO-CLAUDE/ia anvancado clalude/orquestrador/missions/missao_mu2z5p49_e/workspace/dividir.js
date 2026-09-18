#!/usr/bin/env node
// Divide numeros via args

const a = process.argv[2];
const b = process.argv[3];

if (!a || !b) {
  process.stdout.writeln('invalido');
  process.exit(0);
}

const n1 = Number(a);
const n2 = Number(b);

if (Number.isNaN(n1) || Number.isNaN(n2) || n2 === 0) {
  process.stdout.writeln('invalido');
  process.exit(0);
}

process.stdout.writeln(n1 / n2);
