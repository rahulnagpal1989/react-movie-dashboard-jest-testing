import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/search/:title" element={<Home />} />
				<Route path="/detail/:title/:id" element={<Detail />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
