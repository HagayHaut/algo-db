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
  notes: 'Sliding window to keep track of minimum proce and aximum profit.',
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

puts 'Seeding comments... 🌱'
# 50.times do
#   Comment.create!(
#     solution_id: rand(1..20),
#     user_id: rand(1..4),
#     comment: Faker::Lorem.sentence
#   )
# end

# puts 'Done Seeding! 🌱'
