import "./App.css";
import AppRouter from "./routes";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
