// JS permutations implimentation via
// https://stackoverflow.com/a/20871714

// Input: [1,2,3]

// Output:
// [ [ 1, 2, 3 ],
//   [ 1, 3, 2 ],
//   [ 2, 1, 3 ],
//   [ 2, 3, 1 ],
//   [ 3, 1, 2 ],
//   [ 3, 2, 1 ] ]

const permutations = (inputArr) => {
  let result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}

export default function TSP(graph, start) {
  let matrix = graph.toMatrix()
  let nodesToTraverse = Object.keys(graph.nodes)
                          .filter(n => n != graph.nodes.indexOf(start))
  let minPath = Number.MAX_SAFE_INTEGER
  let nextPermutations = permutations(nodesToTraverse)
  let trips = []
  for (var i = 0; i < nextPermutations.length; i++) {
    let v = nextPermutations[i]
    let currentPathWeight = 0
    let path = []
    let k = graph.nodes.indexOf(start)
    for (var j = 0; j < v.length; j++) {
      let edge = v[j]
      currentPathWeight += matrix[k][edge]
      path.push(graph.nodes[k])
      k = edge
    }
    currentPathWeight += matrix[k][graph.nodes.indexOf(start)]
    path.push(graph.nodes[k])
    path.push(start)
    minPath = Math.min(minPath, currentPathWeight)
    trips.push({ cost: minPath, path })
  }
  return trips.find(({cost}) => cost === minPath).path
}
