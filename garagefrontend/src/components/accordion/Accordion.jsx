import { forwardRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ReactComponent as Expand } from "../../icons/expand_more.svg";
import styles from "./Accordion.module.css";

const AccordionItem = forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={[styles["accordion-item"], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className={styles["accordion-header"]}>
      <Accordion.Trigger
        className={[styles["accordion-trigger"], className]
          .filter(Boolean)
          .join(" ")}
        {...props}
        ref={forwardedRef}
      >
        <span className={styles["accordion-header-text"]}>{children}</span>
        <Expand className={styles["accordion-chevron"]} aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

AccordionTrigger.displayName = Accordion.Trigger.displayName;

const AccordionContent = forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={[styles["accordion-content"], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
      ref={forwardedRef}
    >
      <div className={styles["accordion-content-wrapper"]}>{children}</div>
    </Accordion.Content>
  )
);

AccordionContent.displayName = Accordion.Content.displayName;

const AccordionRoot = forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Root
      className={[styles["accordion-root"], className]
        .filter(Boolean)
        .join(" ")}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </Accordion.Root>
  )
);

AccordionRoot.displayName = Accordion.Root.displayName;

export { AccordionRoot, AccordionTrigger, AccordionContent, AccordionItem };
