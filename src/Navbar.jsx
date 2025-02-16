import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button, Typography, Box } from "@mui/material";

function Navbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setUserLoggedIn(!!currentUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUserLoggedIn(false);
    navigate("/"); // Перенаправляем на главную после выхода
  };

  return (
    <div className="navbar">
      {/* <div className="toggleButton">
        <Typography style={{ color: "#fff", fontSize: "1.5em" }}>АИС</Typography>
        {userLoggedIn ? (
            <Button
              className="button-logged"
              onClick={handleLogout}
              // style={{ textDecoration: "none", color: "white", textTransform: "none" }}
              style={{ margin: "0", padding: "10px 30px", backgroundColor: "#000", textDecoration: "none", color: "white", textTransform: "none" }}
            >
              Выйти
            </Button>
          ) : (
            <Button className="button-logged" style={{ margin: "0", padding: "10px 30px", backgroundColor: "#000" }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white", textTransform: "none" }}
              >
                Войти
              </Link>
            </Button>
          )}
      </div> */}
      <div className="links">
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Typography style={{ color: "#fff" }}>Автоматизированная информационная система</Typography>
          {userLoggedIn ? (
            <Button
              className="button-logged"
              onClick={handleLogout}
              // style={{ textDecoration: "none", color: "white", textTransform: "none" }}
              style={{ margin: "0", padding: "10px 30px", backgroundColor: "#000", textDecoration: "none", color: "white", textTransform: "none" }}
            >
              Выйти
            </Button>
          ) : (
            <Button className="button-logged" style={{ margin: "0", padding: "10px 30px", backgroundColor: "#000" }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white", textTransform: "none" }}
              >
                Войти
              </Link>
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Navbar;
