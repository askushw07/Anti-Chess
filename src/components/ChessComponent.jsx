import React, { useEffect } from "react";
import Chessboard from "chessboardjsx";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "../store/chessSlice";

const colors = [
    { light: "#FFCDD2", dark: "#E57373" }, // Light Red
    { light: "#F8BBD0", dark: "#F06292" }, // Light Pink
    { light: "#E1BEE7", dark: "#BA68C8" }, // Light Purple
    { light: "#D1C4E9", dark: "#9575CD" }, // Light Deep Purple
    { light: "#C5CAE9", dark: "#7986CB" }, // Light Indigo
    { light: "#BBDEFB", dark: "#64B5F6" }, // Light Blue
    { light: "#B3E5FC", dark: "#4FC3F7" }, // Light Light Blue
    { light: "#B2EBF2", dark: "#4DD0E1" }, // Light Cyan
    { light: "#B2DFDB", dark: "#4DB6AC" }, // Light Teal
    { light: "#C8E6C9", dark: "#81C784" }, // Light Green
    { light: "#DCEDC8", dark: "#AED581" }, // Light Light Green
    { light: "#FFF9C4", dark: "#FFD54F" }, // Light Yellow
    { light: "#FFECB3", dark: "#FFB74D" }, // Light Amber
    { light: "#FFE0B2", dark: "#FF8A65" }, // Light Orange
    { light: "#FFCCBC", dark: "#FF7043" }  // Light Deep Orange
  ];

const ChessComponent = () => {
  const dispatch = useDispatch();
  const { fen, allowedMoves } = useSelector((state) => state.chess);
  const turn = useSelector((state) => state.chess.game._turn);
  const onDrop = ({ sourceSquare, targetSquare }) => {
    dispatch(movePiece({ from: sourceSquare, to: targetSquare }));
  };
  const isDraggable = (piece) => {
    if (allowedMoves.some((move) => move.from === piece.sourceSquare))
      return true;
    else return false;
  };
    const squareStyles = allowedMoves.reduce((acc, move,i) => {
        acc[move.from] = { backgroundColor: colors[i%15].dark };
        acc[move.to] = { backgroundColor: colors[i%15].light };
    return acc;
  }, {});
  return (
    <>
      <Chessboard
        position={fen}
        onDrop={onDrop}
        allowDrag={isDraggable}
        squareStyles={squareStyles}
      />
          <div>
              <h3>Current Turn</h3>
          <div
        style={{
          width: "5rem",
          height: "5rem",
          backgroundColor: turn == "w" ? "white" : "black",
          border: "1px solid gray",
        }}
      ></div>
      </div>
    </>
  );
};

export default ChessComponent;
