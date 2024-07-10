import "./App.css";
import ChessComponent from "./components/ChessComponent";
import { useDispatch } from "react-redux";
import { resetGame, undoMove } from "./store/chessSlice";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      {/* <h1>Anti Chess Game</h1> */}
      <div className="buttonContainer">
        <button
          onClick={() => {
            dispatch(undoMove());
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            dispatch(resetGame());
          }}
        >
          Reset Chess
        </button>
      </div>
      <ChessComponent />
    </div>
  );
}

export default App;
