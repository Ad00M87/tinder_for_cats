class Api::CatsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Cat.random_cats(current_user.liked_cats)
  end

  def my_cats
    render json: Cat.liked(current_user.liked_cats)
  end

  #/api/cats/:id (normally)
  def update
    current_user.liked_cats << params[:id].to_i
    current_user.save
  end
end
