export const getTopStories = async (category) => {
  const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=JDI5mCZmifZkzMaKy8DAqC4CmPSK612m`)
  if (response.ok) {
    return await response.json()
  } else {
    return response.error
  }
}