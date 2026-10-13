import { useState, useRef, useEffect } from "react";
import "./Header.css";
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  const close = () => setOpen(false);
  useEffect(() => {
    if (!open) return;
    const dismiss = event => {
      if (!header.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  return <header className="header" ref={header} onKeyDown={event => {
    if (event.key === "Escape") {
      close();
      toggle.current?.focus();
    }
  }}>
    <div className="header-container">
      <a className="brand" href="#hero" onClick={close}><strong>장명진's Career<span aria-hidden="true"></span></strong><span>SEARCH & BACKEND Developer</span></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "닫기 −" : "메뉴 +"}</button>
      <nav id="main-nav" className={open ? "nav is-open" : "nav"} aria-label="주 내비게이션">
        <a href="#projects" onClick={close}>Work <span>01</span></a><a href="#skills" onClick={close}>About <span>02</span></a><a href="#contact" onClick={close}>Contact <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}
