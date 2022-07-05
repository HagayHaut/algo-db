# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts 'Begin seeding... 🌱'
User.destroy_all
Solution.destroy_all
Challenge.destroy_all
Comment.destroy_all
Category.destroy_all

complexities = %w(O(n) O(1) O(n^2) O(log-n) O(n-log-n) O(n!))

categories = %w[array hashmap linked-list binary-tree graph two-pointer sliding-window set stack-queue sort string
                recursion bit-manipulation math search]

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
(0..14).each do |i|
  Category.create!(
    name: categories[i]
  )
end

puts 'Seeding resource categories... 🌱'
(0..6).each do |i|
  ResourceCategory.create!(name: resource_categories[i])
end

puts 'Seeding resources... 🌱'
20.times do
  Resource.create!(
    resource_category_id: rand(1..7),
    title: Faker::Lorem.sentence,
    description: Faker::Markdown.sandwich(sentences: 9),
    external_url: Faker::Internet.url,
    is_free: [true, false][rand(0..1)]
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
  description: "You are given an array prices where `prices[i]` is the price of a given stock on the ith day.

  You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

  Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.



  Example 1:

  Input: prices = [7,1,5,3,6,4]
  Output: 5
  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
  Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
  Example 2:

  Input: prices = [7,6,4,3,1]
  Output: 0
  Explanation: In this case, no transactions are done and the max profit = 0.


  Constraints:

  1 <= prices.length <= 105
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

  Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

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

# CLIMB STAIRS

Challenge.create!(
  title: 'Climbing Stairs',
  description: "You are climbing a staircase. It takes n steps to reach the top.

  Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  category_id: 14,
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
  solution: "// Gets number at a given digit (0-indexed starting from right)
  // getDigit(54321,1) => 2
  const getDigit = (n, i) => Math.floor(Math.abs(n)/Math.pow(10,i)%10);

  //Get number of digits in number
  const digitCount = n => n === 0 ? 1 : Math.ceil(Math.log10(Math.abs(n)));

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
  notes: 'uses 9 buckets, digit counts, and log10 % operations. Only works with positive integers.',
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

puts 'Seeding comments... 🌱'
# 50.times do
#   Comment.create!(
#     solution_id: rand(1..20),
#     user_id: rand(1..4),
#     comment: Faker::Lorem.sentence
#   )
# end

# puts 'Done Seeding! 🌱'
