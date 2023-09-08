import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./pages/Message";
import RootLayout from "./components/RootLayout";
import Switch from "@mui/material/Switch";
import { useState } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>

      <Route path="/bachal" element={<RootLayout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="message" element={<Message />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  let [dark, setDark] = useState(false);
  let handleChange = () => {
    if (dark) {
      setDark(false);
      console.log("dark");
    } else {
      setDark(true);
      console.log("light");
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className={dark && "dark"}>
        <Switch onChange={handleChange} />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
