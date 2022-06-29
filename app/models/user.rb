class User < ApplicationRecord
  has_many :solutions
  has_many :challenges, through: :solutions
  has_many :comments

  has_secure_password

  validates :username, presence: true, uniqueness: true
end
