class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  skip_before_action :authorize, only: :create

  # POST '/signup'
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    user = find_user
    render json: user, status: :ok
  end

  # GET '/me'
  def me
    render json: @current_user, status: :ok
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
