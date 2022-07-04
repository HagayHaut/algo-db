class ResourcesController < ApplicationController
  def index
    render json: Resource.all, status: :ok
  end

  def count
    count = Resource.count
    render json: { resources_count: count }, status: :ok
  end

  def create
    resource = Resource.create!(resource_params)
    render json: resource, status: :created
  end

  private

  def resource_params
    params.permit(:resource_category_id, :title, :description, :external_url, :is_free)
  end
end
