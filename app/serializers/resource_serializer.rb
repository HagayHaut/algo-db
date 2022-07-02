class ResourceSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :resource_category_id, :external_url, :is_free, :resource_category

  def resource_category
    object.resource_category.name
  end
end
