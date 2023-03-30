import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const sendLoginCredencial = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            await actions.getCurrentUserEmail();
            navigate("/private");
        } else {
            setError(true);
        }


    }

    return (
        <div className="text-center mt-5">
            LOGIN
            <label htmlFor="email"></label>
            <input name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

            <label htmlFor="password"></label>
            <input name="password" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

            <button className="btn btn-primary" onClick={() => sendLoginCredencial()}>Login</button>
            {error ? <p className="alert alert-danger">Error en credenciales</p> : null}
        </div>
    );
};
