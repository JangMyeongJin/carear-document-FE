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
            <h3>Search Engine Portfolio</h3>
            <p>정확하고 빠른 검색 경험을 제공하는 검색엔진 엔지니어입니다.</p>
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
            </ul>
          </div>

          <div className="footer-section">
            <h4>연락처</h4>
            <ul>
              <li>📧 jean9710@naver.com</li>
              <li>📍 서울특별시, 대한민국</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>소셜 미디어</h4>
            <div className="social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐙 GitHub
              </a>
              <a
                href="https://medium.com"
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
            <p>&copy; 2024 Search Engine Portfolio. All rights reserved.</p>
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
