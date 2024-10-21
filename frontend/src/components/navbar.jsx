import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Button1 from "./button1";
import AvatarUser from "./avatar";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function NavBar({ user }) {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div>
                <img
                    className="imagen"
                    src="src/assets/LOGO.png"
                    alt="Logo"
                    width={125}
                    onClick={() => navigate("/")}
                />
            </div>

            {user ? (
                user.name === "admin" ? (
                    <>
                        <div className="center-div">
                            <button className="button-to-addtravel" onClick={() => navigate("/uploadTravel")}>
                                Agregar Destino
                            </button>
                        </div>
                        <div className="Button-sign-in">
                            <Button1 login={true} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="center-div">
                            <AvatarUser width={60} height={60} src={user.user_image_link} />
                            <div className="user-info">
                                <h2>{user.user_name}</h2>
                                <p>Saldo: Q {user.user_credit} </p>
                            </div>
                            <div className="add-funds" onClick={() => navigate("/addFunds")}>
                                <AddCircleOutlineOutlinedIcon fontSize="medium" color="primary" />
                            </div>
                        </div>
                        <div className="Button-sign-in">
                            <Button1 login={true} />
                        </div>
                    </>
                )
            ) : (
                <div className="Button-sign-in">
                    <Button1 login={false} />
                </div>
            )}
        </div>
    );
}

export default NavBar;
