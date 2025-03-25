import * as R from 'remeda';

/**
 * 🧑‍💻 Replace the array methods below with Remeda functions in an `R.pipe`
 *
 * 💡 Hint: Bonus points for using a more expressive function than `R.reduce` to sum the numbers.
 *
 * 💡 Hint: Use `R.tap` to log intermediate values. https://remedajs.com/docs/#tap
 */

const numbers = [1, 2, 3, 4, 5];

// 👇👇👇 Only change code BELOW 👇👇👇

const result = numbers
  .map((x) => x * 2)
  .filter((x) => x > 2)
  .reduce((acc, x) => acc + x, 0);

// 👆👆👆 Only change code ABOVE 👆👆👆

// Tests:

if (import.meta.vitest) {
  test('result is 28', () => {
    expect(result).toBe(28);
  });
}
