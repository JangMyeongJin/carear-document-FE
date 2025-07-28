import React from "react";
import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "대형 검색 플랫폼",
      position: "시니어 검색엔진 엔지니어",
      period: "2022 - 현재",
      description:
        "대용량 검색 시스템의 설계, 개발, 운영을 담당하며 검색 성능 최적화와 사용자 경험 향상에 기여했습니다.",
      achievements: [
        "일일 100만 건 이상의 검색 요청 처리 시스템 구축",
        "검색 응답 시간 50% 단축 (평균 200ms → 100ms)",
        "검색 정확도 향상을 위한 랭킹 알고리즘 개선",
      ],
      technologies: ["Elasticsearch", "Java", "Python", "Kafka", "Redis"],
    },
    {
      id: 2,
      company: "검색 기술 스타트업",
      position: "검색 개발자",
      period: "2020 - 2022",
      description: "자체 검색엔진 개발 및 검색 API 서비스 구축을 담당했습니다.",
      achievements: [
        "자체 검색엔진 개발로 검색 정확도 30% 향상",
        "검색 API 서비스 구축 및 고객사 50개 이상 연동",
        "실시간 검색어 분석 및 트렌드 추적 시스템 개발",
      ],
      technologies: ["Solr", "Java", "Spring", "MySQL", "Docker"],
    },
    {
      id: 3,
      company: "IT 컨설팅",
      position: "검색 시스템 엔지니어",
      period: "2019 - 2020",
      description:
        "기업용 검색 시스템 구축 및 검색 솔루션 컨설팅을 담당했습니다.",
      achievements: [
        "기업 내부 문서 검색 시스템 구축",
        "검색 로그 분석 및 성능 튜닝",
        "검색 시스템 아키텍처 설계 및 문서화",
      ],
      technologies: ["Elasticsearch", "Logstash", "Kibana", "Java", "Python"],
    },
  ];

  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section-header">
          <h2>Work Experience</h2>
          <p>제 경력과 업무 경험을 확인해보세요</p>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <span className="period">{exp.period}</span>
                </div>

                <p className="description">{exp.description}</p>

                <div className="achievements">
                  <h5>주요 성과:</h5>
                  <ul>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="technologies">
                  <h5>사용 기술:</h5>
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
