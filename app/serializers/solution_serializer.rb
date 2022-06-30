class SolutionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :challenge_id, :solution, :time_complexity, :space_complexity, :notes, :language,
             :user_name, :comments

  belongs_to :challenge
  has_many :comments, serializer: CommentSerializer

  def user_name
    object.user.username
  end
end
