# Explanation

## Using Mathematical Formula
```
/**
 * Calculates the sum of integers up to a given number using a mathematical formula.
 * This method is efficient for small to moderate sized inputs but may encounter precision issues for extremely large values.
 * @param {number} n - The target number up to which the sum is calculated.
 * @returns {number} - The sum of integers up to the given number.
 */
var sum_to_n_a = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  let nPositive = Math.abs(n)
  let sum = (nPositive * (nPositive + 1)) / 2
  return n >= 0 ? sum : -sum;
};
```

## Using For loop
```
/**
 * Calculates the sum of integers up to a given number using a for loop.
 * This approach iterates through integers from 1 to the target number and accumulates the sum.
 * @param {number} n - The target number up to which the sum is calculated.
 * @returns {number} - The sum of integers up to the given number.
 */
var sum_to_n_b = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  let nPositive = Math.abs(n)
  let sum = 0;
  for (let i = 1; i <= nPositive;  i++) sum += i;
  return n >= 0 ? sum : -sum;
}

```

## Using For loop and optimization
```
/**
 * Calculates the sum of integers up to a given number using a for loop with optimization.
 * This approach reduces the number of iterations by summing pairs of integers symmetrically around the midpoint.
 * @param {number} n - The target number up to which the sum is calculated.
 * @returns {number} - The sum of integers up to the given number.
 */
var sum_to_n_c = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  
  let nPositive = Math.abs(n)
  let sum = 0;
  for (let i = 1; i <= Math.floor(nPositive / 2); i++) sum += i + (nPositive - i + 1);
  
  if (nPositive % 2 !== 0) sum += Math.ceil(nPositive / 2);
  return n >= 0 ? sum : -sum;
};


```

## Recursive Approach
```
/**
 * Calculates the sum of integers up to a given number using recursion.
 * This method recursively adds the current number with the sum of integers up to the previous number.
 * Caution: This approach may encounter 'Maximum call stack size exceeded' error for large inputs.
 * @param {number} n - The target number up to which the sum is calculated.
 * @returns {number} - The sum of integers up to the given number.
 */
var sum_to_n_d = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return 0;
  if (n <= Number.MIN_SAFE_INTEGER) return 0;
  if (n < 0) return n === -1 ? -1 : n + sum_to_n_d(n + 1)
  return n === 1 ? 1 : n + sum_to_n_d(n - 1)
}

```

### Test function
```
/**
 * Tests all sum_to_n functions with a given number and logs the results.
 * @param {number} n - The target number for sum_to_n functions.
 */
var test = function (n) {
  console.log(`sum_to_${n}_a: `, sum_to_n_a(n))
  console.log(`sum_to_${n}_b: `, sum_to_n_b(n))
  console.log(`sum_to_${n}_c: `, sum_to_n_c(n))
  console.log(`sum_to_${n}_d: `, sum_to_n_d(n))
}
```

