class SolutionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :challenge_id, :solution, :time_complexity, :space_complexity, :notes, :language,
             :user_name

  belongs_to :challenge

  def user_name
    object.user.username
  end
end
