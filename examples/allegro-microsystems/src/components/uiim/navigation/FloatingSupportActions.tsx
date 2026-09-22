import React, { JSX } from "react";
import {
  Field,
  Link as ContentSdkLink,
  LinkField,
  Text,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";
import { cn } from "@/lib/utils";

interface FloatingSupportActionsFields {
  AskLabel: Field<string>;
  AskLink: LinkField;
  ContactLabel: Field<string>;
  ContactLink: LinkField;
}

type FloatingSupportActionsProps = ComponentProps & {
  fields: FloatingSupportActionsFields;
};

const FloatingSupportActionsDefaultComponent = (): JSX.Element => (
  <div className="component floating-support-actions">
    <div className="component-content">
      <span className="is-empty-hint">FloatingSupportActions</span>
    </div>
  </div>
);

const CONTACT_GREEN = "#24A148";

const chipBase =
  "inline-flex items-center justify-center font-[var(--brand-body-font,inherit)] text-sm font-semibold shadow-md transition-opacity hover:opacity-90";

export const Default = ({
  fields,
  params,
  page,
}: FloatingSupportActionsProps): JSX.Element => {
  const { styles, RenderingIdentifier } = params;
  const isEditing = page?.mode?.isEditing;

  if (!fields) return <FloatingSupportActionsDefaultComponent />;

  const showAsk = Boolean(
    fields.AskLabel?.value || fields.AskLink?.value?.href || isEditing,
  );
  const showContact = Boolean(
    fields.ContactLabel?.value || fields.ContactLink?.value?.href || isEditing,
  );

  return (
    <div
      className={cn("component floating-support-actions", styles)}
      id={RenderingIdentifier}
    >
      <div
        className="pointer-events-none fixed inset-0 z-50"
        data-testid="floating-support-actions"
      >
        <div className="pointer-events-auto absolute right-0 bottom-24 flex flex-col items-end gap-2 md:right-6 md:bottom-6 md:flex-row-reverse">
          {showAsk && (
            <ContentSdkLink
              field={fields.AskLink}
              className={cn(
                chipBase,
                "rounded-l-md px-3 py-3 text-white [writing-mode:vertical-rl] md:rounded-[var(--brand-button-radius,0.375rem)] md:px-4 md:py-2.5 md:[writing-mode:horizontal-tb]",
              )}
              style={{
                backgroundColor: "var(--brand-primary)",
                color: "var(--brand-primary-foreground)",
              }}
            >
              <Text field={fields.AskLabel} tag="span" />
            </ContentSdkLink>
          )}
          {showContact && (
            <ContentSdkLink
              field={fields.ContactLink}
              className={cn(
                chipBase,
                "rounded-l-md px-3 py-3 text-white [writing-mode:vertical-rl] md:rounded-[var(--brand-button-radius,0.375rem)] md:px-4 md:py-2.5 md:[writing-mode:horizontal-tb]",
              )}
              style={{
                backgroundColor: CONTACT_GREEN,
                color: "#ffffff",
              }}
            >
              <Text field={fields.ContactLabel} tag="span" />
            </ContentSdkLink>
          )}
        </div>
      </div>
    </div>
  );
};
