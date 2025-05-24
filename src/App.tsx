import "./styles/index.sass";
import Welcome from "./scenes/Welcome";
import Game from "./scenes/Game/Game";
import ResultScreen from "././scenes/ResultScreen";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Login from "./scenes/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/game" element={<Welcome />} />
      <Route path="/game/:difficulty" element={<Game />} />
      <Route path="/results/:difficulty/" element={<ResultScreen />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
