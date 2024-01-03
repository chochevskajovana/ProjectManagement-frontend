import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter} from "react-router-dom";
import AllRoutes from "./AllRoutes";

function App() {
  return (
    <BrowserRouter>
        <AllRoutes/>
    </BrowserRouter>
  );
}

export default App;
