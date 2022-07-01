class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  before_action :authorize

  def count
    solution_count = Solution.count
    challenge_count = Challenge.count
    render json: { solution_count: solution_count, challenge_count: challenge_count }, status: :ok
  end

  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])

    render json: { errors: ['Not authorized'] }, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
