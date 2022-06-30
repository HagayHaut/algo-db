class Challenge < ApplicationRecord
  has_many :solutions, dependent: :destroy
  has_many :users, through: :solutions

  belongs_to :category

  validates :title, presence: true, uniqueness: true
  validates :description, presence: true, length: { minimum: 50 }, uniqueness: true
  validates :category_id, presence: true
end
