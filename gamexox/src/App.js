import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import { generateGridText } from "./constants";
import {
  getNewNode,
  checkForWin,
  getNoofNodesFilled,
} from "./utils/utilityFunctions";
import WinningStatus from "./components/WinningStatus";

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [player1, setPlayer1] = useState(true);
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState({
    win: false,
    draw: false,
  });

  const getGridObject = (size) => {
    let gridArray = [];
    for (let i = 0; i < size * size; i++) {
      const gridObject = {
        isEmpty: true,
        value: "",
        id: i,
      };
      gridArray.push(gridObject);
    }
    setGrid(gridArray);
  };

  useEffect(() => {
    getGridObject(gridSize);
  }, []);

  const handleGridSize = (e) => {
    e.target.value <= 10 && setGridSize(e.target.value);
  };

  const handleNodeClick = (node) => {
    if (node.value) return;
    const newGrid = grid.slice();
    newGrid[node.id] = getNewNode(node, player1);
    setGrid(newGrid);
    const noOfFilledNodes = getNoofNodesFilled(newGrid);
    if (checkForWin(newGrid, node.id, gridSize, noOfFilledNodes))
      setGameOver((prevState) => (prevState = { ...prevState, win: true }));
    else {
      if (noOfFilledNodes === Number(gridSize) * Number(gridSize))
        setGameOver((prevState) => (prevState = { ...prevState, draw: true }));
      setPlayer1((prevState) => !prevState);
    }
  };

  const handleReset = () => {
    getGridObject(gridSize);
    setGameOver(
      (prevState) => (prevState = { ...prevState, draw: false, win: false })
    );
    setPlayer1((prevState) => (prevState = true));
  };

  return (
    <main className="App">
      <div className="input__search__div">
        <input
          className="game__size__input"
          min={2}
          max={10}
          type="number"
          value={gridSize}
          onChange={handleGridSize}
          placeholder="enter size of the grid(2-10)"
        ></input>
        <button
          className="submit__button button"
          onClick={() => getGridObject(gridSize)}
        >
          {generateGridText}
        </button>
      </div>
      {grid.length === gridSize * gridSize && (
        <>
          <WinningStatus player1={player1} gameOver={gameOver} />
          <Grid
            grid={grid}
            gameOver={gameOver}
            gridSize={gridSize}
            handleNodeClick={handleNodeClick}
          ></Grid>
        </>
      )}
      {(gameOver.win || gameOver.draw) && (
        <button className="button reset__button" onClick={handleReset}>
          Reset
        </button>
      )}
    </main>
  );
}

export default App;
