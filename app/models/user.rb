class User < ApplicationRecord
  has_many :solutions
  has_many :challenges, through: :solutions
  has_many :comments

  has_secure_password

  validates :username, presence: true, uniqueness: true, length: { minimum: 4 },
                       format: { without: /\s/, message: 'must contain no spaces' }

  def uniq_challenges
    uniqs = {}
    challenges.each do |c|
      uniqs[c.id] = c
    end
    uniqs.values
  end
end
