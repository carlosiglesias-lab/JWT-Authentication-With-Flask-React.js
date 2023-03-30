import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	return (
		<div className="text-center mt-5">
			HOME
		</div>
	);
};
