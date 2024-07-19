# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      @token = request.env['warden-jwt_auth.token']
      headers['Authorization'] = @token

      render json: {
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        .merge(
          code: 200,
          message: 'Signed up successfully.',
          token: @token,
        )
      }
    else
      render json: {
        error: "User couldn't be created. #{resource.errors.full_messages.to_sentence}"
      }, status: :unprocessable_entity
    end
  end
end
