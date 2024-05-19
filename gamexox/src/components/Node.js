import React from "react";
import "./Node.css";

function Node({ node, handleNodeClick }) {
  return (
    <div
      className="node"
      onClick={() => handleNodeClick(node)}
      style={{ disabled: `${!node.isEmpty}` }}
    >
      {node.value}
    </div>
  );
}

export default Node;
