# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts 'Seeding... 🌱'
User.destroy_all
Solution.destroy_all
Challenge.destroy_all
Comment.destroy_all
Category.destroy_all

complexities = %w(O(n) O(1) O(n^2) O(log-n) O(n-log-n) O(n!))

categories = %w[array hashmap linked-list binary-tree graph two-pointer sliding-window set stack-queue sort string
                recursion]

languages = %w[c csharp cpp go java javascript php python ruby rust typescript]

solutions = [
  "var twoSum = function(nums, target) {
    let obj = {};
    for(let i = 0; i < nums.length; i++) {
       const needed = target - nums[i]
       if(needed in obj) return [obj[needed],i]
       obj[nums[i]] = i;
    }
};", "var twoSum = function(nums, target) {
  let obj = {};
  for(let i = 0; i < nums.length; i++) {
     const needed = target - nums[i]
     if(needed in obj) return [obj[needed],i]
     obj[nums[i]] = i;
  }
};", "var mergeTwoLists = function(list1, list2) {
  return [...list1,...list2].sort((a,b) => a -b)
};", "var maxProfit = function(prices) {
  let maxProfit = 0;
  let minPrice = prices[0];
  prices.forEach(price => {
      const profit = price - minPrice;
      if (maxProfit < profit) maxProfit = profit;
      if (minPrice > price) minPrice = price;
  })
  return maxProfit;
};", "var isPalindrome = function(s) {
  const str = s.replace(/[\W_]/g, '').toLowerCase()
  return str === str.split('').reverse().join('')
};",
  "def invert_tree(root)
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
end", "def is_anagram(s, t)
    s.split(//).sort == t.split(//).sort
end", "var search = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (nums[mid] === target) return mid;
      nums[mid] < target ? low = mid + 1 : high = mid - 1;
  }
  return -1;
};", "const maxSubArray = function(nums) {
  let maxSum = nums[0];
  let curSum = 0;

  nums.forEach(n => {
      if (curSum < 0) curSum = 0;
      curSum += n;
      if (maxSum < curSum) maxSum = curSum;
  })
  return maxSum;
};", "def hasCycle(head)
    return false if !head
    left = head
    right = head.next
    while right != left
        return false if !right || !right.next
        left = left.next
        right = right.next.next
    end
    return true
end", "def first_bad_version(n)
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
end", "def climb_stairs(n)
    f1 = 1
    f2 = 1

    (1..n - 1).each do |i|
        temp = f1
        f1 = f1 + f2
        f2 = temp
end

f1
end", "var reverseList = function(head) {
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
};", "var singleNumber = function(nums) {
  return nums.reduce((a, b) => a ^ b);
};"
]

challengeTitles = ['Two Sum', 'Valid Parentheses', 'Merge Two Sorted Lists', 'Best Time To Buy And Sell Stock',
                   'Valid Palindrome', 'Invert Binary Tree', 'Valid Anagram', 'Binary Search', 'Maximum Subarray',
                   'Linked List Cycle', 'First Bad Version', 'Climbing Stairs', 'Reverse Linked List', 'Single Number']

cinna = User.create!(username: 'cinna', password: 'toy')
arlo = User.create!(username: 'arlo', password: 'toy')
bacon = User.create!(username: 'bacon', password: 'toy')
chango = User.create!(username: 'chango', password: 'toy')

(0..11).each do |i|
  Category.create!(
    name: categories[i]
  )
end

(0..13).each do |i|
  Challenge.create!(
    title: challengeTitles[i],
    description: Faker::Lorem.paragraph(sentence_count: 8),
    category_id: rand(1..12),
    external_url: Faker::Internet.url
  )
end

Solution.create!(
  user_id: 1,
  challenge_id: 1,
  solution: solutions[0],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: 1,
  challenge_id: 2,
  solution: solutions[1],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: 1,
  challenge_id: 3,
  solution: solutions[2],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: 1,
  challenge_id: 4,
  solution: solutions[3],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: 1,
  challenge_id: 5,
  solution: solutions[4],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: 1,
  challenge_id: 6,
  solution: solutions[5],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: 1,
  challenge_id: 7,
  solution: solutions[6],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: 1,
  challenge_id: 8,
  solution: solutions[7],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: 1,
  challenge_id: 9,
  solution: solutions[8],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: 1,
  challenge_id: 10,
  solution: solutions[9],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: 1,
  challenge_id: 11,
  solution: solutions[10],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: 1,
  challenge_id: 12,
  solution: solutions[11],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: 1,
  challenge_id: 13,
  solution: solutions[12],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: 1,
  challenge_id: 14,
  solution: solutions[13],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

30.times do
  Comment.create!(
    solution_id: rand(1..14),
    user_id: rand(1..4),
    comment: Faker::Lorem.sentence
  )
end

puts 'Done Seeding! 🌱'
