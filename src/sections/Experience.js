import React from "react";
import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "(주)클러쉬 (Clush)",
      position: "검색 개발자, 검색엔진 엔지니어",
      period: "2025.05 - 현재",
      startDate: "2025-05",
      endDate: "현재",
      description: [
        "클러쉬는 다양한 클라우드 네이티브 기반 솔루션을 제공하는 기업입니다.",
        "검색엔진 기반의 전문 검색 기능을 사내 최초로 도입하였으며, 프로젝트 내 인덱스 매핑 설계, 분석기 설정, Query DSL 구성 등 검색엔진 개발 및 운영을 전 과정에 걸쳐 단독으로 주도했습니다.",
        "검색엔진 도입 이후 기존 DB 검색 대비 응답 속도가 개선되었으며, 프로젝트 내 유저 피드백 기반의 검색 정렬 및 조건을 튜닝을 통해 만족도를 향상시켰습니다.",
        "검색엔진 정보를 팀 내 전파하기 위해 사내 문서화, 다른 개발자 대상 교육도 진행하여 다른 팀원들도 도왔습니다.",
      ],
      technologies: ["OpenSearch", "OpenSearch Dashboards", "Java", "Python", "Spring Boot", "RDB", "AirFlow", "Git", "Linux"],
    },
    {
      id: 3,
      company: "(주)프로텐 (Proten)",
      position: "검색 개발자, 검색엔진 엔지니어",
      period: "2021.12 - 2025.04",
      startDate: "2021-12",
      endDate: "2025-04",
      description: [
        "프로텐은 ElasticSearch 기반으로 다양한 검색 솔루션을 제공하는 기업입니다.",
        "검색 개발자와 검색엔진 엔지니어로 주로 SI 프로젝트에서 일해왔으며, 오픈소스 검색엔진인 ElasticSearch에 쉽게 검색할 수 있는 API를 개발해 왔습니다.",
        "백엔드뿐만 아니라 검색 화면 개발과 PDF 문서 뷰어 솔루션의  화면 개발, 웹 크롤러 솔루션 개발도 진행했습니다.",
        "사내 개발 동아리를 개설하여 동아리원들과 사이드 프로젝트를 진행했습니다. 또한 동료들과 더 나은 개발 문화를 만들기 위해 같이 공부하고 노력해 왔습니다.",
      ],
      technologies: ["Elasticsearch", "Kibana", "Java", "Python", "C#", "Spring Boot", "Node.js", "RDB", "Git", "Linux"],
    },
  ];

  // 총 경력 계산 함수
  const calculateTotalExperience = () => {
    let totalMonths = 0;
    
    experiences.forEach(exp => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate === "현재" ? new Date() : new Date(exp.endDate);
      
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
            <span className="total-experience-value">{calculateTotalExperience()}</span>
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
