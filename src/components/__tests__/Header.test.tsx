import ReactDOM from "react-dom/client";
import Header from "../../components/Header";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("render header component", () => {
	render(
		<BrowserRouter>
			<Header loader={false} />
		</BrowserRouter>
	);
	const textElement = screen.getByText(/WOOKIE MOVIES/i);
	expect(textElement).toBeInTheDocument();
});
