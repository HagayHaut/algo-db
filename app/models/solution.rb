class Solution < ApplicationRecord
  belongs_to :user
  belongs_to :challenge

  has_many :comments
end
