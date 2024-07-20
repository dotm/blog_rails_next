import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { mount, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { act, render, screen, waitFor } from '@testing-library/react'
import PostList from '@/components/PostList'
import { Provider } from 'react-redux';
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'
import {store} from '@/redux/store'
import { env } from '@/env.mjs';

//fix NextRouter was not mounted.
jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
      // ... whatever else you you call on `router` from useRouter
    };
  },
}));

const server = setupServer(
  http.get(env.NEXT_PUBLIC_BACKEND_URL + '/posts', () => {
    return HttpResponse.json({
      "data": [
        {
          "id": 7,
          "user_id": 2,
          "title": "Test Title 2",
          "content": "Test Content 2",
          "created_at": "2024-07-19T07:25:51.971Z",
          "updated_at": "2024-07-19T07:25:51.971Z"
        },
        {
          "id": 6,
          "user_id": 2,
          "title": "Test Title 2",
          "content": "Test Content 2",
          "created_at": "2024-07-19T07:24:49.035Z",
          "updated_at": "2024-07-19T07:24:49.035Z"
        }
      ]
    })
  }),
)
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

configure({ adapter: new Adapter() });
describe('PostList', () => {
  it('renders a heading', async () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    )
 
    const heading = screen.getByRole('heading', { level: 2 })
 
    expect(heading).toBeInTheDocument()
  })
})