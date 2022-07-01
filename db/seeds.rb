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
                recursion bit-manipulation math]

languages = %w[c csharp cpp go java javascript php python ruby rust typescript ada coffeescript haskell fortran julia
               kotlin lisp lua perl scala sql]

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
};", 'import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}', "public void traverseInOrder(Node node) {
  if (node != null) {
      traverseInOrder(node.left);
      visit(node.value);
      traverseInOrder(node.right);
  }
}", "pub fn gcd(nums: &[usize]) -> usize {
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
}", "def rotate(nums, k)
  k.times do
    nums.unshift nums.pop
  end
end", "def move_zeroes(nums)
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
end", "def roman_to_int(s)
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
end", "def generate(num_rows)
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
end"
]

challengeTitles = ['Two Sum', 'Valid Parentheses', 'Merge Two Sorted Lists', 'Best Time To Buy And Sell Stock',
                   'Valid Palindrome', 'Invert Binary Tree', 'Valid Anagram', 'Binary Search', 'Maximum Subarray',
                   'Linked List Cycle', 'First Bad Version', 'Climbing Stairs', 'Reverse Linked List', 'Single Number',
                   'Say Hello', 'Depth First Search', 'Greatest Common Denominator', 'Rotate Array', 'Move Zeros', 'Roman To Integer', "Pascal's Triangle"]

puts 'Seeding users... 🌱'
cinna = User.create!(username: 'Cinna', password: 'toy')
arlo = User.create!(username: 'Arlo', password: 'toy')
bacon = User.create!(username: 'Bacon', password: 'toy')
chango = User.create!(username: 'Chinggis-Khan', password: 'toy')

puts 'Seeding categories... 🌱'
(0..13).each do |i|
  Category.create!(
    name: categories[i]
  )
end

puts 'Seeding challenges... 🌱'
(0..20).each do |i|
  Challenge.create!(
    title: challengeTitles[i],
    description: Faker::Lorem.paragraph(sentence_count: 8),
    category_id: rand(1..14),
    external_url: Faker::Internet.url
  )
end

puts 'Seeding solutions ...🌱'
Solution.create!(
  user_id: rand(1..4),
  challenge_id: 18,
  solution: solutions[17],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

puts 'Seeding solutions ...🌱'
Solution.create!(
  user_id: rand(1..4),
  challenge_id: 20,
  solution: solutions[19],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

puts 'Seeding solutions ...🌱'
Solution.create!(
  user_id: rand(1..4),
  challenge_id: 19,
  solution: solutions[18],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

puts 'Seeding solutions ...🌱'
Solution.create!(
  user_id: rand(1..4),
  challenge_id: 21,
  solution: solutions[20],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

puts 'Seeding solutions ...🌱'
Solution.create!(
  user_id: rand(1..4),
  challenge_id: 1,
  solution: solutions[0],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 2,
  solution: solutions[1],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 3,
  solution: solutions[2],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 4,
  solution: solutions[3],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 5,
  solution: solutions[4],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 6,
  solution: solutions[5],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 7,
  solution: solutions[6],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 8,
  solution: solutions[7],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 9,
  solution: solutions[8],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 10,
  solution: solutions[9],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 11,
  solution: solutions[10],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'ruby'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 12,
  solution: solutions[11],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: 'basically just Nth fibonacci',
  language: 'ruby'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 13,
  solution: solutions[12],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 14,
  solution: solutions[13],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'javascript'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 15,
  solution: solutions[14],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'go'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 16,
  solution: solutions[15],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'java'
)

Solution.create!(
  user_id: rand(1..4),
  challenge_id: 17,
  solution: solutions[16],
  time_complexity: complexities[rand(0..5)],
  space_complexity: complexities[rand(0..5)],
  notes: Faker::Lorem.paragraph,
  language: 'rust'
)

puts 'Seeding comments... 🌱'
50.times do
  Comment.create!(
    solution_id: rand(1..20),
    user_id: rand(1..4),
    comment: Faker::Lorem.sentence
  )
end

puts 'Done Seeding! 🌱'
