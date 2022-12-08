import Home from "../app/pae";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Home", () => {
	it("renders a Home", () => {
		render(<Home />);
	});
});
