class UserListSerializer < ActiveModel::Serializer
  attributes :username, :counts, :joined_on, :id
end
