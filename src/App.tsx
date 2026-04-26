import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ColorTest from '../ignores/ColorTest';
import ColorTest from './dev/ColorTest';
import ErrorPage from './routes/error-page';
import GameBoard from './routes/GameBoard';
import GameSetup from './routes/GameSetup';
import Layout from './routes/Layout';

export default function App(): JSX.Element {

  // Now that we have figured out what the game will look like, initialize the gameState
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/trivial-endeavor-3/" element={<Layout />} errorElement={<ErrorPage />} >
          <Route path='/trivial-endeavor-3/test' element={<ColorTest />} />
          <Route path="/trivial-endeavor-3/:playerNames/:devModeEntered" element={<GameBoard />} errorElement={<ErrorPage />} />
          <Route path="/trivial-endeavor-3/:playerNames/" element={<GameBoard />} errorElement={<ErrorPage />} />
          <Route path="/trivial-endeavor-3/" element={<GameSetup />} errorElement={<ErrorPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}