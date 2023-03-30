import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = props => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		if (!store.currentUserEmail) {
			navigate("/login");
		}
		actions.getCurrentUserEmail();
	}, []);

	return (
		<div className="jumbotron">
			<h1 className="display-4">HOLA : {store.currentUserEmail}</h1>

			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};
