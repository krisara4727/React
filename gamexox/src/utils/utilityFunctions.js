import { player1State, player2State } from "../constants";

export const getNewNode = (node, player1) => {
  return {
    ...node,
    value: player1 ? player1State : player2State,
    isEmpty: false,
  };
};

function checkLeft(grid, index, size) {
  const row = Math.floor(index / size) * size;
  for (let i = index; i >= row; i--)
    if (i - 1 >= row && grid[i].value !== grid[i - 1].value) return false;
  return true;
}

function checkRight(grid, index, size) {
  const row = Math.floor(index / size) * size + size;
  for (let i = index; i < row; i++)
    if (i + 1 < row && grid[i].value !== grid[i + 1].value) return false;
  return true;
}

function checkLeftDiagonal(grid, index, size) {
  let sum = 1;
  const checkValue = grid[index].value;
  for (let i = index; i >= 0; i = i - size - 1) {
    const nextIndex = i - size - 1;
    if (nextIndex >= 0) {
      if (checkValue === grid[nextIndex].value) sum += 1;
      else return 0;
    } else if (i === index) {
      sum = 0;
    }
  }

  return sum;
}
function checkRightDiagonal(grid, index, size) {
  let sum = 1;
  const checkValue = grid[index].value;
  for (let i = index; i < size * size; i = i + size + 1) {
    const nextIndex = i + size + 1;
    if (nextIndex < size * size) {
      if (checkValue === grid[nextIndex].value) sum += 1;
      else return 0;
    } else if (i === index) sum = 0;
  }

  return sum;
}

function checkTopDiagonal(grid, index, size) {
  let sum = 1;
  const rows = size - 1;
  const checkValue = grid[index].value;
  for (let i = index; i - rows > 0; i = i - rows) {
    const nextIndex = i - rows;
    if (nextIndex >= 0) {
      if (checkValue === grid[nextIndex].value) sum += 1;
      else return 0;
    } else if (i === index) {
      sum = 0;
    }
  }

  return sum;
}
function checkDownDiagonal(grid, index, size) {
  let sum = 1;
  const rows = size - 1;
  const checkValue = grid[index].value;
  for (let i = index; i + rows < size * size; i = i + rows) {
    const nextIndex = i + rows;
    if (nextIndex < size * size) {
      if (checkValue === grid[nextIndex].value) sum += 1;
      else return 0;
    } else if (i === index) sum = 0;
  }

  return sum;
}

function checkUp(grid, index, size) {
  for (let i = index; i >= 0; i = i - size) {
    if (i - size >= 0 && grid[i].value !== grid[i - size].value) return false;
  }
  return true;
}

function checkDown(grid, index, size) {
  for (let i = index; i < size * size; i = i + size) {
    if (i + size < size * size && grid[i].value !== grid[i + size].value)
      return false;
  }
  return true;
}

export function getNoofNodesFilled(grid) {
  return grid.reduce((acc, item) => {
    if (!item.isEmpty) return (acc += 1);
    else return acc;
  }, 0);
}

export const checkForWin = (grid, index, size, noOfFilledNodes) => {
  if (noOfFilledNodes < 2 * Number(size) - 1) return false;
  if (
    checkLeft(grid, index, Number(size)) &&
    checkRight(grid, index, Number(size))
  )
    return true;
  if (
    checkLeftDiagonal(grid, index, Number(size)) +
      checkRightDiagonal(grid, index, Number(size)) ===
    Number(size)
  )
    return true;
  if (
    checkTopDiagonal(grid, index, Number(size)) +
      checkDownDiagonal(grid, index, Number(size)) ===
    Number(size)
  )
    return true;
  if (
    checkUp(grid, index, Number(size)) &&
    checkDown(grid, index, Number(size))
  )
    return true;
  return false;
};
