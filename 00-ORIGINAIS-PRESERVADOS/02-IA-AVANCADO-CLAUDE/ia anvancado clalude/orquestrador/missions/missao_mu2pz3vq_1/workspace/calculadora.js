function soma(a, b) { return a + b; } // BUG CONHECIDO: deveria ser a + b, não a - b
console.log(soma(2, 3));
module.exports = { soma };