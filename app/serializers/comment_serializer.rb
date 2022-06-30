class CommentSerializer < ActiveModel::Serializer
  attributes :comment, :user_name

  def user_name
    object.user.username
  end
end
