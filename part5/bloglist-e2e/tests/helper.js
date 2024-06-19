const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, blogTitle, blogAuthor, blogUrl) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByPlaceholder('title goes here').click();
    await page.getByPlaceholder('title goes here').fill(blogTitle);
    await page.getByPlaceholder('author goes here').click();
    await page.getByPlaceholder('author goes here').fill(blogAuthor);
    await page.getByPlaceholder('url goes here').click();
    await page.getByPlaceholder('url goes here').fill(blogUrl);
    await page.getByRole('button', { name: 'submit' }).click();
}

export { loginWith, addBlog }