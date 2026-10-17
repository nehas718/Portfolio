import { useEffect, useRef, useState } from "react";
import { EMAIL } from "../data/projects";
import { ArrowUpRight, CopyIcon } from "../components/Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  function say(message: string) {
    setToast(message);
    setToastVisible(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 2200);
  }

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        say("Email copied to clipboard");
        window.setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      /* fall through */
    }
    say("Press Ctrl/Cmd + C to copy");
  }

  return (
    <section className="pad contact on-band" id="contact">
      <div className="wrap">
        <h2>
          Let's build
          <br />
          something.
        </h2>
        <div className="mail">
          <a className="addr" id="addr" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <button className="btn small" type="button" onClick={copyEmail}>
            <CopyIcon />
            <span>{copied ? "Copied" : "Copy email"}</span>
          </button>
        </div>
        <div className="actions">
          <a
            className="btn solid"
            href="https://www.linkedin.com/in/neha-shababudeen-ab45ba346"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ArrowUpRight />
          </a>
          <a className="btn" href={`mailto:${EMAIL}`}>
            Send an email
          </a>
        </div>
        <div className="foot">
          <span>© 2026 Neha Shababudeen</span>
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
      <div className={`toast${toastVisible ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  );
}
