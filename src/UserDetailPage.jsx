import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Card, CardContent, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import crossIcon from "./assets/iconCross.svg";
import "./users.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Администратор',
  'Пользователь МНС',
  'Область',
  'Сотрудник безопасности',
  'Оператор',
  'Инспектор',
];

export default function UserDetailPage() {
  const [personName, setPersonName] = React.useState([]);

  const handleChangeBox = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const { userEmail } = useParams(); // Получаем email из URL
  const navigate = useNavigate();
  
  // Состояния
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false); // Для сообщения о сохранении

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((user) => user.email === userEmail);
  
    // Логирование для отладки
    console.log("Найденный пользователь:", foundUser);
  
    setUser(foundUser);
    setEditedUser(foundUser); // Инициализация данных для редактирования
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleStatusChange = (e) => {
    setEditedUser({ ...editedUser, status: e.target.value });
  };

  const handleSave = () => {
    // Сохраняем изменения в localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.email === editedUser.email ? editedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setDialogMessage("Информация сохранена!");
    setIsSaved(true);
    setOpenDialog(false);
  };

  const openConfirmationDialog = () => {
    setDialogMessage("Вы уверены, что хотите сохранить изменения?");
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm) => {
    if (confirm) {
      handleSave(); // Сохранение
    } else {
      setOpenDialog(false); // Закрыть без изменений
    }
  };

  if (!user) {
    return <Typography variant="h6" color="error" align="center">Пользователь не найден</Typography>;
  }


  return (
    <div className="users">
      <div className="header">
        <h1>Карточка пользователя</h1>
        <img className="image" src={crossIcon} alt="icon" onClick={() => navigate("/admin")}></img>
      </div>
      <div className="all">

        <div className="user-name">
        <TextField
                label="Имя"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.firstName || ""}
                name="firstName"
                onChange={handleChange}
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
        <TextField
                label="Фамилия"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.lastName || ""}
                name="lastName"
                onChange={handleChange}
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
        <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.email || ""}
                disabled
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
        </div>


        <div className="date-status">
        <TextField
                label="Дата регистрации"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedUser.registeredAt || ""}
                disabled
                sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
              />
        <FormControl fullWidth margin="normal" sx={{ marginBottom: 0.5 }}>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={editedUser.status || ""}
                  onChange={handleStatusChange}
                  name="status"
                  label="Статус"
                >
                  <MenuItem value="активный">Активный</MenuItem>
                  <MenuItem value="заблокирован">Заблокирован</MenuItem>
                </Select>
        </FormControl>
        </div>


        <div className="blocked">
        {editedUser.status === "заблокирован" && (
              <>
                  <TextField
                    label="Дата и время блокировки"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.blockedAt || ""}
                    disabled
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                  <TextField
                    label="Причина блокировки"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.blockReason || ""}
                    name="blockReason"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
              </>
            )}
        </div>


        <div className="user-details">
        <FormControl fullWidth margin="normal" sx={{ marginBottom: 0.5 }}>
        <InputLabel>Роль</InputLabel>
        <Select
          labelId="label"
          id="checkbox"
          multiple
          value={personName}
          onChange={handleChangeBox}
          input={<OutlinedInput label="Роль" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" sx={{ marginBottom: 0.5 }}>
                <InputLabel>Уровень</InputLabel>
                <Select
                  value={editedUser.status || ""}
                  onChange={handleStatusChange}
                  name="status"
                  label="Статус"
                >
                  <MenuItem value="центр">Центр</MenuItem>
                  <MenuItem value="другое">другое</MenuItem>
                </Select>
        </FormControl>
        </div>


        <div className="details">
        <TextField
                    label="Управление"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.management || ""}
                    name="management"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                  <TextField
                    label="Отдел"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.department || ""}
                    name="department"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
                  <TextField
                    label="Должность"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={editedUser.position || ""}
                    name="position"
                    onChange={handleChange}
                    sx={{ marginBottom: 0.5 }} // Уменьшение отступа между полями
                  />
        </div>

        </div>


        <div className="buttons">
        <Button
                variant="contained"
                color="primary"
                onClick={openConfirmationDialog}
                style={{ backgroundColor: "#C47A2C", borderRadius: "0" }}
              >
                Сохранить
              </Button>
            {isSaved && (
                <Typography variant="body1" color="success.main" align="center" sx={{ mt: 1 }}>
                  {dialogMessage}
                </Typography>
            )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/admin")}
                style={{ backgroundColor: "#ffffff", color: "#000", borderRadius: "0" }}
              >
                Назад
              </Button>
        </div>
          
      {/* Диалоговое окно подтверждения */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Подтверждение изменений</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Отменить
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
