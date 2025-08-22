import React from "react";
import "./Hero.css";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              안녕하세요. <br />
              저는 <span className="highlight">장명진</span>입니다
            </h1>
            <ul className="hero-subtitle">
              <li>정확하고 빠른 검색 경험을 제공하는 검색엔진 엔지니어 및 검색 개발자입니다.</li>
              <li>주로 검색엔진 운영과 검색 API 개발을 하여 프로젝트를 진행해 왔습니다.</li>
              <li>사용자가 쉽게 검색 할 수 있게 인기 검색어, 자동완성, 데이터 통계 등 부가적인 API도 개발해왔습니다.</li>
              <li>사용자 의도를 정확히 파악하기 위해 OpenSearch를 이용하여 Vector 검색과 LLM을 연동한 RAG 검색 서비스 개발 경험도 있습니다.</li>
            </ul>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => scrollToSection("projects")}
              >
                프로젝트 보기
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => scrollToSection("contact")}
              >
                연락하기
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-placeholder">
              <div className="profile-icon">🔍</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
            <span>스크롤하여 더 알아보기</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
