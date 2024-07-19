## Setup

- Go to blog-api README.md to setup the backend first.
- Go to blog-frontend README.md to setup the frontend.
- You can then use the UI at localhost:3000 to manually test the app.
  - Backend is at 3001.
- API Docs:
  - Postman: ./rails-blog-api.postman_collection.json
  - Swagger: ./swagger-docs.yaml
  - Swagger UI:
    - go to: https://metamug.com/util/postman-to-swagger/
    - paste the postman json file: rails-blog-api.postman_collection.json
    - click Swagger UI tab

Notes:
- If you have Sign In or Sign Up successfully and want to test error paths (wrong password, email already registered),
  - you need to hit /logout first to clear Authorization
- Database is using SQLite because it's relational and the simplest possible for this take-home test (might not be production ready).
- Pagination is infinite but isn't auto-scroll (manual click for next page)
  - because there's not many post data (so we can test the next page functionality easily using low post per page count)
  - for production, we can use `react-infinite-scroll-component` to implement auto-scroll.