class Solution < ApplicationRecord
  belongs_to :user
  belongs_to :challenge

  has_many :comments

  validates :user_id, presence: true
  validates :challenge_id, presence: true
  validates :solution, length: { minimum: 10 }
  validates :time_complexity, length: { minimum: 1 }
  validates :space_complexity, length: { minimum: 1 }
  validates :notes, presence: true
  validates :language, length: { minimum: 1 }
end
