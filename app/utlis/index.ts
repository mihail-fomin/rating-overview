export const getHighestRank = (rankings: number[]) => {
  return rankings.reduce((acc, el) => (acc < el ? el : acc), 0)
}
