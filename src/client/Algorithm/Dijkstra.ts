const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const Dijkstra = async function (start, destination, currentBlockedNodeId) {
  if (start[0] === undefined || destination[0] === undefined) {
    alert("Please set start point and destination");
    return;
  }
  let result = [];
  let visited = [start];
  let visitedId = [`x${start[0]}` + `y${start[1]}`];
  document.getElementById(visitedId[0]).style.backgroundColor = "grey";
  // let end = `x${destination[0]}` + `y${destination[1]}`;
  let up, down, right, left, upId, downId, rightId, leftId;
  let i = 0;
  while (true) {
    await sleep(10);
    //////// Find the Destination
    //check up-side node

    if (visited[i][1] > 0) {
      up = [visited[i][0], visited[i][1] - 1];
      upId = `x${up[0]}` + `y${up[1]}`;

      if (!visitedId.includes(upId)) {
        visited.push(up);
        visitedId.push(upId);
        document.getElementById(upId).style.backgroundColor = "grey";
        if (document.getElementById(upId).textContent === "D") {
          result = up;
          break;
        }
      }
    }

    //check right-side node
    if (visited[i][0] < 34) {
      right = [visited[i][0] + 1, visited[i][1]];
      rightId = `x${right[0]}` + `y${right[1]}`;

      if (!visitedId.includes(rightId)) {
        visited.push(right);
        visitedId.push(rightId);
        document.getElementById(rightId).style.backgroundColor = "grey";
        if (document.getElementById(rightId).textContent === "D") {
          result = right;
          break;
        }
      }
    }

    //check down-side node
    if (visited[i][1] < 14) {
      down = [visited[i][0], visited[i][1] + 1];
      downId = `x${down[0]}` + `y${down[1]}`;

      if (!visitedId.includes(downId)) {
        visited.push(down);
        visitedId.push(downId);
        document.getElementById(downId).style.backgroundColor = "grey";
        if (document.getElementById(downId).textContent === "D") {
          result = down;
          break;
        }
      }
    }

    //check left-side node
    if (visited[i][0] > 0) {
      left = [visited[i][0] - 1, visited[i][1]];
      leftId = `x${left[0]}` + `y${left[1]}`;

      if (!visitedId.includes(leftId)) {
        visited.push(left);
        visitedId.push(leftId);
        document.getElementById(leftId).style.backgroundColor = "grey";
        if (document.getElementById(leftId).textContent === "D") {
          result = left;
          break;
        }
      }
    }
    i++;
  }
  path(start, result);
  return result;
};

function PathNode(x, y, next) {
  this.x = x === undefined ? 0 : x;
  this.y = y === undefined ? 0 : y;
  this.next = next === undefined ? null : next;
}

const path = async function (startPoint, endPoint) {
  // declare the direction
  let xMove: number;
  let yMove: number;

  // check the direction
  if (startPoint[0] === endPoint[0]) {
    xMove = 0;
  } else {
    xMove = startPoint[0] < endPoint[0] ? +1 : -1;
  }
  if (startPoint[1] === endPoint[1]) {
    yMove = 0;
  } else {
    yMove = startPoint[1] < endPoint[1] ? +1 : -1;
  }

  // declare the path
  let path = new PathNode(startPoint[0], startPoint[1], undefined);
  // next x, y node
  let nextX: number = startPoint[0],
    nextY: number = startPoint[1];

  // change start point color
  document.getElementById(
    `x${startPoint[0]}` + `y${startPoint[1]}`
  ).style.backgroundColor = "orange";

  //iterate to gen the pasth
  while (path.x !== endPoint[0] || path.y !== endPoint[1]) {
    await sleep(10);
    if (path.x !== endPoint[0]) {
      nextX = path.x + xMove;
    } else if (path.y !== endPoint[1]) {
      nextY = path.y + yMove;
    }

    //change visited node color
    let currentNodeId = `x${nextX}` + `y${nextY}`;
    document.getElementById(currentNodeId).style.backgroundColor = "orange";
    path.next = new PathNode(nextX, nextY, undefined);
    path = path.next;
    if (path.x === endPoint[0] && path.y === endPoint[1]) {
      break;
    }
  }
};
export default Dijkstra;
