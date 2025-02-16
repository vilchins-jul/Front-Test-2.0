import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import crossIcon from "./assets/iconCross.svg";
import "./login.css";

export default function Login ({active, setActive}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === email && user.password === password);
  
    if (foundUser) {
      alert("Вход выполнен успешно!");
      localStorage.setItem("currentUser", JSON.stringify(foundUser)); // Сохраняем текущего пользователя
      window.location.href = "/admin"; // Редирект
    } else {
      setError("Неправильное имя пользователя или пароль");
    }
  };

  return (
    <div className={active ? "login active" : "login"} onClick={() => setActive(false)}>
       <div className="login__content" onClick={e => e.stopPropagation()}>
        <div className="header">
          <h1>Авторизация</h1>
          <img className="image" src={crossIcon} alt="icon" onClick={() => setActive(false)}></img>
        </div>
        <div className="form">
          <div className="input-1">
            <label for="email">Email*</label>
          <input      
            type="email"
            name="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
          </div>
          <div className="input-2">
            <label for="password">Пароль*</label>
          <input 
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
            {error && <p color="ff0000" >{error}</p>}
            <button className="login-btn" onClick={handleLogin}>Войти</button>
        </div>
       </div>
     </div>
  )
}