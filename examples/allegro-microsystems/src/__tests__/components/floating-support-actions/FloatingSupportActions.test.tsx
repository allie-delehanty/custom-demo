import React from "react";
import { render, screen } from "@testing-library/react";
import { Default as FloatingSupportActions } from "@/components/uiim/navigation/FloatingSupportActions";
import type { Field, LinkField } from "@sitecore-content-sdk/nextjs";

jest.mock("@sitecore-content-sdk/nextjs", () => ({
  Text: ({
    field,
    tag,
    className,
  }: {
    field?: Field<string>;
    tag?: string;
    className?: string;
  }) => {
    const Tag = (tag || "span") as keyof JSX.IntrinsicElements;
    return React.createElement(Tag, { className }, field?.value || "");
  },
  Link: ({
    field,
    className,
    style,
    children,
  }: {
    field?: LinkField;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }) =>
    React.createElement(
      "a",
      { href: field?.value?.href || "#", className, style },
      children || field?.value?.text || "",
    ),
}));

const baseParams = {
  styles: "",
  RenderingIdentifier: "floating-support",
};

const populatedFields = {
  AskLabel: { value: "AskAllegro" },
  AskLink: { value: { href: "#", text: "AskAllegro" } },
  ContactLabel: { value: "Contact Us" },
  ContactLink: {
    value: {
      href: "https://www.allegromicro.com/en/about-allegro/contact-us",
      text: "Contact Us",
    },
  },
};

describe("FloatingSupportActions", () => {
  it("renders both support chips when fields are present", () => {
    render(
      <FloatingSupportActions
        fields={populatedFields}
        params={baseParams}
        page={{ mode: { isEditing: false } } as never}
        rendering={{} as never}
      />,
    );

    expect(screen.getByTestId("floating-support-actions")).toBeInTheDocument();
    expect(screen.getByText("AskAllegro")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "https://www.allegromicro.com/en/about-allegro/contact-us",
    );
  });

  it("shows the empty hint when fields are missing", () => {
    render(
      <FloatingSupportActions
        fields={undefined as never}
        params={baseParams}
        page={{ mode: { isEditing: false } } as never}
        rendering={{} as never}
      />,
    );

    expect(screen.getByText("FloatingSupportActions")).toBeInTheDocument();
  });
});
