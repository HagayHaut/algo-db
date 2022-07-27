class ResourcesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

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

  def destroy
    resource = find_resource
    resource.destroy
    head :no_content
  end

  private

  def resource_params
    params.permit(:resource_category_id, :title, :description, :external_url, :is_free)
  end

  def find_resource
    Resource.find(params[:id])
  end

  def not_found_response
    render json: { errors: ['Resource not found'] }, status: :not_found
  end
end
