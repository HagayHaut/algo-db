class Challenge < ApplicationRecord
  has_many :solutions, dependent: :destroy
  has_many :users, through: :solutions

  belongs_to :category

  validates :title, presence: true
  validates :description, presence: true, length: { minimum: 100 }, uniqueness: true
  validates :category_id, presence: true
end
