# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts 'Seeding... 🌱'
User.destroy_all
Solution.destroy_all
Challenge.destroy_all
Comment.destroy_all
Category.destroy_all

complexities = %w(O(n) O(1) O(n^2) O(log-n) O(n-log-n) O(n!))
categories = %w[array hashmap linked-list binary-tree graph two-pointer sliding-window set stack-queue sort
                string recursion]

cinna = User.create(username: 'cinna', password: 'toy')
arlo = User.create(username: 'arlo', password: 'toy')
bacon = User.create(username: 'bacon', password: 'toy')
chango = User.create(username: 'chango', password: 'toy')

(0..11).each do |i|
  Category.create(
    name: categories[i]
  )
end

8.times do
  Challenge.create(
    title: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    category_id: rand(1..12),
    external_url: Faker::Internet.url
  )
end

20.times do
  Solution.create(
    user_id: rand(1..4),
    challenge_id: rand(1..8),
    solution: Faker::Lorem.paragraph,
    time_complexity: complexities[rand(0..5)],
    space_complexity: complexities[rand(0..5)],
    notes: Faker::Lorem.paragraph
  )
end

30.times do
  Comment.create(
    solution_id: rand(1..20),
    user_id: rand(1..4),
    comment: Faker::Lorem.sentence
  )
end

puts 'Done Seeding! 🌱'
