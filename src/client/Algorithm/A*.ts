const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
// global varible will be used in generating optimal path and searched path
let memory = {};
let memoryF = [];
let memoryId = [];

let startX;
let startY;

let destinationX;
let destinationY;

let potentialNodes = {};
let check = {};

let potentialId = [];

const A = function (start, destination, currentBlockedNodeId) {
  if (start[0] === undefined || destination[0] === undefined) {
    alert("Please set start point and destination");
    return;
  }

  startX = start[0];
  startY = start[1];
  destinationX = destination[0];
  destinationY = destination[1];

  // declare the path
  // for optimal path
  let roadPath = new PathNode(destinationX, destinationY, undefined);
  let roadTail = roadPath;

  // for search
  let searchPath = new twoWayPathNode(-1, -1, undefined, undefined);
  let searchHead = searchPath;

  // to store visited
  let visitedId: Array<string> = [];

  function helper(newSearchPath, newRoadPath, x, y) {
    // arrive destination
    if (x === destination[0] && y === destination[1]) {
      //   console.log(potentialNodes);
      genSearchPath(searchHead.next, roadTail);
      return;
    }

    // find all arounded nodes
    let aroundNodes = [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ];

    // visit
    visitedId.push(`x${x}` + `y${y}`);

    // check all arounded Nodes cost
    let aroundNodesCost: object = {};
    for (let i = 0; i < aroundNodes.length; i++) {
      //if outside boundary, and visited ignore
      if (
        aroundNodes[i][0] > 34 ||
        aroundNodes[i][0] < 0 ||
        aroundNodes[i][1] > 14 ||
        aroundNodes[i][1] < 0 ||
        currentBlockedNodeId.includes(
          `x${aroundNodes[i][0]}` + `y${aroundNodes[i][1]}`
        )
      ) {
        continue;
      } else {
        let currentId: string =
          `x${aroundNodes[i][0]}` + `y${aroundNodes[i][1]}`;
        let fromStart: Array<number> = [
          Math.abs(aroundNodes[i][0] - start[0]),
          Math.abs(aroundNodes[i][1] - start[1]),
        ];
        let toEnd: Array<number> = [
          Math.abs(aroundNodes[i][0] - destination[0]),
          Math.abs(aroundNodes[i][1] - destination[1]),
        ];
        let currentQCost: number;
        let currentHCost: number;
        //culcalate Q cost
        if (fromStart[0] === fromStart[1]) {
          currentQCost = fromStart[0] * 1.4;
        } else {
          currentQCost =
            Math.min(fromStart[0], fromStart[1]) * 1.4 +
            (Math.max(fromStart[0], fromStart[1]) -
              Math.min(fromStart[0], fromStart[1]));
        }
        //culcalate H cost
        if (toEnd[0] === toEnd[1]) {
          currentHCost = toEnd[0] * 1.4;
        } else {
          currentHCost =
            Math.min(toEnd[0], toEnd[1]) * 1.4 +
            (Math.max(toEnd[0], toEnd[1]) - Math.min(toEnd[0], toEnd[1]));
        }
        currentQCost = Math.round(currentQCost * 10) / 10;
        currentHCost = Math.round(currentHCost * 10) / 10;
        // store arounded nodes costs
        aroundNodesCost[currentId] = {
          qCost: currentQCost,
          hCost: currentHCost,
          F: Math.round((currentQCost + currentHCost) * 10) / 10,
          x: aroundNodes[i][0],
          y: aroundNodes[i][1],
        };
        // store node which is searched
        newSearchPath.next = new PathNode(
          aroundNodes[i][0],
          aroundNodes[i][1],
          undefined
        );
        newSearchPath = newSearchPath.next;
      }
    }

    // store to memory
    for (const node in aroundNodesCost) {
      if (!visitedId.includes(node)) {
        if (!memory.hasOwnProperty(node)) {
          memory[node] = aroundNodesCost[node];
          memoryF.push(aroundNodesCost[node].F);
          memoryId.push(node);
        } else {
          //update if duplicate, check F value
          if (memory[node].F > aroundNodesCost[node].F) {
            memory[node] = aroundNodesCost[node];
            let ind = memoryId.indexOf(node);
            memoryF[ind] = aroundNodesCost[node].F;
          }
        }
      }
    }
    // find minimum F, to get the next node
    let minF = Math.min(...memoryF);
    let minInd = memoryF.indexOf(minF);
    let minNodeId = memoryId[minInd];
    for (const node in memory) {
      // compare F value, if same, compare h cost
      if (
        memory[node].F === minF &&
        memory[node].hCost < memory[minNodeId].hCost
      ) {
        minNodeId = node;
      }
    }

    // the next node
    let nextNode = [memory[minNodeId].x, memory[minNodeId].y];

    // remove nextNode data to prevent it become an infinitive loop
    // also store the node as potentialNodes for gen optimal path later
    potentialNodes[`x${nextNode[0]}` + `y${nextNode[1]}`] =
      memory[`x${nextNode[0]}` + `y${nextNode[1]}`];
    delete memory[`x${nextNode[0]}` + `y${nextNode[1]}`];
    let deleteId = memoryId.indexOf(`x${nextNode[0]}` + `y${nextNode[1]}`);
    potentialId.push(memoryId[deleteId]);
    memoryF.splice(deleteId, 1);
    memoryId.splice(deleteId, 1);

    helper(newSearchPath, newRoadPath, nextNode[0], nextNode[1]);
  }
  //recursion
  helper(searchPath, roadPath, start[0], start[1]);
};

// New Path Node
function PathNode(x, y, next) {
  this.x = x === undefined ? 0 : x;
  this.y = y === undefined ? 0 : y;
  this.next = next === undefined ? null : next;
}

// Doubly Linked Path Node
function twoWayPathNode(x, y, next, prev) {
  this.x = x === undefined ? 0 : x;
  this.y = y === undefined ? 0 : y;
  this.next = next === undefined ? null : next;
  this.prev = prev === undefined ? null : prev;
}

// Gen the SearchPath
async function genSearchPath(head, roadTail) {
  while (head) {
    await sleep(10);
    //change searched nodes color
    document.getElementById(`x${head.x}` + `y${head.y}`).style.backgroundColor =
      "grey";
    head = head.next;
  }
  // search optimal path from tail
  delete potentialNodes[`x${destinationX}` + `y${destinationY}`];
  searchOptimalPath(roadTail, destinationX, destinationY, roadTail);
}

// Gen the SearchPath
function searchOptimalPath(path, x, y, tail) {
  let aroundIds: Array<Array<number>> = [
    [x, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
  ];
  let minF: number,
    nextX: number,
    nextY: number,
    stop: boolean = false;

  for (let i = 0; i < aroundIds.length; i++) {
    // if arrive to start point, break this loop
    if (aroundIds[i][0] === startX && aroundIds[i][1] === startY) {
      nextX = aroundIds[i][0];
      nextY = aroundIds[i][1];
      stop = true;
      break;
    }

    // if this node is not the potential best path, ignore it
    let currentId = `x${aroundIds[i][0]}` + `y${aroundIds[i][1]}`;
    if (!potentialId.includes(currentId)) {
      continue;
    }

    // find the min F around the current point
    if (minF === undefined || potentialNodes[currentId].F < minF) {
      minF = potentialNodes[currentId].F;
      nextX = potentialNodes[currentId].x;
      nextY = potentialNodes[currentId].y;
    }
  }
  //gen the doubly-linked path
  path.next = new twoWayPathNode(nextX, nextY, undefined, path);
  path = path.next;

  //   console.log(
  //     "current node",
  //     x,
  //     y,
  //     "next node",
  //     nextX,
  //     nextY,
  //     potentialNodes,
  //     check
  //   );
  // delete used node
  check[`x${x}` + `y${y}`] = potentialNodes[`x${x}` + `y${y}`];
  delete potentialNodes[`x${x}` + `y${y}`];
  let deleteId = potentialId.indexOf(`x${x}` + `y${y}`);

  //   delete potentialNodes[`x${nextX}` + `y${nextY}`];
  //   let deleteId = potentialId.indexOf(`x${nextX}` + `y${nextY}`);
  //   potentialF.splice(deleteId, 1);
  potentialId.splice(deleteId, 1);

  //when reach to the start point, stop and change the path color
  if (stop) {
    genOptimalPath(path);
    return;
  }

  //recursion
  searchOptimalPath(path, nextX, nextY, tail);
}

//change path color
async function genOptimalPath(path) {
  while (path) {
    await sleep(10);
    document.getElementById(`x${path.x}` + `y${path.y}`).style.backgroundColor =
      "orange";
    path = path.prev;
  }

  // clear the data for next running
  memory = {};
  memoryF = [];
  memoryId = [];

  potentialNodes = {};
  potentialId = [];
}
export default A;
