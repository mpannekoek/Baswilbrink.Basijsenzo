import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LandingPage } from "@/components/landing/landing-page";
import { siteContent } from "@/lib/content/site-content";

const escapeForRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("LandingPage", () => {
  it("renders the main hero messaging", () => {
    render(<LandingPage content={siteContent} />);

    expect(
      screen.getByRole("heading", {
        name: new RegExp(escapeForRegex(siteContent.hero.title), "i"),
      }),
    ).toBeInTheDocument();

    expect(screen.getByAltText(siteContent.hero.featureImageAlt)).toHaveAttribute(
      "loading",
      "eager",
    );
  });

  it("renders practical information and review summary", () => {
    render(<LandingPage content={siteContent} />);

    expect(screen.getAllByTestId("practical-hours-list")[0]).toBeInTheDocument();
    expect(screen.getAllByText(siteContent.reviewSummary.averageRating)[0]).toBeInTheDocument();
    expect(screen.getAllByText(siteContent.practicalInfo.routeLabel)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("social-instagram-link")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("social-facebook-link")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("site-footer-credit-link")[0]).toBeInTheDocument();
  });

  it("opens the mobile navigation menu", () => {
    render(<LandingPage content={siteContent} />);

    expect(screen.queryByTestId("mobile-nav-panel")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId("mobile-menu-button")[0]);

    expect(screen.getByTestId("mobile-nav-panel")).toBeInTheDocument();
    expect(screen.getByLabelText(siteContent.header.mobileNavAriaLabel)).toBeInTheDocument();
  });
});
