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
              <span className="hero-title-role">
                검색 전문 엔지니어 & 백엔드 개발자
              </span>
              <br />
              <span className="highlight">장명진</span>입니다.
            </h1>
            <ul className="hero-subtitle">
              <li>
                검색엔진 기반 검색 서비스와 데이터 색인 파이프 라인을 구축한
                검색 특화 엔지니어 겸 백앤드 개발자입니다.
              </li>
              <li>
                Elasticsearch,OpenSearch 기반 검색 아키텍처 설계, 구축을
                하였습니다.
              </li>
              <li>
                Airflow,Spring Batch 기반 데이터 수집색인 파이프라인 아키텍처
                설계 및 구축을 하였습니다.
              </li>
              <li>
                OpenSearch KNN 쿼리를 이용한 Vector 검색 및 LLM 연계 RAG 서비스
                개발 경험도 있습니다.
              </li>
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
