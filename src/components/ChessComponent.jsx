import React, { useEffect } from "react";
import Chessboard from "chessboardjsx";
import { useSelector, useDispatch } from "react-redux";
import { movePiece } from "../store/chessSlice";

const colors = [
  { light: "rgba(255, 249, 196, 0.4)", dark: "rgba(255, 213, 79, 0.8)" }, // Light Yellow
  { light: "rgba(255, 205, 210, 0.4)", dark: "rgba(229, 115, 115, 0.8)" }, // Light Red
  { light: "rgba(248, 187, 208, 0.4)", dark: "rgba(240, 98, 146, 0.8)" }, // Light Pink
  { light: "rgba(225, 190, 231, 0.4)", dark: "rgba(186, 104, 200, 0.8)" }, // Light Purple
  { light: "rgba(209, 196, 233, 0.4)", dark: "rgba(149, 117, 205, 0.8)" }, // Light Deep Purple
  { light: "rgba(197, 202, 233, 0.4)", dark: "rgba(121, 134, 203, 0.8)" }, // Light Indigo
  { light: "rgba(187, 222, 251, 0.4)", dark: "rgba(100, 181, 246, 0.8)" }, // Light Blue
  { light: "rgba(179, 229, 252, 0.4)", dark: "rgba(79, 195, 247, 0.8)" }, // Light Light Blue
  { light: "rgba(178, 235, 242, 0.4)", dark: "rgba(77, 208, 225, 0.8)" }, // Light Cyan
  { light: "rgba(178, 223, 219, 0.4)", dark: "rgba(77, 182, 172, 0.8)" }, // Light Teal
  { light: "rgba(200, 230, 201, 0.4)", dark: "rgba(129, 199, 132, 0.8)" }, // Light Green
  { light: "rgba(220, 237, 200, 0.4)", dark: "rgba(174, 213, 129, 0.8)" }, // Light Light Green
  { light: "rgba(255, 236, 179, 0.4)", dark: "rgba(255, 183, 77, 0.8)" }, // Light Amber
  { light: "rgba(255, 224, 178, 0.4)", dark: "rgba(255, 138, 101, 0.8)" }, // Light Orange
  { light: "rgba(255, 204, 188, 0.4)", dark: "rgba(255, 112, 67, 0.8)" }, // Light Deep Orange
];

const ChessComponent = () => {
  const dispatch = useDispatch();
  const { fen, allowedMoves } = useSelector((state) => state.chess);
  const turn = useSelector((state) => state.chess.game._turn);
    const { white, black } = useSelector((state) => state.chess.pieceCount);
    const state = useSelector(state => state)
    console.log(state)
  const onDrop = ({ sourceSquare, targetSquare }) => {
    dispatch(movePiece({ from: sourceSquare, to: targetSquare }));
  };
  const isDraggable = (piece) => {
    if (allowedMoves.some((move) => move.from === piece.sourceSquare))
      return true;
    else return false;
  };
  const squareStyles = allowedMoves.reduce((acc, move, i) => {
    acc[move.from] = { backgroundColor: colors[i % 1].dark };
    acc[move.to] = { backgroundColor: colors[i % 1].light };
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
                  <p>{white}:{black}</p>
              <div className="predictor">
          <span>White { white + " % "}</span>
          <div className="winPredictor">
            <div
              className="whitePredictor"
              style={{ width: white + "%" }}
            ></div>
            <div
              className="blackPredictor"
              style={{ width: black + "%" }}
            ></div>
          </div>
          <span> Black { black + " % "}</span>
        </div>
      </div>
    </>
  );
};

export default ChessComponent;
