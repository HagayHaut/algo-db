class SolutionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :challenge_id, :solution, :time_complexity, :space_complexity, :notes
end
