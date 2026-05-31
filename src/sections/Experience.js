import React from "react";
import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "검색 개발자, 검색엔진 엔지니어",
      position: "(주)클러쉬 (Clush)",
      period: "2025.05 - 현재",
      startDate: "2025-05",
      endDate: "현재",
      description: [
        "사내 최초 OpenSearch 기반 검색 플랫폼 구축 및 검색 기능 표준화",
        "OpenSearch 기반 데이터 수집,색인 파이프라인 아키텍처 설계 및 구축",
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
        "Elasticsearch 기반 검색 솔루션 개발",
        "Spring Boot 기반 웹 서비스 개발",
        "OpenSearch 기반 Vector 검색 솔루션 및 LLM 연동 AI 검색 기능 개발",
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
                  <ul>
                    {exp.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
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
