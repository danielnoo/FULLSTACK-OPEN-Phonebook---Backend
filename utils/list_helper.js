var _ = require('lodash')

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
    return current.likes > highest ? current.likes : highest
  }

  const mostLikes = blogs.reduce(getHighest, 0)
  console.log(mostLikes)
  let mostLikedPost = blogs.filter((post) => post.likes === mostLikes)

  return mostLikedPost[0]
}

const mostBlogs = (blogs) => {
  const arrayOfAuthors = blogs.map(blog => blog.author)
  
  // 
  // lodash function that creates an object chain function out of an array, counts by equality(author name as string), breaks into object key value pairs, finds the largest, gets first element, returns its value(author as string)
  const mostCommon = _.chain(arrayOfAuthors)
    .countBy()
    .toPairs()
    .max(_.last)
    .value()
    
   
  console.log(mostCommon)

  return {
    author: mostCommon[0],
    blogs: mostCommon[1],
  }

  // function that finds number of occurences of mostCommon


  
  // 
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
}
