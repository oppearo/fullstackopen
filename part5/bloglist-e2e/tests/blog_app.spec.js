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
    await request.post('/api/users', {
      data: {
        username: 'seconduser',
        password: 'password12345',
        name: 'Second User'
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
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText(`${blogUrl}`)).toBeVisible()
    })
  })

  describe('When logged in and a blog has been added', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'TestUser', 'password123')
      await addBlog(page, 'Test Title', 'Test Author', 'http://example.com')
      await page.getByRole('button', { name: 'view' }).click()
    })

    test('a blog can be liked', async ({ page }) => {
      const initialLikes = 0
      await expect(page.getByText(`${initialLikes} like this post`)).toBeVisible()

      await page.getByRole('button', { name: 'like this post' }).click()

      const messageDiv = await page.locator('.message')
      await expect(messageDiv).toContainText(`You liked Test Title, it has now ${initialLikes + 1} likes`)
      await expect(page.getByText(`${initialLikes + 1} like this post`)).toBeVisible()
    })

    test('a blog can be deleted by the user that added the blog', async ({ page }) => {
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept()
      });
      await page.getByRole('button', { name: 'remove blog' }).click();
      const messageDiv = await page.locator('.message')
      await expect(messageDiv).toContainText('Test Title was removed')

      await expect(page.getByText('Test Title Test Author')).not.toBeVisible()
    })

    test('a blog cannot be deleted by the user that has not created the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'seconduser', 'password12345')

      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove blog' })).not.toBeVisible()
    })

    test.only('the blog with the most likes is shown first', async ({ page }) => {
      await addBlog(page, 'Second Blog', 'Second Author', 'http://example.com')

      const firstBlogDiv = await page.locator('.blog').and(page.getByText('Test Title Test Author'))
      await expect(firstBlogDiv).toContainText('Test Title')

      const secondBlogDiv = await page.locator('.blog').and(page.getByText('Second Blog Second Author'))
      await expect(secondBlogDiv).toContainText('Second Blog')
      await secondBlogDiv.getByRole('button', { name: 'view' }).click()
      await secondBlogDiv.getByRole('button', { name: 'like this post' }).click()

      await expect(page.locator('.blog').nth(0)).toContainText('Second Blog')

      await firstBlogDiv.getByRole('button', { name: 'like this post' }).click()
      await firstBlogDiv.getByRole('button', { name: 'like this post' }).click()

      await expect(page.locator('.blog').nth(0)).toContainText('Test Title')
    })
  })
})