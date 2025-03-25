import * as R from 'remeda';

/**
 * 🧑‍💻 Make use of Remeda's lazy functions to only transform part of a huge array.
 *   Refactor the code below and keep the tests passing.
 *
 * 💡 Hint: use `R.tap` to verify that the `double` function isn't called for all items.
 */

const double = (n: number) => n * 2;

// Array with 10 million numbers
const lotsOfNumbers = R.range(1, 10_000_000);

function doubleFirstN(numbers: number[], limit: number): number {
  // 👇👇👇 Only change code BELOW 👇👇👇
  let result = 0;

  for (let i = 0; i < limit; i++) {
    result += double(numbers[i] ?? 0);
  }

  return result;
  // 👆👆👆 Only change code ABOVE 👆👆👆
}

// Tests:

if (import.meta.vitest) {
  test('doubles the first n numbers', () => {
    expect(doubleFirstN(lotsOfNumbers, 3)).toBe(12);
  });

  test('accepts an array with less than n numbers', () => {
    expect(doubleFirstN([1, 2, 3], 10)).toBe(12);
  });
}
