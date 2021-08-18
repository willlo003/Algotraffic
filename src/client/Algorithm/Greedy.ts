const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const Greedy = function (start, destination) {
  let xMove = start[0] < destination[0] ? 1 : -1;
  let yMove = start[1] < destination[1] ? 1 : -1;

  let result: Array<string> = [];
  let visited: Array<Array<number>> = [];
  let visitedId: Array<string> = [];

  // declare the path
  let path = new PathNode(-1, -1, undefined);
  let head = path;

  let newX = start[0];
  let newY = start[1];

  console.log(xMove, yMove);
  // recursion
  function helper(x: number, y: number) {
    console.log(x, y);
    visited.push([x, y]);
    visitedId.push(`x${x}` + `y${y}`);
    path.next = new PathNode(x, y, undefined);
    path = path.next;
    document.getElementById(`x${x}` + `y${y}`).style.backgroundColor = "grey";

    if (x === destination[0] && y === destination[1]) {
      result.push(`x${x}` + `y${y}`);
      genPath(head.next);
      return;
    }
    if (x !== destination[0]) {
      newX = x + xMove;
    } else if (y !== destination[1]) {
      newY = y + yMove;
    }

    helper(newX, newY);
  }
  helper(start[0], start[1]);
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

export default Greedy;
