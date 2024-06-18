import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders blog title', () => {
  const blog = {
    title: 'Title for unit test',
    author: 'react-testing-library',
    user: {
      name: 'Test Name',
      username: 'test'
    }
  }
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Title for unit test')
})

test('renders url, likes and user, when view has been pressed', async () => {
  const blog = {
    title: 'Title for unit test',
    author: 'react-testing-library',
    likes: 4,
    url: 'http://example.com',
    user: {
      name: 'Test Name',
      username: 'test'
    }
  }

  render(<Blog blog={blog} />)
  const urlElement = screen.getByText('http://example.com', { exact: false })
  const likesElement = screen.getByText('4', { exact: false })
  const userElement = screen.getByText('Test Name', { exact: false })

  // should not be visible at this point
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()
  expect(userElement).not.toBeVisible()

  const user = userEvent.setup()
  const buttonBefore = screen.getByText('view')
  expect(buttonBefore).toHaveTextContent('view')

  await user.click(buttonBefore)

  const buttonAfter = screen.getByText('hide')
  expect(buttonAfter).toHaveTextContent('hide')

  // check that elements are now visible
  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()
  expect(userElement).toBeVisible()
})

test('checks that like button event handler is called twice when like button is pressed twice', async () => {
  const blog = {
    title: 'Title for unit test',
    author: 'react-testing-library',
    likes: 4,
    url: 'http://example.com',
    user: {
      name: 'Test Name',
      username: 'test'
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  expect(viewButton).toHaveTextContent('view')

  await user.click(viewButton)

  const likeButton = screen.getByText('like this post')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})