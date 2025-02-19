This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run in Local

- npm install
- npm run dev

## Run unit test

- npm install
- npm run test

## Test in Local Manually

- Go to home page (Post List page): http://localhost:3000/
  - Make sure posts are displayed correctly
- Go to User Setting page
  - http://localhost:3000/settings
  - Sign up or sign in
- Go to Add New Post page
  - http://localhost:3000/newPost
  - Try adding a new page
  - Check that it's displayed in the home page (Post List page)

## Frontend Setup

- npx create-next-app@latest app-fe-nextjs-module
  - use TypeScript, ESLint, Tailwind CSS, src dir, Pages Router (not App Router)
  - don't use import alias
- Unit test: (https://nextjs.org/docs/pages/building-your-application/testing/jest)
  - npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-node ts-jest enzyme @cfaester/enzyme-adapter-react-18 msw@latest msw/node undici
  - npm init jest@latest

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
