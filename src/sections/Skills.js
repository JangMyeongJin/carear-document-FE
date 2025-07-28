import React from "react";
import "./Skills.css";

const Skills = () => {
  const skillCategories = [
    {
      category: "Search Engines",
      skills: [
        { name: "Elasticsearch", level: 95 },
        { name: "Apache Solr", level: 90 },
        { name: "Lucene", level: 85 },
        { name: "OpenSearch", level: 80 },
        { name: "자체 검색엔진", level: 85 },
      ],
    },
    {
      category: "Programming",
      skills: [
        { name: "Java", level: 90 },
        { name: "Python", level: 85 },
        { name: "C++", level: 75 },
        { name: "JavaScript", level: 80 },
        { name: "Scala", level: 70 },
      ],
    },
    {
      category: "Big Data & ML",
      skills: [
        { name: "Apache Spark", level: 80 },
        { name: "Kafka", level: 85 },
        { name: "Hadoop", level: 75 },
        { name: "TensorFlow", level: 70 },
        { name: "NLP", level: 80 },
      ],
    },
    {
      category: "Infrastructure",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 80 },
        { name: "AWS", level: 85 },
        { name: "Redis", level: 90 },
        { name: "MySQL/PostgreSQL", level: 85 },
      ],
    },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-header">
          <h2>Skills & Technologies</h2>
          <p>제가 보유한 검색엔진 기술과 숙련도를 확인해보세요</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="additional-skills">
          <h3>추가 전문 기술</h3>
          <div className="skill-tags">
            <span className="skill-tag">검색 알고리즘</span>
            <span className="skill-tag">랭킹 시스템</span>
            <span className="skill-tag">검색 최적화</span>
            <span className="skill-tag">대용량 데이터 처리</span>
            <span className="skill-tag">검색 성능 튜닝</span>
            <span className="skill-tag">검색 로그 분석</span>
            <span className="skill-tag">검색 API 설계</span>
            <span className="skill-tag">검색 시스템 아키텍처</span>
            <span className="skill-tag">검색 품질 평가</span>
            <span className="skill-tag">A/B 테스팅</span>
            <span className="skill-tag">검색 트렌드 분석</span>
            <span className="skill-tag">검색 보안</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
