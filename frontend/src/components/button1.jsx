import React from "react";
import "./button1.css"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const Button1 = ({ login }) => {

  const navigate = useNavigate()

  //aqui debemos de crear la funcion para que elimine los datos del localstorage
  
  const logout = () => {
    console.log("hola")
    localStorage.removeItem("user");
    navigate(0)
}

  return (
    <>

      {login ? (
        <button className="bt2" onClick={logout}>
          <LoginIcon />
        </button>
      ) : (
        <button className="bt1" onClick={() => navigate('/login')}>
          <LogoutIcon />
        </button>
      )}

    </>
  );
};



export default Button1;
