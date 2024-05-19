import React from "react";
import Node from "./Node";
import "./Grid.css";

function Grid({ grid, gridSize, handleNodeClick, gameOver }) {
  return (
    <div
      className={`grid ${
        gameOver.win || gameOver.draw ? "disable__grid animate__grid" : ""
      }`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 100px)`,
        gridTemplateRows: `repeat(${gridSize}, 100px)`,
      }}
    >
      {grid?.map((node) => {
        return (
          <Node
            key={node.id}
            node={node}
            handleNodeClick={handleNodeClick}
          ></Node>
        );
      })}
    </div>
  );
}

export default Grid;
