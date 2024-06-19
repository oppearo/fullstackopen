const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'TestUser',
        password: 'password123',
        name: 'Test User'
      }
    })
    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'TestUser', 'password123')
      await expect(page.getByText('Test User logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'TestUser', 'wrongpassword')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Error: invalid username or password')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'TestUser', 'password123')
    })

    test('a new blog can be created', async ({ page }) => {
      const blogTitle = 'Test Title'
      const blogAuthor = 'Test Author'
      const blogUrl = 'http://example.com'
      await addBlog(page, blogTitle, blogAuthor, blogUrl)

      const messageDiv = await page.locator('.message')
      await expect(messageDiv).toContainText(`a new blog ${blogTitle} by ${blogAuthor} was added`)

      await expect(page.getByText(`${blogTitle} ${blogAuthor}`)).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click();
      await expect(page.getByText(`${blogUrl}`)).toBeVisible();
    })
  })
})