import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT Autentication</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Login</button></Link>
					<Link to="/signup">
						<button className="btn btn-success">Register</button>
					</Link>
					{store.currentUserEmail ? (
						<button className="btn btn-danger" onClick={async () => {
							navigate("/");
							await actions.logout();
						}}>Logout</button>
					) : null}
				</div>
			</div>
		</nav>
	);
};
