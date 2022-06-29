class Solution < ApplicationRecord
  belongs_to :user
  belongs_to :challenge

  has_many :comments

  validates :user_id, presence: true
  validates :challenge_id, presence: true
  validates :solution, length: { minimum: 20 }
  validates :time_complexity, length: { minimum: 1 }
  validates :space_complexity, length: { minimum: 1 }
  validates :notes, presence: true
end