var _ = require('lodash')

const dummy = (blogs) => {
  
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
    
   
  

  return {
    author: mostCommon[0],
    blogs: mostCommon[1],
  }

  
}

const mostLikes = (blogs) => {
  // get all author names
  const arrayOfAuthors = blogs.map((blog) => blog.author)

  // get only unique authors from array
  const uniqueAuthors = [...new Set(arrayOfAuthors)]
  

  const likeTotals = {}

  for(const author of uniqueAuthors) {
    likeTotals[author] = 0
    blogs.forEach(blog => {
      if(blog.author === author){
        
        likeTotals[author] += blog.likes
      }
    })
  }

  

  // get the highest number of likes
  let mostLikes = 0
  let mostLikesObj = {}

  for(const author in likeTotals) {
    
    if(likeTotals[author] > mostLikes){
      mostLikes = likeTotals[author]
      mostLikesObj = {}
      mostLikesObj[author] = likeTotals[author]
      
    }
  }

  const mostLikesArray = Object.entries(mostLikesObj)



  

  return {
    author: mostLikesArray[0][0],
    likes: mostLikesArray[0][1]
  }


}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
