import React, { useState } from "react";
import "./Experience.css";

const Experience = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (expId, idx) => {
    const key = `${expId}-${idx}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const experiences = [
    {
      id: 1,
      company: "검색 개발자, 검색엔진 엔지니어",
      position: "(주)클러쉬 (Clush)",
      period: "2025.05 - 현재",
      startDate: "2025-05",
      endDate: "현재",
      description: [
        {
          title:
            "사내 최초 OpenSearch 기반 검색 플랫폼 구축 및 검색 기능 표준화",
          details: [
            "프로젝트별 상이한 검색 코드를 공통 검색 프레임워크로 통합하여 유지보수 효율 개선",
            "인덱스 설정 외부화를 통해 프로젝트별 재사용 가능한 검색 구조 설계",
            "SI 환경에 최적화된 확장형 검색 아키텍처 구축",
            "인기검색어, 최근검색어 개인화 기능 기획 및 개발로 사용자 검색 경험 개선",
            "Index template, ISM, Alias 기능을 활용해 검색어 로그 인덱스 운영 자동화 및 최적화",
            "검색어 특성에 따라 Nori tokenizer, ICU tokenizer를 분리 적용하여 한글 및 다국어 검색 품질 향상",
          ],
        },
        {
          title:
            "OpenSearch 기반 데이터 수집,색인 파이프라인 아키텍처 설계 및 구축",
          details: [
            "PostgreSQL 메타데이터 색인 및 검색 로그 기반 인기검색어 집계 파이프라인 개발",
            "DB 테이블 간 유사도 추출 파이프라인 개발",
            "동적 task 기반 확장형 DAG 구조 설계로 유지보수 효율성 개선",
            "Airflow 미사용 환경에서는 Java 기반 DB 수집기와 Spring Batch 연동으로 대체 스케줄링 구조 개발",
          ],
        },
      ],
      technologies: [
        "OpenSearch",
        "OpenSearch Dashboards",
        "Java",
        "Python",
        "Spring Boot",
        "RDB",
        "AirFlow",
        "Git",
        "Linux",
      ],
    },
    {
      id: 3,
      company: "검색 개발자, 검색엔진 엔지니어",
      position: "(주)프로텐 (Proten)",
      period: "2021.12 - 2025.04",
      startDate: "2021-12",
      endDate: "2025-04",
      description: [
        {
          title: "Elasticsearch 기반 검색 솔루션 개발",
          details: [
            "검색 API 개발 및 인기 검색어, 자동완성, 검색 결과 통계 API가 포함된 솔루션 개발",
            "검색 정확도 향상을 위해 가중치 설정 및 검색 랭킹 튜닝 적용",
            "SI 프로젝트 중심으로 검색 기능 최적화 및 커스텀 개발 수행",
          ],
        },
        {
          title: "Spring Boot 기반 웹 서비스 개발",
          details: [
            "Spring Boot 기반 회사 홈페이지 및 솔루션 시연 웹페이지 개발",
            "회사 홈페이지: 솔루션 소개자료 메일 전송 기능 개발",
            "솔루션 시연 페이지: Vector 검색 솔루션 + LLM 연동 AI 검색 웹페이지 개발",
          ],
        },
        {
          title:
            "OpenSearch 기반 Vector 검색 솔루션 및 LLM 연동 AI 검색 기능 개발",
          details: [
            "기존 키워드 기반 검색 솔루션을 개선하여 자연어 기반 Vector 검색 솔루션 개발",
            "질문과 데이터를 Vector로 변환하여 문장 단위 검색이 가능하도록 구현",
            "OpenSearch 기반으로 Vector 검색을 적용하고, 검색 후 정제된 데이터를 LLM과 연동",
            "LLM 모델을 활용한 후처리를 통해 검색 결과의 정확도를 향상",
          ],
        },
      ],
      technologies: [
        "Elasticsearch",
        "Kibana",
        "Java",
        "Python",
        "C#",
        "Spring Boot",
        "Node.js",
        "RDB",
        "Git",
        "Linux",
      ],
    },
  ];

  // 총 경력 계산 함수
  const calculateTotalExperience = () => {
    let totalMonths = 0;

    experiences.forEach((exp) => {
      const startDate = new Date(exp.startDate);
      const endDate =
        exp.endDate === "현재" ? new Date() : new Date(exp.endDate);

      const diffTime = Math.abs(endDate - startDate);
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
      totalMonths += diffMonths;
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) {
      return `${years}년 ${months}개월`;
    } else if (years > 0) {
      return `${years}년`;
    } else {
      return `${months}개월`;
    }
  };

  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="experience-section-header">
          <h2>Work Experience</h2>
          <p>제 경력과 업무 경험을 확인해보세요</p>
          <div className="total-experience">
            <span className="total-experience-label">총 경력:</span>
            <span className="total-experience-value">
              {calculateTotalExperience()}
            </span>
          </div>
        </div>

        <div className="experience-cards">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="experience-card">
              <div className="card-header">
                <div className="card-header-left">
                  <h3 className="position">{exp.position}</h3>
                  <h4 className="company">{exp.company}</h4>
                </div>
                <div className="card-header-right">
                  <span className="experience-period">{exp.period}</span>
                </div>
              </div>

              <div className="card-content">
                <div className="description">
                  <h5>주요 업무</h5>
                  <ul className="description-list">
                    {exp.description.map((item, idx) => {
                      const key = `${exp.id}-${idx}`;
                      const isOpen = expandedItems[key];

                      return (
                        <li
                          key={idx}
                          className={`description-item ${isOpen ? "open" : ""}`}
                        >
                          <button
                            type="button"
                            className="description-toggle"
                            onClick={() => toggleItem(exp.id, idx)}
                            aria-expanded={isOpen}
                          >
                            <span className="toggle-icon">
                              {isOpen ? "▼" : "▶"}
                            </span>
                            {item.title}
                          </button>

                          {isOpen && item.details?.length > 0 && (
                            <ul className="description-sublist">
                              {item.details.map((detail, subIdx) => (
                                <li key={subIdx}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="technologies">
                  <h5>사용 기술</h5>
                  <div className="tech-tags">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
