const MAX_WEIGHT = 45

const difference = (a, b) => {
  return new Set(
      [...a].filter(x => !b.has(x))
  )
}

const union = (a, b) => {
  return new Set(
      [...a, ...b]
  )
}

// A shim to make up for JavaScripts lack
// of being ruby
function compare(val1, val2) {
  if ((val1 === null || val2 === null) || (typeof val1 != typeof val2)) {
    return null;
  }
  if (typeof val1 === 'string') {
    return (val1).localeCompare(val2);
  } else {
    if (val1 > val2) {
      return 1;
    } else if (val1 < val2) {
      return -1;
    }
    return 0;
  }
}

const countEdges = (graph, node, hasLodging) => {
  const edges = node.edges(graph).filter(e => {
    return !hasLodging.has(e.toNode)
  })
  return edges.length
}

const averageEdgeWeight = (graph, node, hasLodging) => {
  const edges = node.edges(graph).filter(e => {
    return !hasLodging.has(e.toNode)
  })
  const edgeCount = edges.length
  let total = 0
  for(var i = 0; i < edges.length; i++) {
      total += edges[i].weight
  }
  return total / edgeCount
}

const makeSortFnc = (graph, hasLodging) => {
  return (a, b) => {
    const aCount = countEdges(graph, a, hasLodging)
    const bCount = countEdges(graph, b, hasLodging)    

    if(aCount == bCount) {
      const aWeight = averageEdgeWeight(graph, a, hasLodging)
      const bWeight = averageEdgeWeight(graph, b, hasLodging)   

      return compare(aWeight, bWeight)  
    } else {
      return compare(bCount, aCount)      
    }
  }
}

const activities = (graph) => {
  return graph.filterNodes(n => n.type == 'activity')
              .map(a => a.name)
}

const campsites = (graph) => {
  return graph.filterNodes(n => n.type == 'campsite')
}

const edgeNodes = (graph, node, hasLodging) => {
  return node.edges( graph ).filter(e => {
    return !hasLodging.has(e.toNode)
  }).map( e => e.toNode )
}

export default function matchLodging(graph) {
  const lodgings    = []  
  const campgrounds = campsites( graph )
  let needsLodging  = new Set( [...activities( graph )] )  
  let hasLodging    = new Set( [] ) 

  while (needsLodging.size > 0 && campgrounds.length > 0) {
    campgrounds.sort( makeSortFnc(graph, hasLodging) )
    const bestMatch = campgrounds.shift()
    const toNodes   = edgeNodes( graph, bestMatch, hasLodging )

    if ( difference( toNodes, hasLodging ).size > 0 ) {
      hasLodging = union( toNodes, hasLodging )
      lodgings.push( bestMatch )
    }

    needsLodging = difference( needsLodging, hasLodging )
  }

  return lodgings
}
