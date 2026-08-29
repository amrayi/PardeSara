import { useState, type ReactNode } from "react";
import "../../styles/AccordionItem.css";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-item__header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="accordion-item__title">{title}</span>
        <span
          className={`accordion-item__icon ${
            isOpen ? "accordion-item__icon--open" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        className={`accordion-item__content-wrapper ${
          isOpen ? "accordion-item__content-wrapper--open" : ""
        }`}
      >
        <div className="accordion-item__content">{children}</div>
      </div>
    </div>
  );
}

export default AccordionItem;