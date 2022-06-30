class CommentsController < ApplicationController
  def index
    if params[:solution_id]
      solution = Solution.find(params[:solution_id])
      render json: solution.comments, status: :ok
    else
      render json: Comment.all, status: :ok
    end
  end

  def create
    comment = Comment.create!(comment_params)
    render json: comment, status: :created
  end

  private

  def comment_params
    params.permit(:comment, :user_id, :solution_id)
  end
end
