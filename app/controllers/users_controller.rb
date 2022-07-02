class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  skip_before_action :authorize, only: :create

  # GET '/users/:id
  def show
    user = find_user
    render json: user, status: :ok
  end

  # GET '/me'
  def me
    render json: @current_user, status: :ok
  end

  # GET '/user_count'
  def count
    user = find_user
    solution_count = user.solutions.count
    challenge_count = user.challenges.count
    render json: { solution_count: solution_count, challenge_count: challenge_count }, status: :ok
  end

  # POST '/signup'
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private

  def find_user
    User.find(params[:id])
  end

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end

  def not_found_response
    render json: { errors: ['User not found'] }, status: 404
  end
end
