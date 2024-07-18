# README

## TODO

- implement front end
  - create new post
  - get first page automatically
- generate Swagger docs
- create unit test for BE and FE
- standardize response:
  - APIs:
    - failed login (invalid credential error) and failed registration (email registered)
    - create and get post
      - You need to sign in or sign up before continuing.
      - if params[:user_id] != current_user.id
  - example standardization: `{"data": "", "error": {"code": "", "message": ""}}`
- Dockerize?

not for take-home test:
- do authorization by user id for update and destroy post
- in config/initializers/cors.rb:
  - origins '*' # later change to the domain of the frontend app

## Run in Local

- For first time load, run this command: bundle install
  - You might also need to run this: bundle exec rails db:migrate
- To start server: bundle exec rails server

## Initial Setup 

Source:
- https://medium.com/@alaminkhanshakil/rails-api-authentication-a-guide-to-devise-and-devise-jwt-integration-3626710e24c1
- https://blog.appsignal.com/2023/07/12/an-introduction-to-devise-for-ruby-on-rails.html

Steps:

- rails new blog-api --api
- Setup cors
  - uncomment from Gemfile: gem 'rack-cors'
  - update config/initializers/cors.rb
- User auth:
  - In Gemfile add:
    - gem 'devise'
    - gem 'devise-jwt'
    - gem 'jsonapi-serializer'
  - bundle install
  - bundle exec rails generate devise:install
  - update config/initializers/devise.rb
    - config.navigational_formats = []
  - bundle exec rails generate devise User
  - bundle exec rails db:migrate
  - bundle exec rails generate devise:controllers users -c sessions registrations
  - in class Users::SessionsController and class Users::RegistrationsController, set this for API only:
    - respond_to :json
  - update config/routes.rb for devise
- Change port:
  - in config/environments/development.rb, add this to the end of the block:
    - config.action_mailer.default_url_options = { host: 'localhost', port: 3001 }
  - in config/puma.rb, update:
    - port ENV.fetch("PORT") { 3001 }
- Setup JWT:
  - Generate secret: bundle exec rails secret
  - Open credentials.yml.enc:
    - For Windows with VSCode:
      - $env:EDITOR="code --wait"
      - bundle exec rails credentials:edit
    - For Linux: EDITOR='code --wait' rails credentials:edit
  - Add this to credentials.yml.enc:
    - devise_jwt_secret_key: (copy and paste the generated secret here)
  - Add config.jwt in config/initializers/devise.rb
  - Revocation strategy using JTI:
    - bundle exec rails generate migration addJtiToUsers jti:string:index:unique
      - manually update the migration file to ensure null and unique is set:
        - add_column :users, :jti, :string, null: false
        - add_index :users, :jti, unique: true
    - bundle exec rails db:migrate
    - update class User < ApplicationRecord:
      - include Devise::JWT::RevocationStrategies::JTIMatcher
      - :jwt_authenticatable, jwt_revocation_strategy: self
- Create serializer for user model:
  - bundle exec rails generate serializer user id email
- in class Users::SessionsController and class Users::RegistrationsController:
  - add respond_with and respond_to_on_destroy
- Enable session for API only app:
  - in config/application.rb:
    - config.session_store :cookie_store, key: '_interslice_session'
    - config.middleware.use ActionDispatch::Cookies
    - config.middleware.use config.session_store, config.session_options
- Setup posts: 
  - bundle exec rails generate scaffold Post user:references title:string content:text
  - bundle exec rails db:migrate

## Footnote

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
