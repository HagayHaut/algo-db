class Resource < ApplicationRecord
  belongs_to :resource_category

  validates :title, presence: true
  validates :external_url, presence: true, uniqueness: true
  validates :description, presence: true
  validates :resource_category_id, presence: true
end
