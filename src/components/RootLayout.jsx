import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import profile from "../assets/profile.png";
import {
  AiFillHome,
  AiFillMessage,
  AiFillNotification,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RootLayout = (props) => {
  const location = useLocation();

  let userData = useSelector((state) => state.loggedUser.loginUser);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="navbar">
            <div className="navcontainer">
              <img src={profile} />
              <h4 className="username">{userData.displayName}</h4>
              <ul>
                <li>
                  <Link
                    to="/bachal/home"
                    className={
                      location.pathname == "/bachal/home" ? "active" : "icon"
                    }
                  >
                    <AiFillHome />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bachal/message"
                    className={
                      location.pathname == "/bachal/message" ? "active" : "icon"
                    }
                  >
                    <AiFillMessage />
                  </Link>
                </li>
                <li>
                  <AiFillNotification className="icon" />
                </li>
                <li>
                  <AiFillSetting className="icon" />
                </li>
                <li>
                  <AiOutlineLogout className="icon" />
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>

      {/* <h1>Navbar</h1>
        <Outlet/> */}
    </>
  );
};

export default RootLayout;
