class SolutionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
    if params[:user_id]
      user = User.find(params[:user_id])
      render json: user.solutions, status: :ok
    else
      render json: Solution.all, status: :ok
    end
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
    params.permit(:user_id, :challenge_id, :solution, :time_complexity, :space_complexity, :notes, :language)
  end

  def find_solution
    Solution.find(params[:id])
  end

  def not_found_response
    render json: { error: 'Solution not found' }, status: 404
  end
end
