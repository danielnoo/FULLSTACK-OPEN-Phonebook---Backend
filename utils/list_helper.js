const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const totaler = (sum, current) => {
    return sum + current.likes
  }
  console.log(blogs.reduce(totaler, 0))
  return blogs.reduce(totaler, 0)
}



const favouriteBlog = (blogs) => {
  const getHighest = (highest, current) => {
    return current > highest ? current : highest
  }
  const mostLikes = blogs.reduce(getHighest, 0)
  console.log(mostLikes)
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
