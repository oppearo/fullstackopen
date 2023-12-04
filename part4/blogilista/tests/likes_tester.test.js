const listHelper = require('../utils/list_helper')
const dummyList = require('./unitTestBlogList')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of an empty list equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(dummyList)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('of an empty list returns an empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({ title: 'dummy', author: 'dummy', likes: 0 })
  })

  test('when list has only one blog equals that blog', () => {
    const expectedResult = {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('of a bigger list is found correctly', () => {
    const expectedResult = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.favoriteBlog(dummyList)
    expect(result).toEqual(expectedResult)
  })
})