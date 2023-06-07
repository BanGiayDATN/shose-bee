// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import List from "./pages/list/List";
// import Single from "./pages/detailUser/Single";
// import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { publicRouters } from "./router";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        {publicRouters.map((route, index) =>{
					const Page = route.element
					return <Route exact key={index} path ={route.path} element= {<Page/>}></Route>
				})
			}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
