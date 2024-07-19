import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { mount, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { act, render, screen, waitFor } from '@testing-library/react'
import PostAdd from '@/components/PostAdd'
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
  http.post(env.NEXT_PUBLIC_BACKEND_URL + '/posts', () => {
    return HttpResponse.json({
      "data": {
        "id": 7,
        "user_id": 2,
        "title": "Test Title 2",
        "content": "Test Content 2",
        "created_at": "2024-07-19T07:25:51.971Z",
        "updated_at": "2024-07-19T07:25:51.971Z"
      }
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
describe('PostAdd', () => {
  it('renders a heading', async () => {
    render(
      <Provider store={store}>
        <PostAdd />
      </Provider>
    )
 
    const heading = screen.getByRole('heading', { level: 2 })
 
    expect(heading).toBeInTheDocument()
  })

  it('successfully create post', async () => {
    let alertMessage = ''
    window.alert = (s) => {alertMessage = s};  // provide an empty implementation for window.alert
    render(
      <Provider store={store}>
        <PostAdd />
      </Provider>
    )

    await act(async () => {
      // Fill in the form inputs
      await userEvent.type(screen.getByLabelText(/title/i), 'Test Title')
      await userEvent.type(screen.getByLabelText(/content/i), 'Test Content')

      // Click the submit button
      await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    })

    // Wait for the form to clear and the alert to be called
    await waitFor(() => expect(alertMessage).toBe('Success creating post'))
    expect(screen.getByLabelText(/title/i)).toHaveValue('')
    expect(screen.getByLabelText(/content/i)).toHaveValue('')
  })
})