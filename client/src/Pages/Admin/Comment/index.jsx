import React, { useEffect } from 'react'

const Comment = () => {
  const result = {
    'Leaving': 100,
    'Tired': 300,
    'Turn around': 90,
    'Using Phone': 80,
    'Working': 4000
  }
  const percent = (result) => {
    const arrResult = Object.values(result)
    const total = arrResult.reduce((total, item) => {
      return total + item
    }, 0)
    let newResult = {
      'Leaving': 0,
      'Tired': 0,
      'Turn around': 0,
      'Using Phone': 0,
      'Working': 0
    }
    for (var key in result) {
      newResult[key]=(result[key] / total) *100
    }
    return newResult
  }
  console.log( percent(result))
  return (
    <div>Comment</div>
  )
}

export default Comment