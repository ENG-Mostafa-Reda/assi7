/**
 * LeetCode 13 - Roman to Integer
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const current = map[s[i]];
    const next = map[s[i + 1]];
    // subtractive notation (e.g. IV, IX, XL ...)
    if (next > current) total -= current;
    else total += current;
  }
  return total;
};

console.log(romanToInt("III"));      // 3
console.log(romanToInt("LVIII"));    // 58
console.log(romanToInt("MCMXCIV"));  // 1994
