import React, { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * It creates a new NodeElement and it appends it to body.
 *
 * @param {string} wrapperId
 * @returns NodeElement
 */
function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}

export default function Portal({
  children,
  wrapperId = "portal-wrapper"
}: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  // We handle dynamic changing wrapperId prop
  // Please note: we need to use `useLayoutEffect` as we are modifying the DOM
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // If element is not found with wrapperId, create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    // If we created a new element, we should remove it from the DOM
    return () => {
      if (systemCreated && element!.parentNode) {
        // delete the programmatically created element
        element!.parentNode.removeChild(element!);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  // Create a portal
  return createPortal(children, wrapperElement);
}
