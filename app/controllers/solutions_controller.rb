class SolutionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
    render json: Solution.all, status: :ok
  end

  def show
    solution = find_solution
    render json: solution, status: :ok
  end

  def create
    solution = Solution.create!(solution_params)
    render json: solution, status: :created
  end

  private

  def solution_params
    params.permit(:user_id, :challenge_id, :solution, :time_complexity, :space_complexity, :notes)
  end

  def find_solution
    Solution.find(params[:id])
  end

  def not_found_response
    render json: { error: 'Solution not found' }, status: 404
  end
end
