const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const totaler = (sum, current) => {
    return sum + current.likes
  }
  console.log(blogs.reduce(totaler, 0))
  return blogs.reduce(totaler, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
