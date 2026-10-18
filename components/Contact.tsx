"use client";
import { useState } from "react";
import { identity } from "@/lib/content";
export default function CopyEmail() {
  const [message, setMessage] = useState("Copy email");
  return (
    <>
      <button
        type="button"
        className="copy-button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(identity.email);
            setMessage("Email copied");
          } catch {
            setMessage("Select the email address to copy");
          }
        }}
      >
        {message}
      </button>
      <span role="status" className="sr-only">
        {message === "Copy email" ? "" : message}
      </span>
    </>
  );
}
