const arg1 = process.argv[2];
const arg2 = process.argv[3];

if (arg1 === undefined || arg2 === undefined) {
  console.log('invalido');
} else {
  const num1 = Number(arg1);
  const num2 = Number(arg2);

  if (isNaN(num1) || isNaN(num2) || num2 === 0) {
    console.log('invalido');
  } else {
    console.log(num1 / num2);
  }
}
