## Setup and Run in Local

Backend (in one terminal tab):

- `cd blog-api`
- `bundle install`
- Setup JWT:
  - Delete these files if you have them locally:
    - config/master.key
    - config/credentials.yml.enc
  - Generate secret for devise_jwt_secret_key: `bundle exec rails secret`
  - Open credentials.yml.enc:
    - For Windows with VSCode:
      - `$env:EDITOR="code --wait"`
      - `bundle exec rails credentials:edit`
    - For Linux with VSCode: `EDITOR='code --wait' rails credentials:edit`
  - Add this line to credentials.yml.enc:
    - devise_jwt_secret_key: (copy and paste the generated secret here)
  - Note: In production, we can share the config/master.key instead of generating for each contributors
- `bundle exec rails db:migrate`
- `bundle exec rails server`

Frontend (in one terminal tab):

- `cd blog-frontend`
- `npm install`
- `npm run dev`

Manual testing:

- You can then use the UI at localhost:3000 to manually test the app.
  - Backend is at 3001.
- API Docs:
  - Postman: ./rails-blog-api.postman_collection.json
  - Swagger: ./swagger-docs.yaml
  - Swagger UI:
    - go to: https://metamug.com/util/postman-to-swagger/
    - paste the postman json file: rails-blog-api.postman_collection.json
    - click Swagger UI tab

## Run Unit Test

Backend:

- make sure you have done the setup steps above
- `bundle exec rake db:test:prepare`
- `bundle exec rake db:migrate`
- `bundle exec rails test`

Frontend:

- make sure you have done the setup steps above
  - especially the `npm install`
- `npm run test`

## Further Information

- Go to blog-api README.md for backend specific README.
- Go to blog-frontend README.md for frontend specific README.

Notes:
- If you have Sign In or Sign Up successfully and want to test error paths (wrong password, email already registered),
  - you need to hit /logout first to clear Authorization
- Database is using SQLite because it's relational and the simplest possible for this take-home test (might not be production ready).
- Pagination is infinite but isn't auto-scroll (manual click for next page)
  - because there's not many post data (so we can test the next page functionality easily using low post per page count)
    - the infinite scroll library doesn't work when using low page count.
  - for production, we can use `react-infinite-scroll-component` to implement auto-scroll.
    - ***If you already have many posts in the database, you can checkout the use-infinite-scroll branch to check auto-scroll feature***