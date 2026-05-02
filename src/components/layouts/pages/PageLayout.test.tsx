import React from "react";
import { render, waitFor } from "@testing-library/react";
import PageLayout from "./PageLayout";

const mockSetCurrentPageTitle = jest.fn();

jest.mock("../../../hooks/useNavigation", () => ({
  __esModule: true,
  default: () => ({
    setCurrentPageTitle: mockSetCurrentPageTitle,
  }),
}));

describe("PageLayout", () => {
  beforeEach(() => {
    mockSetCurrentPageTitle.mockClear();
  });

  it("updates the page title only when the title changes", async () => {
    const { rerender } = render(
      <PageLayout title="Contact">Contact content</PageLayout>
    );

    await waitFor(() => expect(mockSetCurrentPageTitle).toHaveBeenCalledTimes(1));
    expect(mockSetCurrentPageTitle).toHaveBeenLastCalledWith("Contact");

    rerender(<PageLayout title="Contact">Updated contact content</PageLayout>);

    expect(mockSetCurrentPageTitle).toHaveBeenCalledTimes(1);

    rerender(<PageLayout title="Messages">Messages content</PageLayout>);

    await waitFor(() => expect(mockSetCurrentPageTitle).toHaveBeenCalledTimes(2));
    expect(mockSetCurrentPageTitle).toHaveBeenLastCalledWith("Messages");
  });
});
