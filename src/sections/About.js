import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>저에 대해 더 자세히 알아보세요</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>안녕하세요! 저는 검색엔진 엔지니어입니다</h3>
            <p>
              주로 ElasticSearch와 OpenSearch를 활용하여 정확하고 빠른 검색
              서비스를 구현해왔습니다.
            </p>

            <div className="about-details">
              <div className="detail-item">
                <h4>🎯 전문 분야</h4>
                <p>Elasticsearch, OpenSearch</p>
              </div>

              <div className="detail-item">
                <h4>💼 경력</h4>
                <p>
                  5년간의 검색엔진 개발 경험, 대규모 검색 시스템 구축 및 운영
                </p>
              </div>

              <div className="detail-item">
                <h4>🚀 목표</h4>
                <p>
                  사용자에게 가장 정확하고 빠른 검색 경험을 제공하는 검색 사이트
                  개발
                </p>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">년 경력</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">검색 프로젝트</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1M+</div>
                <div className="stat-label">일일 검색량</div>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="image-placeholder">
              <div className="image-icon">🔍</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
