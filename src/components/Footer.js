import React from "react";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MY Career</h3>
            <p>정확하고 빠른 검색 경험을 제공하는 검색엔진 엔지니어 및 검색 개발자입니다.</p>
          </div>

          <div className="footer-section">
            <h4>빠른 링크</h4>
            <ul>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#education">Education</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>이메일</h4>
            <ul>
              <li>📧 jean971013568@gmail.com</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>소셜 미디어</h4>
            <div className="social-links">
              <a
                href="https://github.com/JangMyeongJin"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐙 GitHub
              </a>
              <a
                href="https://web-developer1.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ✍️ Blog
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; 2025 My Career. All rights reserved.</p>
            <p>Made with 🔍 using React.js</p>
          </div>

          <button className="scroll-to-top" onClick={scrollToTop}>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
