class PostsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show]
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    last_oldest_post_id = params[:last_oldest_post_id].to_i if params[:last_oldest_post_id].present?
    limit = params[:limit].present? ? params[:limit].to_i : 10

    if last_oldest_post_id
      @posts = Post.where('id < ?', last_oldest_post_id).order(created_at: :desc).limit(limit)
    else
      @posts = Post.order(created_at: :desc).limit(limit)
    end

    render json: {"data": @posts}
  end

  # GET /posts/1
  def show
    render json: {"data": @post}
  end

  # POST /posts
  def create
    begin
      current_user = get_current_user_from_jwt
      @post = Post.new(post_params.merge(user_id: current_user.id))
  
      if @post.save
        render json: { "data": @post }, status: :created, location: @post
      else
        render json: { "error": @post.errors }, status: :unprocessable_entity
      end
  
    rescue StandardError => e
      render json: { "error": e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :content)
    end

    def get_current_user_from_jwt
      authorization_header = request.headers['Authorization']
      if authorization_header.nil?
        raise StandardError, "You need to sign in first."
      end

      jwt_payload = JWT.decode(
        authorization_header.split.last,
        Rails.application.credentials.devise_jwt_secret_key!
      ).first

      current_user = User.find(jwt_payload['sub'])
      return current_user
    end
end
