class CommentsController < ApplicationController
  def index
    if params[:solution_id]
      solution = Solution.find(params[:solution_id])
      render json: solution.comments, status: :ok
    else
      render json: Comment.all, status: :ok
    end
  end
end
