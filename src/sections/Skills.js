import React from "react";
import "./Skills.css";

const Skills = () => {
  const skillCategories = [
    {
      category: "Search Engines",
      skills: [
        { name: "Elasticsearch", level: 85 },
        { name: "OpenSearch", level: 80 },
      ],
    },
    {
      category: "Programming",
      skills: [
        { name: "Java", level: 85 },
        { name: "Python", level: 80 },
        { name: "JavaScript", level: 80 },
        { name: "C++", level: 75 },
      ],
    },
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 85 },
        { name: "HTML5/CSS", level: 80 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Spring Boot", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Flask", level: 75 },
      ],
    },
    {
      category: "Database",
      skills: [
        { name: "MsSQL", level: 85 },
        { name: "PostgreSQL", level: 85 },
        { name: "Oracle", level: 80 },
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 80 },
      ],
    },
    {
      category: "Other",
      skills: [
        { name: "Docker", level: 80 },
        { name: "Apache Airflow", level: 80 },
        { name: "Git", level: 80 },
        { name: "Jenkins", level: 75 },
      ],
    },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-header">
          <h2>Skills</h2>
          <p>제가 보유한 기술의 숙련도를 확인해보세요</p>
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
            <span className="skill-tag">랭킹 시스템</span>
            <span className="skill-tag">검색 최적화</span>
            <span className="skill-tag">검색 성능 튜닝</span>
            <span className="skill-tag">검색 API 설계</span>
            <span className="skill-tag">검색 시스템 아키텍처</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
