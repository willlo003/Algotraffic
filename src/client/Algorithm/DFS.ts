const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const DFS = function (start) {
  let result: Array<string> = [];
  let visited: Array<Array<number>> = [start];
  let visitedId: Array<string> = [`x${start[0]}` + `y${start[1]}`];
  document.getElementById(visitedId[0]).style.backgroundColor = "grey";
  // declare the path
  let path = new PathNode(start[0], start[1], undefined);
  let head = path;

  //recursion
  async function helper(path, x, y) {
    // await sleep(10);

    let currentId = `x${x}` + `y${y}`;

    if (result.length === 1 || x < 0 || y < 0 || x > 34 || y > 14) {
      return;
    }
    //check whether destination
    if (document.getElementById(currentId).textContent === "D") {
      document.getElementById(currentId).style.background = "grey";
      path.next = new PathNode(x, y, undefined);
      path = path.next;
      result.push(`x${x}` + `y${y}`);
      genPath(head);
      return;
    }
    // also stop other recursions

    //checker wether visited
    if (visitedId.includes(currentId)) {
      return;
    } else {
      visited.push([x, y]);
      visitedId.push(currentId);
      document.getElementById(currentId).style.background = "grey";
      path.next = new PathNode(x, y, undefined);
      path = path.next;
      helper(path, x, y - 1);
      helper(path, x + 1, y);
      helper(path, x, y + 1);
      helper(path, x - 1, y);
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

// Gen the Path
async function genPath(head) {
  while (head) {
    await sleep(10);
    //change path color
    document.getElementById(`x${head.x}` + `y${head.y}`).style.backgroundColor =
      "orange";
    head = head.next;
  }
}
export default DFS;
