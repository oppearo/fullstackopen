import { render, screen } from '@testing-library/react'
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

  render(<Blog blog={blog} />)

  const element = screen.getByText('Title for unit test', { exact: false })
  expect(element).toBeDefined()
})