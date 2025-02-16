import { useState } from "react";
import Login from "./Login"
import Registration from "./Registration"
import "./main-page.css"

export default function MainPage() {
  const [loginActive, setLoginActive] = useState(false);
  const [registrationActive, setRegistrationActive] = useState(false);

  return (
    <div className="all">
        <div className="buttons">
          <button className="open-btn" onClick={() => setLoginActive(true)}>Авторизация</button>
          <button className="open-btn" onClick={() => setRegistrationActive(true)}>Регистрация</button>
          {/* <Button fullWidth variant="contained" sx={{color: "#ffffff", backgroundColor:"#C47A2C", mt: 2}} onClick={() => setLoginActive(true)}>
            Авторизация
          </Button>
          <Button fullWidth variant="contained" sx={{color: "#ffffff", backgroundColor:"#C47A2C", mt: 2}} >
            Регистрация
          </Button>   */}
        </div>
        <Login active={loginActive} setActive={setLoginActive}/>
        <Registration active={registrationActive} setActive={setRegistrationActive}/>
    </div>
  );
}