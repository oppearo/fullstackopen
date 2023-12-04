const lod = require('lodash')

const dummy = (array) => {
  return 1
}

const totalLikes = (array) => {
  const addLikes = (accumulator, currentValue) => {
    return accumulator + currentValue.likes
  }
  return array.length === 0
    ? 0
    : array.reduce(addLikes, 0)
}

const favoriteBlog = (array) => {
  const getFavorite = (previous, current) => {
    return (previous && previous.likes > current.likes) ? previous : current
  }

  let value = array.reduce(getFavorite, { title: 'dummy', author: 'dummy', likes: 0 })

  return { title: value.title, author: value.author, likes: value.likes }
}

const mostBlogs = (array) => {
  let authorCount = lod.map(lod.countBy(array, 'author'), (val, key) => ({ author: key, blogs: val }))
  return lod.maxBy(authorCount, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}