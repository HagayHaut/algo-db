class SolutionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
    render json: Solution.all, status: :ok
  end

  def show
    solution = find_solution
    render json: solution, status: :ok
  end

  private

  def find_solution
    Solution.find(params[:id])
  end

  def not_found_response
    render json: { error: 'Solution not found' }, status: 404
  end
end
