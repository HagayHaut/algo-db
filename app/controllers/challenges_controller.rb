class ChallengesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  def index
    render json: Challenge.all, status: :ok
  end

  def show
    challenge = find_challenge
    render json: challenge, status: :ok
  end

  def create
    challenge = Challenge.create!(challenge_params)
    render json: challenge, status: :created
  end

  private

  def challenge_params
    params.permit(:title, :description, :category_id, :external_url)
  end

  def find_challenge
    Challenge.find(params[:id])
  end

  def not_found_response
    render json: { error: 'Challenge not found' }, status: 404
  end
end
