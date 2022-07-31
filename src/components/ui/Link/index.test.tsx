import { cleanup, render } from "@testing-library/react";
import Link from ".";

afterEach(cleanup);

it("checks if Link rendered correctly", () => {
    const link = render(
        <Link href={"/"}>home</Link>,
    );

    expect(link.getByText("home").hasAttribute("href")).toBeTruthy();
});