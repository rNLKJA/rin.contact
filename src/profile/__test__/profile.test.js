import React from "react";
import Profile from "../profile.jsx";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Profile Card renders with correct text", () => {
  const component = render(<Profile />);
  const author = component.getByTestId("author");
  // console.log(author);
  expect(author.textContent).toBe("Sunchuangyu Huang");
});
