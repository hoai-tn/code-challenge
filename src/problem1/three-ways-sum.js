class ThreeWaysSum {
  /**
   * using formula n(n+1)/2
   * time complexity: O(1)
   * space complexity: O(1)
   */
  static sum_to_n_a(n) {
    return (n * (n + 1)) / 2;
  }
  /**
   * using recursion
   * time complexity: O(n)
   * space complexity: O(n)
   */
  static sum_to_n_b(n) {
    if (n === 0) return 0;
    return n + ThreeWaysSum.sum_to_n_b(n - 1);
  }

  /**
   * using a while loop
   * time complexity: O(n)
   * space complexity: O(1)
   */
  static sum_to_n_c(n) {
    let sum = 0;
    let i = 1;
    while (i <= n) {
      sum += i;
      i++;
    }
    return sum;
  }
}

console.log(ThreeWaysSum.sum_to_n_a(6));
console.log(ThreeWaysSum.sum_to_n_b(6));
console.log(ThreeWaysSum.sum_to_n_c(6));
