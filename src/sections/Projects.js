import React, { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      title: "대용량 검색 플랫폼",
      description:
        "일일 100만 건 이상의 검색 요청을 처리하는 대용량 검색 플랫폼입니다. Elasticsearch 기반으로 구축되어 높은 성능과 확장성을 제공합니다.",
      period: "2023.03 - 2023.12",
      role: "백엔드 개발",
      technologies: ["Elasticsearch", "Java", "Kafka", "Redis", "Docker"],
      features: [
        "대용량 검색 처리",
        "실시간 인덱싱",
        "검색 성능 최적화",
        "모니터링 대시보드",
      ],
    },
    {
      id: 2,
      title: "자체 검색엔진 개발",
      description:
        "Lucene 기반의 자체 검색엔진을 개발하여 특정 도메인에 최적화된 검색 서비스를 제공합니다.",
      period: "2022.06 - 2023.02",
      role: "검색엔진 개발",
      technologies: ["Lucene", "Java", "Spring", "MySQL", "Maven"],
      features: [
        "커스텀 랭킹 알고리즘",
        "도메인 특화 검색",
        "검색 품질 평가",
        "성능 튜닝",
      ],
    },
    {
      id: 3,
      title: "검색 로그 분석 시스템",
      description:
        "검색 사용자 행동을 분석하여 검색 품질을 개선하는 시스템입니다. 실시간 데이터 처리와 시각화를 제공합니다.",
      period: "2023.01 - 2023.08",
      role: "데이터 엔지니어",
      technologies: [
        "Apache Spark",
        "Kafka",
        "Elasticsearch",
        "Python",
        "Kibana",
      ],
      features: [
        "실시간 로그 분석",
        "사용자 행동 추적",
        "검색 트렌드 분석",
        "대시보드 시각화",
      ],
    },
    {
      id: 4,
      title: "검색 API 서비스",
      description:
        "다양한 클라이언트에서 활용할 수 있는 검색 API 서비스를 구축했습니다. RESTful API와 GraphQL을 모두 지원합니다.",
      period: "2022.09 - 2023.05",
      role: "API 개발",
      technologies: [
        "Spring Boot",
        "GraphQL",
        "Elasticsearch",
        "Docker",
        "AWS",
      ],
      features: ["RESTful API", "GraphQL 지원", "API 문서화", "성능 모니터링"],
    },
    {
      id: 5,
      title: "검색 성능 최적화",
      description:
        "기존 검색 시스템의 성능을 분석하고 최적화하여 응답 시간을 50% 단축시킨 프로젝트입니다.",
      period: "2023.06 - 2023.10",
      role: "성능 엔지니어",
      technologies: ["Elasticsearch", "Java", "Redis", "JMeter", "Prometheus"],
      features: ["성능 분석", "쿼리 최적화", "캐싱 전략", "부하 테스트"],
    },
    {
      id: 6,
      title: "검색 품질 평가 시스템",
      description:
        "검색 결과의 품질을 자동으로 평가하고 개선 방향을 제시하는 시스템입니다.",
      period: "2023.04 - 2023.11",
      role: "ML 엔지니어",
      technologies: ["Python", "TensorFlow", "Elasticsearch", "NLP", "MLflow"],
      features: ["자동 품질 평가", "ML 모델 활용", "A/B 테스팅", "품질 리포트"],
    },
  ];

  const filters = [
    { id: "all", label: "전체" },
    { id: "search", label: "검색엔진" },
    { id: "analytics", label: "분석" },
    { id: "api", label: "API" },
    { id: "optimization", label: "최적화" },
    { id: "quality", label: "품질관리" },
  ];

  // 검색어만 적용한 프로젝트 필터링 (카테고리 필터 제거)
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
          <p>제가 개발한 검색엔진 관련 프로젝트들을 확인해보세요</p>
        </div>

        <div className="project-search">
          <input
            type="text"
            placeholder="프로젝트 제목, 설명, 역할, 기술 스택으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                </div>
                <div className="project-info">
                  <div className="project-period">{project.period}</div>
                  <div className="project-role">{project.role}</div>
                </div>
                <p>{project.description}</p>

                <div className="project-features">
                  <h4>주요 기능:</h4>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
