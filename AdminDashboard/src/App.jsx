import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </RecoilRoot>
  );
}

export default App;
