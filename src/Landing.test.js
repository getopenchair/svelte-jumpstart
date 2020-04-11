import { render } from "@testing-library/svelte";

import App from "./Landing.svelte";

test("shows footer", () => {
  const { getByText } = render(App);

  expect(getByText("Hello World!")).toBeInTheDocument();
});
