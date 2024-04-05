var sum_to_n_a = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  let nPositive = Math.abs(n)
  let sum = (nPositive * (nPositive + 1)) / 2
  return n >= 0 ? sum : -sum;
};

var sum_to_n_b = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  let nPositive = Math.abs(n)
  let sum = 0;
  for (let i = 1; i <= nPositive;  i++) sum += i;
  return n >= 0 ? sum : -sum;
}

var sum_to_n_c = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  
  let nPositive = Math.abs(n)
  let sum = 0;
  for (let i = 1; i <= Math.floor(nPositive / 2); i++) sum += i + (nPositive - i + 1);
  
  if (nPositive % 2 !== 0) sum += Math.ceil(nPositive / 2);
  return n >= 0 ? sum : -sum;
};


/**
 * Be careful to Maximum call stack size exceeded
 */
var sum_to_n_d = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  if (n < 0) return n === -1 ? -1 : n + sum_to_n_d(n + 1)
  return n === 1 ? 1 : n + sum_to_n_d(n - 1)
}

var test = function (n) {
  console.log(`sum_to_${n}_a: `, sum_to_n_a(n))
  console.log(`sum_to_${n}_b: `, sum_to_n_b(n))
  console.log(`sum_to_${n}_c: `, sum_to_n_c(n))
  console.log(`sum_to_${n}_d: `, sum_to_n_d(n))
}
