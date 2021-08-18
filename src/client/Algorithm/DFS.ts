const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const DFS = function (start) {
  let result: Array<string> = [];
  let visited: Array<Array<number>> = [start];
  let visitedId: Array<string> = [`x${start[0]}` + `y${start[1]}`];
  // declare the path
  let path = new PathNode(start[0], start[1], undefined);
  let searchHead = path;
  let pathHead = path;

  //recursion
  async function helper(path, x, y) {
    // await sleep(10);

    let currentId = `x${x}` + `y${y}`;

    if (result.length === 1 || x < 0 || y < 0 || x > 34 || y > 14) {
      return;
    }
    //check whether destination
    if (document.getElementById(currentId).textContent === "D") {
      path.next = new PathNode(x, y, undefined);
      path = path.next;
      result.push(`x${x}` + `y${y}`);
      genSearchPath(searchHead, pathHead);
      return;
    }
    // also stop other recursions

    //checker wether visited
    if (visitedId.includes(currentId)) {
      return;
    } else {
      visited.push([x, y]);
      visitedId.push(currentId);
      path.next = new PathNode(x, y, undefined);
      path = path.next;
      let j = 0;
      while (j < 4) {
        // await sleep(100);
        if (j === 0) {
          helper(path, x, y - 1);
        } else if (j === 1) {
          helper(path, x + 1, y);
        } else if (j === 2) {
          helper(path, x, y + 1);
        } else if (j === 3) {
          helper(path, x - 1, y);
        }
        j += 1;
      }
    }
  }
  helper(path, start[0], start[1] - 1);

  return result;
};

// New Path Node
function PathNode(x, y, next) {
  this.x = x === undefined ? 0 : x;
  this.y = y === undefined ? 0 : y;
  this.next = next === undefined ? null : next;
}

// Gen the SearchPath
async function genSearchPath(head, RoadHead) {
  while (head) {
    await sleep(10);
    //change path color
    document.getElementById(`x${head.x}` + `y${head.y}`).style.backgroundColor =
      "grey";
    head = head.next;
  }
  genRoadPath(RoadHead);
}

// Gen the SearchPath
async function genRoadPath(head) {
  while (head) {
    await sleep(10);
    //change path color
    document.getElementById(`x${head.x}` + `y${head.y}`).style.backgroundColor =
      "orange";
    head = head.next;
  }
}
export default DFS;
