import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false);

	const sendRegisterCredentials = async () => {

		const response = await fetch(process.env.BACKEND_URL + "/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password
			}),
		});
		const data = await response.json();
		if (response.ok) {
			navigate("/login");
		} else {
			setError(data.response);
		}

	};
	return (
		<div className="container-md d-flex  justify-content-center  mt-5">
			<div className=" col-sm-6 border rounded p-2 ">
				<h2 className="text-center m-3">Register </h2>
				<div className="row my-3">
					<label className=" col-form-label" htmlFor="name">
						Name:
					</label>
					<div className="col">
						<input className="form-control" name="name" placeholder="name" onChange={(e) => {

							setEmail(e.target.value);
						}}
						></input>
					</div>
				</div>
				<div className="row my-3">
					<label className=" col-form-label" htmlFor="password">
						Password:
					</label>
					<div className="col">
						<input type="password" className="form-control" name="password" placeholder="password" minLength="8" maxLength="20" onChange={(e) => {

							setPassword(e.target.value);

						}}
						></input>
					</div>
				</div>
				<button className="btn btn-success btn-lg" onClick={sendRegisterCredentials}>
					Register
				</button>
				{error ? <p className="alert alert-warning mt-2">{error}</p> : null}
			</div>

		</div>
	);
};
