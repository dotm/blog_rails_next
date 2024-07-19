require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @post = posts(:one)
    @auth_headers = { Authorization: "Bearer #{generate_jwt(@user.email, 'password')}" }
  end

  test "should get index" do
    get posts_url, as: :json
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal 4, json_response["data"].length
  end

  test "should get index with all query param" do
    get posts_url(limit: 2, last_oldest_post_id: 3), as: :json
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal 2, json_response["data"].length
  end

  test "should get index with limit only" do
    get posts_url(limit: 2), as: :json
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal 2, json_response["data"].length
  end

  test "should handle last page correctly" do
    get posts_url(last_oldest_post_id: 1), as: :json
    assert_response :success
    
    json_response = JSON.parse(response.body)
    assert_equal 0, json_response["data"].length
  end

  test "should create post" do
    assert_difference('Post.count') do
      post posts_url, params: { post: { title: 'New Post', content: 'New Content' } }, headers: @auth_headers, as: :json
    end

    assert_response :created
  end

  test "should not create post without authentication" do
    post posts_url, params: { post: { title: 'New Post', content: 'New Content' } }, as: :json
    assert_response :unprocessable_entity
  end

  test "should show post" do
    get post_url(@post), as: :json
    assert_response :success
  end

  test "should update post" do
    patch post_url(@post), params: { post: { title: 'Updated Title', content: 'Updated Content' } }, headers: @auth_headers, as: :json
    assert_response :success
  end

  test "should destroy post" do
    assert_difference('Post.count', -1) do
      delete post_url(@post), headers: @auth_headers, as: :json
    end

    assert_response :no_content
  end

  private

  def generate_jwt(email, password)
    post "/login", params: { user: { email: email, password: password } }, as: :json
    assert_response :success
    JSON.parse(response.body)["data"]["token"]
  end
end
