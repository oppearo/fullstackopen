const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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
})