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
            <p className="hero-subtitle">
              주로 검색엔진 운영과 검색 API 개발을 통해 사용자에게 정확하고
              빠른 검색 경험을 제공해왔습니다. <br />
              사용자가 쉽게 검색 할 수 있게 인기 검색어, 자동완성, 데이터 통계
              API 등 부가적인 API도 개발해왔습니다. <br />
              사용자 의도를 정확히 파악하기 위해 OpenSearch를 이용하여Vector
              검색과LLM을 연동한 AI 검색 서비스 개발 경험도 있습니다.
            </p>
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
