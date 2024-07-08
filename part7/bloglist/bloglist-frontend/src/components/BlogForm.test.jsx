import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('checks that callback function has correct data when creating a new blog', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleBox = screen.getByPlaceholderText('title goes here')
  const authorBox = screen.getByPlaceholderText('author goes here')
  const urlBox = screen.getByPlaceholderText('url goes here')
  const submitButton = screen.getByText('submit')

  await user.type(titleBox, 'Test title')
  await user.type(authorBox, 'Test Author')
  await user.type(urlBox, 'http://www.example.com')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://www.example.com')
})
