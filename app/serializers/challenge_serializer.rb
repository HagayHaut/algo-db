class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :category_id, :external_url
end
