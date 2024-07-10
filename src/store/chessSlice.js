import { createSlice } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

class AntiChess extends Chess {
  constructor() {
    super();
  }

  // Override the in_checkmate method to always return false
  isCheckmate() {
    return false;
  }

  // Optionally override other methods related to check and stalemate if needed
  inCheck() {
    return false;
  }

  isStalemate() {
    return false;
  }
}

const chess = new AntiChess();

const updateMoves = (game) => {
  const legalMoves = game.moves({ verbose: true });
  const capturingMoves = legalMoves.filter((move) => move.flags.includes("c"));
  return capturingMoves.length > 0 ? capturingMoves : legalMoves;
};

const chessSlice = createSlice({
  name: "chess",
  initialState: {
    game: chess,
    fen: chess.fen(),
    history: [],
    allowedMoves: chess.moves({ verbose: true }),
  },
  reducers: {
    movePiece: (state, action) => {
      console.log(chess.inCheck())
      const { from, to } = action.payload;

      const capturingMoves = state.allowedMoves;
      if (capturingMoves.length > 0) {
        const move = capturingMoves.find(
          (move) => move.from === from && move.to === to
        );
        if (move) {
          state.game.move({ from, to });
          state.history.push(move);
          state.fen = state.game.fen();
        }
      } else {
        const move = state.game.move({ from, to });
        if (move) {
          state.history.push(move);
          state.fen = state.game.fen();
        }
      }
      state.allowedMoves = updateMoves(state.game)
    },
    resetGame: (state) => {
      state.game.reset();
      state.fen = state.game.fen();
      state.history = [];
      state.allowedMoves = updateMoves(state.game)
    },
    undoMove: (state) => {
      state.game.undo();
      state.fen = state.game.fen();
      state.history.pop();
      state.allowedMoves = updateMoves(state.game)
    },
  },
});

export const { movePiece, resetGame, undoMove } = chessSlice.actions;
export default chessSlice.reducer;
