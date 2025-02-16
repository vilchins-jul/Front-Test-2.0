import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, Box, List, ListItem } from "@mui/material";
import crossIcon from "./assets/iconCross.svg";
import "./registration.css";

export default function RegisterPage({active, setActive}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false); // Состояние для проверки существующего пользователя
  const navigate = useNavigate(); // Навигация

  const validate = (name, value) => {
    let error = "";
    if (name === "firstName" || name === "lastName") {
      if (!/^[a-zA-Zа-яА-ЯёЁ]{2,30}$/.test(value)) {
        error = "Допустимы только буквы, длина 2-30 символов";
      }
    }
    if (name === "email") {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        error = "Введите корректный email";
      }
    }
    if (name === "password") {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        error = "Пароль должен быть минимум 8 символов, содержать заглавную, строчную букву, цифру и спецсимвол";
      }
    }
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        error = "Пароли не совпадают";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    validate(e.target.name, e.target.value);
  };

  const isValid =
    Object.values(errors).every((err) => err === "") &&
    Object.values(formData).every((val) => val !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      try {
        // Получаем текущую дату и время регистрации
        const now = new Date();
        const registeredAt = now.toISOString().slice(0, 19).replace("T", " "); // YYYY-MM-DD HH:mm:ss

        // Проверяем, есть ли уже пользователи в localStorage
        const existingUsers = localStorage.getItem("users");
        let users = existingUsers ? JSON.parse(existingUsers) : [];

        // Проверка, существует ли пользователь с таким email
        const userAlreadyExists = users.some((user) => user.email === formData.email);

        if (userAlreadyExists) {
          setUserExists(true); // Показываем сообщение "Вы уже зарегистрированы"
          return;
        }

        // Добавляем нового пользователя
        const newUser = { ...formData, registeredAt };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        console.log("Сохранённые пользователи:", localStorage.getItem("users"));

        setSubmitted(true);
        navigate("/admin"); // Перенаправление на страницу администратора
      } catch (error) {
        console.error("Ошибка при сохранении в localStorage:", error);
      }
    }
  };
  

  return (
    <div className={active ? "registr active" : "registr"} onClick={() => setActive(false)}>
      <div className="registr__content" onClick={e => e.stopPropagation()}>
        <div className="header">
                  <h1>Регистрация</h1>
                  <img className="image" src={crossIcon} alt="icon" onClick={() => setActive(false)}></img>
                </div>
                {userExists ? (
            <>
              <p color="error" align="center">
                Вы уже зарегистрированы!
              </p>
            </>
          ) : submitted ? (
            <p color="success.main" align="center">
              Информация отправлена!
            </p>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              {Object.keys(formData).map((field) => (
                <TextField
                  key={field}
                  label={
                    field === "firstName"
                      ? "Имя"
                      : field === "lastName"
                      ? "Фамилия"
                      : field === "email"
                      ? "Email"
                      : field === "password"
                      ? "Пароль"
                      : "Подтверждение пароля"
                  }
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors[field])}
                  helperText={errors[field]}
                  fullWidth
                  margin="normal"
                />
              ))}
              <button className="registr-btn" type="submit" >Отправить</button>
              
              {/* <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isValid}>
                Отправить
              </Button> */}
            </form>
          )}
      </div>
    </div>
  );
}