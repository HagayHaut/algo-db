class CommentSerializer < ActiveModel::Serializer
  attributes :id, :solution_id, :comment, :user_id

  belongs_to :user
  belongs_to :solution
end
