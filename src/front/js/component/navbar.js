import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Login</button></Link>
					<Link to="/demo">
						<button className="btn btn-success">Register</button>
					</Link>
					<button className="btn btn-logout" onClick={async () => {
						if (await actions.logout()) {
							Navigate("/")
						}
					}}>Logout</button>
				</div>
			</div>
		</nav>
	);
};
