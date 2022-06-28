# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts 'Seeding... 🌱'
User.destroy_all
Solution.destroy_all
Challenge.destroy_all

complexities = %w(O(n) O(1) O(n^2) O(log-n) O(n-log-n) O(n!))

cinna = User.create(username: 'cinna', password: 'toy')
arlo = User.create(username: 'arlo', password: 'toy')
bacon = User.create(username: 'bacon', password: 'toy')
chango = User.create(username: 'chango', password: 'toy')

8.times do
  Challenge.create(
    title: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph
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

puts 'Done Seeding! 🌱'
