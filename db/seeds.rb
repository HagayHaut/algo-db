# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts 'Begin seeding... 🌱'
User.destroy_all
Solution.destroy_all
Challenge.destroy_all
Comment.destroy_all
Category.destroy_all
Resource.destroy_all
ResourceCategory.destroy_all

complexities = %w(O(n) O(1) O(n^2) O(log-n) O(n-log-n) O(n!))

categories = %w[array hashmap linked-list tree graph two-pointer sliding-window set stack-queue sort string
                recursion bit-manipulation math search dynamic-programming]

resource_categories = %w[Challenges Course Blog Book/PDF Video Tutorial GitHub]

languages = %w[c csharp cpp go java javascript php python ruby rust typescript ada coffeescript haskell fortran julia
               kotlin lisp lua perl scala sql]

puts 'Seeding users... 🌱'

hagay = User.create!(username: 'Hagay', password: 'toy')
cinna = User.create!(username: 'Cinna', password: 'toy')
arlo = User.create!(username: 'Arlo', password: 'toy')
bacon = User.create!(username: 'Bacon', password: 'toy')
chango = User.create!(username: 'Chinggis-Khan', password: 'toy')

puts 'Seeding categories... 🌱'
(0..15).each do |i|
  Category.create!(
    name: categories[i]
  )
end

puts 'Seeding challenges and solutions... 🌱'

# TWO SUM

Challenge.create!(
  title: 'Two Sum',
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  You can return the answer in any order.



  Example 1:

  Input: nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
  Example 2:

  Input: nums = [3,2,4], target = 6
  Output: [1,2]
  Example 3:

  Input: nums = [3,3], target = 6
  Output: [0,1]


  Constraints:

  2 <= nums.length <= 104
  -109 <= nums[i] <= 109
  -109 <= target <= 109
  Only one valid answer exists.",
  category_id: 2,
  external_url: 'https://leetcode.com/problems/two-sum/'
)

Solution.create!(
  user: hagay,
  solution: "var twoSum = function(nums, target) {
    let obj = {};
    for(let i = 0; i < nums.length; i++) {
       const needed = target - nums[i]
       if(needed in obj) return [obj[needed],i]
       obj[nums[i]] = i;
    }
};",
  challenge_id: 1,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: 'Relies on a hashmap to only iterate over the input once.',
  language: 'javascript'
)

Solution.create!(
  user: cinna,
  solution: "def two_sum(nums, target)
  hash = {}
  nums.each_with_index do |n, i|
      needed = target - n
      return [hash[needed], i] if hash[needed]
      hash[n] = i
  end
end",
  challenge_id: 1,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: 'Relies on a hashmap to only iterate over the input once.',
  language: 'ruby'
)

Comment.create!(
  solution_id: 1,
  user_id: 2,
  comment: 'cool solution!'
)

Comment.create!(
  solution_id: 1,
  user_id: 3,
  comment: 'agreed!'
)

Comment.create!(
  solution_id: 1,
  user_id: 2,
  comment: 'does this work without a map?'
)

# BEST TIME TO BUY AND SELL STOCK

Challenge.create!(
  title: 'Best Time To Buy And Sell Stock',
  description: "You are given an array prices where `prices[i]` is the price of a given stock on the ith day.\



  You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\



  Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\



  Example 1:\

  ```
  Input: prices = [7,1,5,3,6,4]


  Output: 5


  Explanation:\ Buy on day 2 (price = 1)\


  and sell on day 5 (price = 6), profit = 6-1 = 5.


  Note that buying on day 2 and selling on day 1 is\


  not allowed because you must buy before you sell.
  ```

  Example 2:\

  ```
  Input: prices = [7,6,4,3,1]


  Output: 0


  Explanation:\ In this case, no transactions\


    are done and the max profit = 0.
  ```


  Constraints:\

  1 <= prices.length <= 105\
  0 <= prices[i] <= 104",
  category_id: 7,
  external_url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
)

Solution.create!(
  user: cinna,
  solution: "var maxProfit = function(prices) {
    let maxProfit = 0;
    let minPrice = prices[0];
    prices.forEach((price) => {
        const profit = price - minPrice;
        if (maxProfit < profit) maxProfit = profit;
        if (minPrice > price) minPrice = price;
    })
    return maxProfit;
};",
  challenge_id: 2,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'Sliding window to keep track of minimum price and maximum profit.',
  language: 'javascript'
)

Comment.create!(
  solution_id: 2,
  user_id: 4,
  comment: 'sliding window FTW!'
)

Comment.create!(
  solution_id: 2,
  user_id: 5,
  comment: 'can someone explain how this works?'
)

# INVERT BINARY TREE

Challenge.create!(
  title: 'Invert Binary Tree',
  description: 'Given the root of a binary tree, invert the tree, and return its root.',
  category_id: 4,
  external_url: 'https://leetcode.com/problems/invert-binary-tree/'
)

Solution.create!(
  user: cinna,
  solution: "def invert_tree(root)
  if root
      swap_nodes root
      invert_tree root.left
      invert_tree root.right
  end
  root
end

def swap_nodes root
    right = root.right
    root.right = root.left
    root.left = right
end",
  challenge_id: 3,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'Recursion is necessary for a clean solution here.',
  language: 'ruby'
)

Comment.create!(
  solution_id: 4,
  user_id: 5,
  comment: 'ah it\'s so much simpler than I expected!'
)

# VALID ANAGRAM

Challenge.create!(
  title: 'Valid Anagram',
  description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.

  An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
  category_id: 11,
  external_url: 'https://leetcode.com/problems/valid-anagram/'
)

Solution.create!(
  user: bacon,
  solution: "def is_anagram(s, t)
  s.split('').sort == t.split('').sort
end",
  challenge_id: 4,
  time_complexity: 'O(n-log-n)',
  space_complexity: 'O(n)',
  notes: 'sort without a code block will sort alphabetically',
  language: 'ruby'
)

Comment.create!(
  solution_id: 5,
  user_id: 1,
  comment: 'of course! why didn\'t I think to sort!!'
)

Comment.create!(
  solution_id: 5,
  user_id: 4,
  comment: 'yeah this id dope...'
)

# BINARY SEARCH

Challenge.create!(
  title: 'Binary Search',
  description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.



  You must write an algorithm with O(log n) runtime complexity.',
  category_id: 15,
  external_url: 'https://leetcode.com/problems/binary-search/'
)

Solution.create!(
  user: chango,
  solution: "def search(nums, target)
  low = 0;
  high = nums.length - 1
  mid = nil
  while low <= high
      mid = (low + high) / 2
      return mid if nums[mid] == target
      nums[mid] < target ? low = mid + 1 : high = mid - 1
  end
  -1
end",
  challenge_id: 5,
  time_complexity: 'O(log-n)',
  space_complexity: 'O(1)',
  notes: 'with every check, dismiss half the remaining input',
  language: 'ruby'
)

Comment.create!(
  solution_id: 6,
  user_id: 1,
  comment: 'an absolute classic!'
)

# MAXIMUM SUBARRAY

Challenge.create!(
  title: 'Maximum Subarray',
  description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

  A subarray is a contiguous part of an array.",
  category_id: 7,
  external_url: 'https://leetcode.com/problems/maximum-subarray/'
)

Solution.create!(
  user: arlo,
  solution: "const maxSubArray = function(nums) {
    let maxSum = nums[0];
    let curSum = 0;

    nums.forEach(n => {
        if (curSum < 0) curSum = 0;
        curSum += n;
        if (maxSum < curSum) maxSum = curSum;
    })
    return maxSum;
};
",
  challenge_id: 6,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'use sliding window pointers to track current and maximum sums',
  language: 'javascript'
)

# LINKED LIST CYCLE

Challenge.create!(
  title: 'Linked List Cycle',
  description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.

  There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

  Return true if there is a cycle in the linked list. Otherwise, return false.",
  category_id: 3,
  external_url: 'https://leetcode.com/problems/linked-list-cycle/'
)

Solution.create!(
  user: hagay,
  solution: "def hasCycle(head)
  return false if !head
  left = head
  right = head.next
  while right != left
      return false if !right || !right.next
      left = left.next
      right = right.next.next
  end
  return true
end",
  challenge_id: 7,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'use fast and slow pointers, which will evetually overlap if there is a cycle',
  language: 'ruby'
)

Comment.create!(
  solution_id: 8,
  user_id: 3,
  comment: 'now this is cool'
)

# FIRST BAD VERSION

Challenge.create!(
  title: 'First Bad Version',
  description: "You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

  .


  Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

  .



  You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.",
  category_id: 15,
  external_url: 'https://leetcode.com/problems/first-bad-version/'
)

Solution.create!(
  user: chango,
  solution: "def first_bad_version(n)
  result = n
  low = 1
  high = n
  while low <= high
      mid = (low + high) / 2
      if is_bad_version mid
          result = mid
          high = mid - 1
      else
          low = mid + 1
      end
  end
  result
end",
  challenge_id: 8,
  time_complexity: 'O(log-n)',
  space_complexity: 'O(1)',
  notes: 'basically just a binary search with one extra pointer',
  language: 'ruby'
)

Comment.create!(
  solution_id: 9,
  user_id: 1,
  comment: 'shoulda known to use a binary search when I saw the O(log-n) time requirement!'
)

# CLIMBING STAIRS

Challenge.create!(
  title: 'Climbing Stairs',
  description: "You are climbing a staircase. It takes n steps to reach the top.

  Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  category_id: 16,
  external_url: 'https://leetcode.com/problems/climbing-stairs/'
)

Solution.create!(
  user: chango,
  solution: "def climb_stairs(n)
  f1 = 1
  f2 = 1

  (1..n - 1).each do |i|
      temp = f1
      f1 = f1 + f2
      f2 = temp
  end

  f1
end",
  challenge_id: 9,
  time_complexity: 'O(log-n)',
  space_complexity: 'O(1)',
  notes: 'use dynamic programming and this is just Nth Fibonacci',
  language: 'ruby'
)

Comment.create!(
  solution_id: 10,
  user_id: 4,
  comment: 'wait how the hell does this work'
)

# REVERSE LINKED LIST

Challenge.create!(
  title: 'Reverse Linked List',
  description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
  category_id: 3,
  external_url: 'https://leetcode.com/problems/reverse-linked-list/'
)

Solution.create!(
  user: hagay,
  solution: "var reverseList = function(head) {
    let next = null;
    let cur = head;
    let prev = null;
    while (cur) {
        next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
};",
  challenge_id: 10,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'it\'s not just a meme',
  language: 'javascript'
)

# SINGLE NUMBER

Challenge.create!(
  title: 'Single Number',
  description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

  You must implement a solution with a linear runtime complexity and use only constant extra space.',
  category_id: 13,
  external_url: 'https://leetcode.com/problems/single-number/'
)

Solution.create!(
  user: hagay,
  solution: "var singleNumber = function(nums) {
    return nums.reduce((a, b) => a ^ b);
};",
  challenge_id: 11,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: '### relies on XOR (^) operation
  ```
    1 ^ 0 => 0
    1 ^ 1 => 1
    0 ^ 1 => 0
    0 ^ 0 => 1
    5 ^ 3 => 6
  ```',
  language: 'javascript'
)

Solution.create!(
  user: hagay,
  solution: "def single_number(nums)
  nums.reduce(&:^)
end",
  challenge_id: 11,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: '### relies on XOR (^) operation
  ```
    1 ^ 0 => 0
    1 ^ 1 => 1
    0 ^ 1 => 0
    0 ^ 0 => 1
    5 ^ 3 => 6
  ```',
  language: 'ruby'
)

Comment.create!(
  solution_id: 13,
  user_id: 4,
  comment: 'what the heck'
)

# GREATEST COMMON DENOMINATOR

Challenge.create!(
  title: 'Greatest Common Denominator',
  description: 'The greatest common divisor (gcd) of two or more integers, when at least one of them is not zero, is the largest positive integer that divides the numbers without a remainder.

  The GCD of more than two numbers can be calculated as

  GCD(a,b,c) = GCD(GCD(a,b),c).',
  category_id: 14
)

Solution.create!(
  user: bacon,
  solution: "pub fn gcd(nums: &[usize]) -> usize {
    if nums.len() == 1 {
        return nums[0];
    }
    let a = nums[0];
    let b = gcd(&nums[1..]);
    gcd_of_two_numbers(a, b)
  }

  fn gcd_of_two_numbers(a: usize, b: usize) -> usize {
    if b == 0 {
        return a;
    }
    gcd_of_two_numbers(b, a % b)
  }

  #[cfg(test)]
  mod tests {
    use super::*;
    #[test]
    fn it_works() {
        assert_eq!(gcd(&[1, 2, 3, 4, 5]), 1);
        assert_eq!(gcd(&[2, 4, 6, 8, 10]), 2);
        assert_eq!(gcd(&[3, 6, 9, 12, 15]), 3);
        assert_eq!(gcd(&[10]), 10);
        assert_eq!(gcd(&[21, 110]), 1);
    }
  }
  ",
  challenge_id: 12,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'some recursion and other wild stuff in here',
  language: 'rust'
)

Comment.create!(
  solution_id: 14,
  user_id: 1,
  comment: 'bacon can you explain what\'s going on here?'
)

Comment.create!(
  solution_id: 14,
  user: bacon,
  comment: 'nah i copied this from stack overflow lol'
)

# MOVE ZEROS

Challenge.create!(
  title: 'Move Zeros',
  description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements.

  Note that you must do this in-place without making a copy of the array.',
  category_id: 6,
  external_url: 'https://leetcode.com/problems/move-zeroes/'
)

Solution.create!(
  user: bacon,
  solution: "void moveZeroes(vector<int>& nums) {
    int lastNonZeroFoundAt = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) {
            nums[lastNonZeroFoundAt++] = nums[i];
        }
    }
    for (int i = lastNonZeroFoundAt; i < nums.size(); i++) {
        nums[i] = 0;
    }
}",
  challenge_id: 13,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'optimal solution with two pointers',
  language: 'cpp'
)

Solution.create!(
  user: hagay,
  solution: "def move_zeroes(nums)
  # two pointers, fast and slow start at 1
  # right increments by one every time, when it hits a non-zero, switch its value with val at left
  # increment left
  left = 0
  (0..nums.size - 1).each do |right|
      if nums[right] != 0
          temp = nums[right]
          nums[right] = nums[left]
          nums[left] = temp
          left += 1
      end
  end
end",
  challenge_id: 13,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'optimal solution with two pointers',
  language: 'ruby'
)

# ROMAN TO INTEGER

Challenge.create!(
  title: 'Roman To Integer',
  description: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

  For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.',
  category_id: 2,
  external_url: 'https://leetcode.com/problems/roman-to-integer/'
)

Solution.create!(
  user: hagay,
  solution: "def roman_to_int(s)
  integers = {
      'I' => 1,
      'V'=> 5,
      'X'=> 10,
      'L'=> 50,
      'C' => 100,
      'D' => 500,
      'M' => 1000
  }
  sum = 0
  (0..s.length - 2).each do |i|
      val = integers[s[i]]
      if i == s.length - 1
          sum += val
          next
      end
      val < integers[s[i+1]] ? sum += val : sum -= val
  end
  sum
end",
  challenge_id: 14,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'store conversion values in hash table',
  language: 'ruby'
)

# INTEGER TO ROMAN

Challenge.create!(
  title: 'Integer To Roman',
  description: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

  For example, 2 is written as II in Roman numeral, just two one\'s added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a roman numeral.',
  category_id: 2,
  external_url: 'https://leetcode.com/problems/integer-to-roman/'
)

Solution.create!(
  user: hagay,
  solution: "def int_to_roman(num)
  numerals = {
      1 => 'I',
      4 => 'IV',
      5 => 'V',
      9 => 'IX',
      10 => 'X',
      40 => 'XL',
      50 => 'L',
      90 => 'XC',
      100 => 'C',
      400 => 'CD',
      500 => 'D',
      900 => 'CM',
      1000 => 'M'
  }
  roman = ''
  numerals.keys.reverse.each do |dec|
     while num >= dec
         num -= dec
         roman += numerals[dec]
     end
  end
  roman
end",
  challenge_id: 15,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'store conversion values in hash table, very similar to Roman to Integer',
  language: 'ruby'
)

# PASCAL'S TRIANGLE

Challenge.create!(
  title: 'Pascal\'s Triangle',
  description: 'Given an integer numRows, return the first numRows of Pascal\'s triangle.



  In Pascal\'s triangle, each number is the sum of the two numbers directly above it as shown:



  .....1.....

  ....1.1....

  ...1.2.1...

  ..1.3.3.1..

  .1.4.6.4.1.
  ',
  category_id: 14,
  external_url: 'https://leetcode.com/problems/pascals-triangle/'
)

Solution.create!(
  user: hagay,
  solution: "def generate(num_rows)
  rows = [[1],[1,1]]
  return rows if num_rows == 2
  return rows[...1] if num_rows == 1
  (num_rows - 2).times do
      prev_row = rows[-1]
      cur_row = [1]
      prev_row.each_with_index do |n, i|
          break if i == prev_row.length - 1
          cur_row << (prev_row[i] + prev_row[i + 1])
      end
      cur_row << 1
      rows << cur_row
  end
  rows
end",
  challenge_id: 16,
  time_complexity: 'O(n^2)',
  space_complexity: 'O(n)',
  notes: 'for each new row, iterate over previous row',
  language: 'ruby'
)

# ROTATE ARRAY

Challenge.create!(
  title: 'Rotate Array',
  description: 'Given an array, rotate the array to the right by k steps, where k is non-negative.
  Input: nums = [1,2,3,4,5,6,7], k = 3
  Output: [5,6,7,1,2,3,4]
  ',
  category_id: 1,
  external_url: 'https://leetcode.com/problems/rotate-array/'
)

Solution.create!(
  user: hagay,
  solution: "def rotate(nums, k)
  k.times do
     nums.unshift nums.pop
  end
end",
  challenge_id: 17,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: 'move last element to beginning k times',
  language: 'ruby'
)

# CONTAINS DUPLICATE

Challenge.create!(
  title: 'Contains Duplicate',
  description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
  category_id: 8,
  external_url: 'https://leetcode.com/problems/rotate-array/'
)

Solution.create!(
  user: hagay,
  solution: "const containsDuplicate = function(nums) {
    return nums.length !== [...new Set(nums)].length;
};",
  challenge_id: 18,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: 'use a set to remove duplicates, check if lengths match',
  language: 'javascript'
)

# PLUS ONE

Challenge.create!(
  title: 'Plus One',
  description: 'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0\'s.

  Increment the large integer by one and return the resulting array of digits.',
  category_id: 11,
  external_url: 'https://leetcode.com/problems/plus-one/'
)

Solution.create!(
  user: hagay,
  solution: "def plus_one(digits)
  (digits.map(&:to_s).join.to_i + 1).to_s.split(//).map(&:to_i)
end",
  challenge_id: 19,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: 'a bunch of chained O(n) methods',
  language: 'ruby'
)

# ROTATE IMAGE

Challenge.create!(
  title: 'Rotate Image',
  description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

  You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

    Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]

    Output: [[7,4,1],[8,5,2],[9,6,3]]',
  category_id: 5,
  external_url: 'https://leetcode.com/problems/rotate-image/'
)

Solution.create!(
  user: hagay,
  solution: "var rotate = function(matrix) {
    for(let r = 0; r < matrix.length; r++) {
        for(let c = r; c < matrix[0].length; c++) {
          [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]]
        }
    }
    matrix.forEach(row => row.reverse())
};",
  challenge_id: 20,
  time_complexity: 'O(n^2)',
  space_complexity: 'O(1)',
  notes: 'transpose diagonally, then reverse each row.',
  language: 'javascript'
)
Solution.create!(
  user: hagay,
  solution: "def rotate(matrix)
  matrix.replace(matrix.reverse.transpose)
end",
  challenge_id: 20,
  time_complexity: 'O(n^2)',
  space_complexity: 'O(1)',
  notes: 'does the same as first solution, but uses a ruby cheat',
  language: 'ruby'
)

# MERGE SORT

Challenge.create!(
  title: 'Merge Sort',
  description: 'Given an unsorted array of integers, sort them with O(n log-n) time using merge sort.',
  category_id: 10
)

Solution.create!(
  user: hagay,
  solution: "function merge(arr1, arr2) {
    const merged = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i]);
            i++;
        }
        else {
            merged.push(arr2[j]);
            j++;
        }
    }
    while (i < arr1.length) {
        merged.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        merged.push(arr2[j]);
        j++;
    }
    return merged;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}",
  challenge_id: 21,
  time_complexity: 'O(n-log-n)',
  space_complexity: 'O(n)',
  notes: 'classic implimintation using recursion and a merge() helper method',
  language: 'javascript'
)

# QUICK SORT

Challenge.create!(
  title: 'Quick Sort',
  description: 'Given an unsorted array of integers, sort them with O(n log-n) time using quick-sort.',
  category_id: 10
)

Solution.create!(
  user: hagay,
  solution: "const swap = (arr,idx1,idx2) => [arr[idx2],arr[idx1]] = [arr[idx1],arr[idx2]]

  const pivot = (arr, low = 0, high = arr.length-1) => {
      // by choosing arr[low], it makes it O(n^2) for sorted arrays
      let pivot = arr[low];
      let swapIdx = low;

      for (i = low + 1; i < arr.length; i++) {
          if (pivot > arr[i]) {
              swapIdx++;
              swap(arr,swapIdx,i);
          }
      }
      swap(arr,swapIdx,low);
      return swapIdx;
  }

  const quickSort = (arr, left = 0, right = arr.length-1) => {
      console.log(arr.slice(left,right+1))
      if (left < right) {
         const pivotIdx = pivot(arr, left, right);
          quickSort(arr,left,pivotIdx-1);
          quickSort(arr,pivotIdx+1,right);
      } else {
          console.log('sorted!', arr)
          return arr;
      }
  }",
  challenge_id: 22,
  time_complexity: 'O(n-log-n)',
  space_complexity: 'O(n)',
  notes: 'classic implimintation using recursion, and pivot() and swap() helper methods',
  language: 'javascript'
)

# RADIX SORT

Challenge.create!(
  title: 'Radix Sort',
  description: 'Given an unsorted array of POSITIVE INTEGERS, sort them with O(n * k) time (O(n log n) in practice) using radix-sort.',
  category_id: 10
)

Solution.create!(
  user: hagay,
  solution: "// Gets number at a given digit
// (0-indexed starting from right)
// getDigit(54321,1) => 2
const getDigit = (n, i) => {
    return Math.floor(Math.abs(n)/Math.pow(10,i)%10);

}
//Get number of digits in number
const digitCount = n => {
    return n === 0
        ? 1
        : Math.ceil(Math.log10(Math.abs(n)));
}

// Get max number of digits in arr
const mostDigits = arr => {
    let most = digitCount(arr[0]);

    for (let i = 1; i < arr.length; i++) {
        most = Math.max(most,digitCount(arr[i]));
    }
    return most;
}

const radixSort = arr => {
    const maxDigitCount = mostDigits(arr)
    for (let k = 0; k < maxDigitCount; k++) {
        // creates array of 10 empty arrays
        const buckets = Array.from({length: 10}, () => []);
        for (let i = 0; i < arr.length; i++) {
            const bucketIdx = getDigit(arr[i],k);
            buckets[bucketIdx].push(arr[i])
        }
        console.log('buckets:', buckets);
        arr = [].concat(...buckets);
        console.log('current arr:', arr);
    }
    console.log('** sorterd **', arr)
    return arr;
}",
  challenge_id: 23,
  time_complexity: 'O(n-log-n)',
  space_complexity: 'O(n)',
  notes: 'uses 10 buckets, digitCount(), getDigit(), mostDigits(), and log10 % operations. Only works with positive integers. More efficient, but more limited than comparison sorts.',
  language: 'javascript'
)

# INSERTION SORT

Challenge.create!(
  title: 'Insertion Sort',
  description: 'Given an unsorted array of numbers, sort them in place using insertion sort.',
  category_id: 10
)

Solution.create!(
  user: hagay,
  solution: "function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const curVal = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > curVal) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = curVal;
    }
    return arr;
}",
  challenge_id: 24,
  time_complexity: 'O(n^2)',
  space_complexity: 'O(1)',
  notes: 'keeps a sorted "half" of the array into which it inserts values from unsorted half.',
  language: 'javascript'
)

# BUBBLE SORT

Challenge.create!(
  title: 'Bubble Sort',
  description: 'Given an unsorted array of numbers, sort them in place using bubble sort.',
  category_id: 10
)

Solution.create!(
  user: hagay,
  solution: "function bubbleSort(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        let swapped;
        for (let j = 0; j < arr.length-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swapped = true
                swapWithNext(arr,j);
            }
        }
        if(!swapped) {
            break;
        }
    }
    return arr;
}

function swapWithNext(arr,idx) {
    [arr[idx], arr[idx+1]] = [arr[idx+1], arr[idx]]
}",
  challenge_id: 25,
  time_complexity: 'O(n^2)',
  space_complexity: 'O(1)',
  notes: 'compares values with and "bubbles up" the largest value in each outer iteration',
  language: 'javascript'
)

# SELECTION SORT

Challenge.create!(
  title: 'Selection Sort',
  description: 'Given an unsorted array of numbers, sort them in place using selection sort.',
  category_id: 10
)

Solution.create!(
  user: hagay,
  solution: "const swapWithIndexes = (arr,idx1,idx2) => {
    [[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]]
}

const selectionSor = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log('**********************')
        let min = i;
        for (let j = i+1; j < arr.length; j++) {
            if (arr[min] > arr[j]) min = j;
        }
        if (min !== i) {
            console.log('min:', arr[min])
            console.log('   preswap:', arr)
            swapWithIndexes(arr,i,min);
            console.log('   postswap:', arr)
        }
        else {
            console.log('   no swap')
        }
    }
    return arr;
}",
  challenge_id: 26,
  time_complexity: 'O(n^2)',
  space_complexity: 'O(1)',
  notes: 'iterates the array as many times as there are elements, putting min value at next min spot',
  language: 'javascript'
)

# CREATE A SINGLY LINKED LIST

Challenge.create!(
  title: 'Create A Singly Linked List',
  description: "Create a Singly Linked List class and a Node class.

  Your singly linked list should have the following methods with the following time complexities:

  ```


  push(val) => O(1)

  pop() => O(n)

  shift() => O(1)

  unshift(val) => O(n)

  get(index) => O(n)

  set(index, val) => O(n)

  insert(index, val) => O(1)

  remove(index) => O(n) || O(1)

  reverse(index) => O(n)

  ```",
  category_id: 3
)

Solution.create!(
  user: hagay,
  solution: "class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.head) return;
        let cur = this.head;
        let prev = cur;
        while (cur.next) {
            prev = cur;
            cur = cur.next;
        }
        this.tail = prev;
        this.tail.next = null;
        this.length--;
        if (!this.length) {
            this.head = null;
            this.tail = null;
        }
        return cur;
    }

    shift() {
        if (!this.head) return;
        let cur = this.head;
        this.head = cur.next;
        this.length--;
        if (!this.head) this.tail = null;
        return cur;
    }

    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    // gets node at given \"index\"
    get(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let cur = this.head;
        let i = 0;
        while (i < index) {
            cur = cur.next;
            i++;
        }
        return cur;
    }

    // set value of node at given index
    set(index, val) {
        const node = this.get(index);
        if (!node) return false;
        node.val = val;
        return true;
    }

    // inserts a new node at given index
    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === this.length) return !!this.push(val);
        if (index === 0) return !!this.unshift(val);

        const newNode = new Node(val);
        const prevNode = this.get(index - 1);
        const temp = prevNode.next;
        prevNode.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }

    // removes the node at a given index
    remove(index) {
        if (index < 0 || index >= this.length) return;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        const prev = this.get(index - 1);
        const removeNode = prev.next;
        prev.next = removeNode.next;
        this.length--;
        return removeNode;
    }

    // reverse the linked in place
    reverse() {
        if (!this.head) return null;

        let curr = this.head;
        this.head = this.tail;
        this.tail = curr;
        let prev = null;
        let next = null;
        while (curr) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return this;
    }

   print() {
       const arr = [];
       let curr = this.head;
       while(curr) {
           arr.push(curr.val)
           curr = curr.next;
       }
       console.log(arr);
   }
}",
  challenge_id: 27,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: 'Let me know if you have any pointers!',
  language: 'javascript'
)

# CREATE A DOUBLY LINKED LIST

Challenge.create!(
  title: 'Create A Doubly Linked List',
  description: "Create a Doubly Linked List class and a Node class.

  Your doubly linked list should have the following methods with the following time complexities:

  ```


  push(val) => O(1)

  pop() => O(1)

  shift() => O(1)

  unshift(val) => O(1)

  get(index) => O(n)

  set(index, val) => O(n)

  insert(index, val) => O(1)

  remove(index) => O(1)


  ```",
  category_id: 3
)

Solution.create!(
  user: hagay,
  solution: "class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    // similat to SLL, just need to update .prev
    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    // same as .push()
    pop() {
        if (!this.head) return;
        const oldTail = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = oldTail.prev;
            oldTail.prev = null;
            this.tail.next = null;
        }
        this.length--;
        return oldTail;
    }

    shift() {
        if (!this.head) return;
        const oldHead = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
    }

    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    // get node at given index
    // similar to SLL, but you can work from
    // end if index is closer to list.length - 1;
    // slightly more efficient than SLL on average
    // (stil O(n))
    get(index) {
        if (index < 0 || index >= this.length) return null;
        if (index <= this.length / 2) {
            let currNode = this.head;
            let currIndex = 0;
            while (currIndex < index) {
                currNode = currNode.next;
                currIndex++;
            }
            return currNode;
        } else {
            let currNode = this.tail;
            let currIndex = this.length - 1;
            while (currIndex > index) {
                currNode = currNode.prev;
                currIndex--;
            }
            return currNode;
        }
    }

    // sets the value of node at given index
    set(index, val) {
        const node = this.get(index);
        if (node) {
            node.val = val;
            return true;
        } else {
            return false;
        }
    }

    // inserts new node at given index
    // takes advantage of .get()
    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);
        const newNode = new Node(val);
        const beforeNode = this.get(index - 1);
        const afterNode = beforeNode.next;
        newNode.next = afterNode, afterNode.prev = newNode;
        newNode.prev = beforeNode, beforeNode.next = newNode;
        this.length++;
        return true;
    }

    // removes node at given index
    remove(index) {
        if (index < 0 || index >= this.length) return;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        const removeNode = this.get(index);
        removeNode.prev.next = removeNode.next;
        removeNode.next.prev = removeNode.prev;
        removeNode.next = null, removeNode.prev = null;
        this.length--;
        return removeNode;
    }

    print() {
        const arr = [];
        let curr = this.head;
        while (curr) {
            arr.push(curr.val);
            curr = curr.next;
        }
        console.log(arr);
    }
}
",
  challenge_id: 28,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: 'was a doozy',
  language: 'javascript'
)

# CREATE A STACK

Challenge.create!(
  title: 'Create A Stack',
  description: "Create a Stack class and a Node class.

  Your stack linked list should have the following methods with the following time complexities:

  ```


  push(value) => O(1)

  pop() => O(1)




  ```

  ",
  category_id: 9
)

Solution.create!(
  user: hagay,
  solution: "class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // push onto beginning
    // more similat to SLL unshift()
    // O(1)
    push(value) {
        const newNode = new Node(value);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.next = this.first;
            this.first = newNode;
        }
        return this.size++;
    }

    // removes node from beginning
    // more similar to SLL shift()
    // O(1)
    pop() {
        if (!this.first) return null;
        const removeNode = this.first;
        if (this.size === 1) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return removeNode.value;
    }

    print() {
        const arr = [];
        let curr = this.first;
        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }
        console.log(arr)
    }
}",
  challenge_id: 29,
  time_complexity: 'O(1)',
  space_complexity: 'O(n)',
  notes: 'Last In, First Out.


  ```

  Used for:


    Managing function calls


    Undo/redo functionality


    Routing history tracking


    Many other algorithms


  You can use an array as a stack (limit to push()

  and pop()) but making your own class is more efficient.
  ```',
  language: 'javascript'
)

# VALID PARENTHESES

Challenge.create!(
  title: 'Valid Parentheses',
  description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.


  An input string is valid if:

  ````
  Open brackets must be closed by the same type of brackets.



  Open brackets must be closed in the correct order.


  ```",
  category_id: 9,
  external_url: 'https://leetcode.com/problems/valid-parentheses/'
)

Solution.create!(
  user: hagay,
  solution: "def is_valid(s)
  brackets = '{}()[]'
  stack = []
  s.each_char do |bracket|
      bracket_idx = brackets.index bracket
      if bracket_idx % 2 == 0
          stack << bracket_idx + 1
      else
          return false if stack.pop != bracket_idx
      end
  end
  stack.size == 0
end",
  challenge_id: 30,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: 'Relies on a stack, and the `brackets` variable to determine opening and closing brackets.',
  language: 'ruby'
)

# CREATE A QUEUE

Challenge.create!(
  title: 'Create A Queue',
  description: "Create a Queue class and a Node class.

  Your stack linked list should have the following methods with the following time complexities:

  ```


  enqueue(value) => O(1)

  dequeue() => O(1)




  ```

  ",
  category_id: 9
)

Solution.create!(
  user: hagay,
  solution: "class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // adds a new node to queue
    // similar SLL push(), O(1) time
    enqueue(value) {
        const newNode = new Node(value);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }

    // removes node from queue
    // similar to SLL shift(), O(1) time
    dequeue() {
        if (!this.first) return null;
        const removeNode = this.first;
        if (this.size === 1) {
            this.last = null;
        }
        this.first = removeNode.next;
        this.size--;
        return removeNode.value;
    }

    print() {
        const arr = [];
        let curr = this.first;
        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }
        console.log(arr);
    }
}",
  challenge_id: 31,
  time_complexity: 'O(1)',
  space_complexity: 'O(n)',
  notes: 'First In, First Out.


  ```

  Used for:


    Background tasks


    Print / task management


    First in line gets the goods


  You can use an array as a queue (limit to push() and

  shift()) but making your own class is more efficient.
  ```',
  language: 'javascript'
)

# CREATE A BINARY SEARCH TREE

Challenge.create!(
  title: 'Create A Binary Search Tree',
  description: "Create a Binary Search Tree class and a Node class.

  Your stack tree class should have the following instance methods with the following time complexities:

  ```


  insert(value) => O(log-n)


  find(value) => O(log-n)


  contains(value) => O(log-n)


  BFS() => O(n)


  DFSPreOrder() => O(n)


  DFSPostOrder() => O(n)


  DFSInOrder() => O(n)


  ```

  ",
  category_id: 4
)

Solution.create!(
  user: hagay,
  solution: "class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // inserts node at correct position in tree
    // O(log-n)
    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let curr = this.root;
        while (true) {
            if (value === curr.value) return;
            if (value < curr.value) {
                if (!curr.left) {
                    curr.left = newNode;
                    return this;
                }
                curr = curr.left;

            } else if (value > curr.value){
                if (!curr.right) {
                    curr.right = newNode;
                    return this;
                }
                curr = curr.right;
            }
        }
    }

    // searches for a value
    // returns node if exists, or false
    // O(log-n)
    find(value) {
        if (!this.root) return false;
        let curr = this.root;
        while (true) {
            if (curr.value === value) return curr;
            if (curr.value < value) {
                if (!curr.right) return false;
                curr = curr.right;
            } else {
                if (!curr.left) return false;
                curr = curr.left;
            }
        }
    }

    // searches for a value
    // returns true if exists, or false
    // O(log-n)
    contains(value) {
        if (!this.root) return false;
        let curr = this.root;
        while (true) {
            if (curr.value === value) return true;
            if (curr.value < value) {
                if (!curr.right) return false;
                curr = curr.right;
            } else {
                if (!curr.left) return false;
                curr = curr.left;
            }
        }
    }

    // Breadth First Search
    // root to leaf bfs. For:
    // ....10....
    // ..6...15...
    // .3.8....20.
    // => [10,6,15,3,8,20]

    // how it works:
    // keep queue of nodes that need checking
    // store value of node as it comes out of queue
    // put left and right in queue if exist
    BFS() {
        let node = this.root;
        const data = [],
              queue = [node];
        while (queue.length) {
            node = queue.shift();
            data.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }

    // for each node starting at root:
    // traverse left side, then right side
    DFSPreOrder() {
        const data = [];
        const traverse = node => {
            data.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }

    // traverse left & right of each node
    // then visit the node itself
    // so last node vistied is root
    DFSPostOrder() {
        const data = [];
        const traverse = node => {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            data.push(node.value);
        }
        traverse(this.root);
        return data;
    }

    // 1, traverse entire left side
    // 2. Visit root
    // 3. traverse entire right
    DFSInOrder() {
        const data = [];
        const traverse = node => {
            if (node.left) traverse(node.left);
            data.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
}

tree = new BinarySearchTree();

tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

// The Tree:
// ....10....
// ..6...15...
// .3.8....20.

// BFS():
// => [10,6,15,3,8,20]


// DFSPreOrder():
// => [10,6,3,8,15,20]

// DFSPostOrder():
// => [3,8,6,20,15,10]

// DFSInOrder():
// => [3,6,8,10,15,20]


// WHEN TO USE BFS vs DFS?

// DFS when the tree is full/wide
// 1. less memory by not storing nodes in queue

// BFS on a very lopsided tree is better
// less nodes in memory (only 1 if totally 1-sided)

// TIME COMPLEXITY IS THE SAME FOR BOTH
// space complexity depends on shape of tree


// WHEN TO USE Pre vs Post vs In Order?

// not too importantm but:
// 1. InOrder gives nodes in order
// 2. PreOrder good for flatten/duplicate a tree",
  challenge_id: 32,
  time_complexity: 'O(log-n)',
  space_complexity: 'O(n)',
  notes: '```

  Binary search trees ara a type of binary tree,
  which are types of trees.

  BST excel at searching and accessing items,
  thanks to their sorted structure.

  DFS and BFS apply to all trees, not just BSTs.

  ```',
  language: 'javascript'
)

# PRINT RECURSIVELY

Challenge.create!(
  title: 'Collect Strings',
  description: "Write a recursive function that takes an object as an input, and returns an array of all the string values in that object. The object may contain nested arrays and objects.

  ```

    Input: {
      key1: [null, 5, {}, []],
      key2: 'hello',
      key3: {
        key4: 'world',
        key5: {
          key6: {
            key7: {
              key8: '!'
            }
          }
        }
      }
    }

    Output: ['hello', 'world', '!']

  ```

  ",
  category_id: 12
)

Solution.create!(
  user: hagay,
  solution: 'function collectString(obj) {
    const result = [];

    function recurHelper(o) {
        for (const key in o) {
            if (typeof o[key] === "string") {
                result.push(o[key]);
            }
            else if (typeof o[key] === "object") {
                return recurHelper(o[key])
            }
        }
    }
    recurHelper(obj)
    return result;
}',
  challenge_id: 33,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: '
  # Recursion
  ## Recursion
  ### Recursion
  #### Recursion
  ##### Recursion
  ###### Recursion
',
  language: 'javascript'
)

# RECURSIVE VALID PALINDROME

Challenge.create!(
  title: 'Recursive Valid Palindrome',
  description: "Write a recursive function that takes a string and returns true if that string is a palidrome, and otherwise returns false.

  ```

    Input: 'racecar'
    Output: true

    Input: 'banana'
    Output: false

  ```

  ",
  category_id: 12
)

Solution.create!(
  user: hagay,
  solution: 'function palindrome(s) {
    if (s.length < 2) return true;
    return s[0] === s[s.length-1]
      && palindrome(s.slice(1,s.length-1));
}',
  challenge_id: 34,
  time_complexity: 'O(n)',
  space_complexity: 'O(n^2)',
  notes: '
  # Recursion
  ## Recursion
  ### Recursion
  #### Recursion
  ##### Recursion
  ###### Recursion

  ```


  ```
  Not advised to do this with recursion, because of all the extra memory.


',
  language: 'javascript'
)

# DEEP ITERATE

Challenge.create!(
  title: 'Deep Iterate',
  description: "Write a recursive function that flattens a deeply nested array.

  ```

    Input: [5, [6, [7], 8], [9, [10, [11, [12]]]]]
    Output: [5, 6, 7, 8, 9, 10 ,11, 12]

  ```

  ",
  category_id: 12
)

Solution.create!(
  user: hagay,
  solution: 'function stringifyNumbers(obj) {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === "number") {
            result[key] = `${obj[key]}`;
        }
        else if ((typeof obj[key] === "object")
                 && (!Array.isArray(obj[key]))) {
            result[key] = stringifyNumbers(obj[key]);
        }
        else {
            result[key] = obj[key];
        }
    }
    return result;
}',
  challenge_id: 35,
  time_complexity: 'O(n)',
  space_complexity: 'O(n)',
  notes: '
  # Recursion
  ## Recursion
  ### Recursion
  #### Recursion
  ##### Recursion
  ###### Recursion

  ```


  ```
  Pretty cool solution. Trick is to make sure the object is not an array.


',
  language: 'javascript'
)

# RECURSIVE EXPONENT

Challenge.create!(
  title: 'Recursive Exponent',
  description: "Write a recursive that takes a base and a power, and calculates the base^power.

  ```

    Input: base = 2, power = 4
    Output: 16

    Input: base = 20, power = 2
    Output: 400

    Input: base = 1000, power = 0
    Output: 1

  ```

  ",
  category_id: 12
)

Solution.create!(
  user: hagay,
  solution: 'function recursiveExponent (base, power) {
    if(power == 0)  return 1
    else { return base * recursiveExponent(base,power-1) }
}',
  challenge_id: 36,
  time_complexity: 'O(n)',
  space_complexity: 'O(1)',
  notes: '
  # Recursion
  ## Recursion
  ### Recursion
  #### Recursion
  ##### Recursion
  ###### Recursion



',
  language: 'javascript'
)

# RGB TO HEXADECIMAL

Challenge.create!(
  title: 'RGB to Hexadecimal',
  description: "Write a function that converts RGB color values to hexadcimal values


  ```

    Input: r = 35, g = 200, blue = 234
    Output: '23C8EA'

    Input: r = 255, g = 255, blue = 255
    Output: 'FFFFFF'

  ````
  ",
  category_id: 11
)

Solution.create!(
  user: hagay,
  solution: 'function rgb(r, g, b){
    return toHex(r) + toHex(g) + toHex(b);

}

function toHex(n) {
    if (n < 0) return "00"
    else if (n > 255) return "00"
    else {
        let hex = n.toString(16)
        return hex.length < 2 ? (0 + hex).toUpperCase() : hex.toUpperCase()
    }
}',
  challenge_id: 37,
  time_complexity: 'O(n)',
  space_complexity: 'O(N)',
  notes: '
 Relies on string conversion.

',
  language: 'javascript'
)

Solution.create!(
  user: hagay,
  solution: 'function rgb(r, g, b){
    return [r,g,b].map((x) => {
      return ("0" + Math.max(0, Math.min(255, x))
        .toString(16))
        .slice(-2);
    }).join('').toUpperCase();
}',
  challenge_id: 37,
  time_complexity: 'O(n)',
  space_complexity: 'O(N)',
  notes: '
 Relies on string conversion and `math magic`

',
  language: 'javascript'
)

# CREATE A BINARY HEAP

Challenge.create!(
  title: 'Create A Binary Heap',
  description: "Create a Max Binary Heap Tree class. You do not need to create a Node class, instead use an array to store the heap.

  Your binary heap class should have the following instance methods with the following time complexities:

  ```


  insert(value) => O(log-n)


  extractMax() => O(log n)


  ```

  ",
  category_id: 4
)

Solution.create!(
  user: hagay,
  solution: '// MAX BINARY HEAPS

  // binary trees where each node is
  // smaller than its parent

  // only rule is that children < parent
  // no rules for order of children
  // need to fill row before new row (unlike BST)

  // ......20.......
  // ....8....17....
  // ..5..3..11..4..

  // you can make a Node class and Tree class
  // but can be abstracted to array

  // => [20,8,17,5,3,11,4]

  // if n is parent index:
  // 1. child-1 index is at (2n + 1)
  // 2. child-2 index is at (2n + 2)

  // if n is child index:
  // 1. parent index is at Math.floor((n - 1)/2)


  // TIME COMPLEXITIES:

  // Insertion - O(log n)
  // Removal - O(log n)
  // Search - O(n)

  class MaxBinaryHeap {
      constructor() {
          this.values = [];
      }

      // To Add to Heap:
      // 1. Add to the end
      // 2. "Bubble up" to correct spot
      //    a. swap with parent until <= parent
      insert(value) {
          this.values.push(value);
          return this.bubbleUp();
      }

      bubbleUp() {
          let idx = this.values.length - 1;
          const element = this.values[idx];
          while (idx > 0) {
              const parentIdx = Math.floor((idx-1)/2);
              const parent = this.values[parentIdx];
              if (element <= parent) break;
              this.values[idx] = parent;
              this.values[parentIdx] = element;
              idx = parentIdx;
          }
          return this.values;
      }

      // remove root from heap
      // will be max or min depending on heap
      // To Extract from Heap:
      // 1. Remove root, replace with last values
      // 2. "Sink down" to correct position
      //   a. compare w left and right
      //   b. if smaller than both, replace with bigger
      //   c. repeat until no childs/bigger than childs
      extractMax() {
          const max = this.values[0];
          const end = this.values.pop();
          if (this.values.length > 0) {
              this.values[0] = end;
              this.sinkDown();
          }
          return max;
      }

      sinkDown() {
          let idx = 0;
          const length = this.values.length;
          const element = this.values[0];
          while (true) {
              const leftChildIdx = 2 * idx + 1;
              const rightChildIdx = 2 * idx + 2;
              let leftChild, rightChild;
              let swap;

              if (leftChildIdx < length) {
                  leftChild = this.values[leftChildIdx];
                  if (leftChild > element) {
                      swap = leftChildIdx;
                  }
              }
              if (rightChildIdx < length) {
                  rightChild = this.values[rightChildIdx];
                  if ((!swap && rightChild > element)
                     || (swap && rightChild > leftChild)
                  ) {
                     swap = rightChildIdx;
                  }
              }
              if (!swap) break;
              this.values[idx] = this.values[swap];
              this.values[swap] = element;
              idx = swap;
          }
      }
  }

  const heap = new MaxBinaryHeap();
  heap.insert(20);
  heap.insert(8);
  heap.insert(17);
  heap.insert(5);
  heap.insert(3);
  heap.insert(11);
  heap.insert(4);

  ',
  challenge_id: 38,
  time_complexity: 'O(log n)',
  space_complexity: 'O(n)',
  notes: '
  Relies on helper methods sinkDown() and bubbleUp()

',
  language: 'javascript'
)

# CREATE A PRIORITY QUEUE

Challenge.create!(
  title: 'Create A Priority Queue',
  description: "Create a Priority Queue class by implementing a Min Binary Heap. You DO need to create a Node class, with instance variables `val` and `priority`.

  Your Priority Queue class should have the following instance methods with the following time complexities:

  ```


  enqueue(value) => O(log-n)


  dequeue() => O(log n)


  ```

  ",
  category_id: 4
)

Solution.create!(
  user: hagay,
  solution: '// PRIORITY QUEUE

  // abstract structure, often made with heaps

  // This priority queue uses a min binary-heap

  class Node {
      constructor(val, priority) {
          this.val = val;
          this.priority = priority;
      }
  }

  class PriorityQueue {
      constructor() {
          this.values = [];
      }

      // like heap insert:
      // 1. put at end bubble
      // 2. bubble up according to priority
      // O(log n)
      enqueue(val, priority) {
          const newNode = new Node(val, priority)
          this.values.push(newNode);
          this.bubbleUp();
      }

      bubbleUp() {
          let idx = this.values.length - 1;
          const element = this.values[idx];
          while (idx > 0) {
              const parentIdx = Math.floor((idx-1)/2)
              const parent = this.values[parentIdx];
              if (element.priority >= parent.priority) break;
              this.values[parentIdx] = element;
              this.values[idx] = parent;
              idx = parentIdx;
          }
      }

      // removes root, switch with last
      // sink down new root according to priority
      // O(log n)
      dequeue() {
          const min = this.values[0];
          const end = this.values.pop();
          if (this.values.length > 0) {
              this.values[0] = end;
              this.sinkDown();
          }
          return min;
      }

      sinkDown() {
          let idx = 0;
          const length = this.values.length;
          const element = this.values[0];
          while (true) {
              const leftChildIdx = 2 * idx + 1;
              const rightChildIdx = 2 * idx + 2;
              let leftChild, rightChild;
              let swap;

              if (leftChildIdx < length) {
                  leftChild = this.values[leftChildIdx];
                  if (leftChild.priority < element.priority) {
                      swap = leftChildIdx;
                  }
              }
              if (rightChildIdx < length) {
                  rightChild = this.values[rightChildIdx];
                  if ((!swap && rightChild.priority < element.priority)
                     || (swap && rightChild.priority < leftChild.priority)
                  ) {
                     swap = rightChildIdx;
                  }
              }
              if (!swap) break;
              this.values[idx] = this.values[swap];
              this.values[swap] = element;
              idx = swap;
          }
      }
  }

  const ER = new PriorityQueue();

  ER.enqueue(\'cold\', 5)
  ER.enqueue(\'gun-shot\', 1)
  ER.enqueue(\'covid\', 3)
  ER.enqueue(\'broken arm\', 2)
  ER.enqueue(\'glass in foot\', 4)',
  challenge_id: 39,
  time_complexity: 'O(log n)',
  space_complexity: 'O(n)',
  notes: '
  Uses a Min Binary Heap to create a priority queue. Lower priority values have a higher priorities.

',
  language: 'javascript'
)

resource_categories = %w[Challenges Course Blog Book/PDF Video Tutorial GitHub]

puts 'Seeding resource categories... 🌱'
(0..6).each do |i|
  ResourceCategory.create!(name: resource_categories[i])
end

# MATH.js

Resource.create!(
  resource_category_id: 7,
  title: 'Math.js',
  description: 'Extensive math library for JavaScript and Node.js. Powerful and easy to use.',
  external_url: 'https://github.com/josdejong/mathjs',
  is_free: true
)

# THE CODING TRAIN

Resource.create!(
  resource_category_id: 5,
  title: 'The Coding Train',
  description: 'Learn Java, JavaScript, Proccessing, p5.js, and more coding concepts from an infectiously positive YouTuber.',
  external_url: 'https://www.youtube.com/c/TheCodingTrain/featured',
  is_free: true
)

# CS50

Resource.create!(
  resource_category_id: 2,
  title: 'CS50',
  description: 'Take Harvard University\'s *CS50 Introduction to Computer Science* for FREE on edX.



  A fantastic resource.  ',
  external_url: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
  is_free: true
)

# OVERREACTED

Resource.create!(
  resource_category_id: 3,
  title: 'Overreacted',
  description: 'Personal blog of Dan Abramov, Facebook engineer and creator of Redux and Create React App.


  Some *great* content on React.js development.',
  external_url: 'https://overreacted.io/',
  is_free: true
)

# JS CHALLENGER

Resource.create!(
  resource_category_id: 1,
  title: 'JSChallenger',
  description: 'Nice beginner challenges in JavaScript.',
  external_url: 'https://www.jschallenger.com/',
  is_free: true
)

# REGEX 101

Resource.create!(
  resource_category_id: 1,
  title: 'Regex 101',
  description: 'Language agnostic sandbox for testing regex queries.',
  external_url: 'https://regex101.com/',
  is_free: true
)

# MARKDOWN CHEATSHEET

Resource.create!(
  resource_category_id: 6,
  title: 'Markdown Cheat Sheet',
  description: 'Quick syntax reference for Markdown',
  external_url: 'https://www.markdownguide.org/cheat-sheet/',
  is_free: true
)

# CRACKING THE CODING INTERVIEW

Resource.create!(
  resource_category_id: 4,
  title: 'Cracking the Coding Interview',
  description: 'GitHub-hosted PDF of the interview-prep book.',
  external_url: 'https://github.com/Avinash987/Coding/blob/master/Cracking-the-Coding-Interview-6th-Edition-189-Programming-Questions-and-Solutions.pdf',
  is_free: true
)

# CODEWARS

Resource.create!(
  resource_category_id: 1,
  title: 'Practice Challenges',
  description: 'Another algorithm site.

  Similar to LeetCode, but with 8 difficulty levels.',
  external_url: 'https://www.codewars.com/dashboard',
  is_free: true
)

# NEETCODE PLAYLIST

Resource.create!(
  resource_category_id: 5,
  title: 'NeetCode Interview Prep',
  description: 'Video playlist of interview prep material by algo YouTuber NeetCode.

  Very easy to follow content.',
  external_url: 'https://www.youtube.com/watch?v=aa2ijyWBBIc&list=PLot-Xpze53lcBX3BPCUoqlt4-KL-3XFHz',
  is_free: true
)

# MY BLOG

Resource.create!(
  resource_category_id: 3,
  title: 'scriptable',
  description: 'Hagay Haut\'s tech blog',
  external_url: 'https://scriptable.hashnode.dev/',
  is_free: true
)

# TOP INTERVIEW QUESTIONS

Resource.create!(
  resource_category_id: 1,
  title: 'LeetCode Top Interview Questions',
  description: 'Ever changing list of the current "top" list of interview questions',
  external_url: 'https://leetcode.com/explore/interview/card/top-interview-questions-easy/',
  is_free: true
)

# BLIND 75

Resource.create!(
  resource_category_id: 1,
  title: 'Grind 75',
  description: 'A curated list of 75 LeetCode challenges based on the famous "Blind 75".

  Option to customize list.

  Designed to help study the core patterns in DSA.',
  external_url: 'https://www.techinterviewhandbook.org/grind75',
  is_free: true
)

# GROKKING ALGORITHMS

Resource.create!(
  resource_category_id: 4,
  title: 'Grokking Algorithms',
  description: 'PDF of popular DSA book. Free Download.',
  external_url: 'https://www.dropbox.com/scl/fo/p06spafxoj8b0dfmkec00/h?dl=0&rlkey=no3xvsdh3l10343rg8eq8tcoo',
  is_free: true
)

# FREECODECAMP

Resource.create!(
  resource_category_id: 2,
  title: 'Responsive Web Design',
  description: "Free course covering basic web design topics in HTML5 and CSS.

  Great introduction to web development.",
  external_url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
  is_free: true
)

# UDEMY COLT STEELE COURSE

Resource.create!(
  resource_category_id: 2,
  title: 'JavaScript Algorithms and Data Structures Masterclass',
  description: "Udemy course created by Colt Steele that covers a large array (no pun intended) of DSA topics, taught in JS.

  This is a paid course, but you can often find it going for 80% off.",
  external_url: 'https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/',
  is_free: false
)

puts 'Seeding comments... 🌱'
90.times do
  Comment.create!(
    solution_id: rand(1..42),
    user_id: rand(1..5),
    comment: Faker::Hacker.say_something_smart
  )
end

puts 'Done Seeding! 🌱'
