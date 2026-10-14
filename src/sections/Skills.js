import React from "react";
import "./Skills.css";
import SectionHeading from "../components/SectionHeading";
const Skills = () => {
  const skillCategories = [{
    category: "Search Engines",
    skills: [{
      name: "Elasticsearch",
      level: 85
    }, {
      name: "OpenSearch",
      level: 85
    }]
  }, {
    category: "Programming",
    skills: [{
      name: "Java",
      level: 85
    }, {
      name: "Python",
      level: 80
    }, {
      name: "JavaScript",
      level: 80
    }, {
      name: "C++",
      level: 75
    }]
  }, {
    category: "Frontend",
    skills: [{
      name: "React",
      level: 80
    }, {
      name: "HTML5/CSS",
      level: 80
    }]
  }, {
    category: "Backend",
    skills: [{
      name: "Spring Boot",
      level: 85
    }, {
      name: "Node.js",
      level: 80
    }, {
      name: "Flask",
      level: 75
    }]
  }, {
    category: "Database",
    skills: [{
      name: "MsSQL",
      level: 85
    }, {
      name: "PostgreSQL",
      level: 85
    }, {
      name: "Oracle",
      level: 80
    }, {
      name: "MySQL",
      level: 80
    }, {
      name: "MongoDB",
      level: 80
    }]
  }, {
    category: "Other",
    skills: [{
      name: "Apache Airflow",
      level: 80
    }, {
      name: "Git",
      level: 80
    }, {
      name: "Docker",
      level: 70
    }]
  }];
  return <section className="skills" id="skills">
      <div className="container">
        <SectionHeading number="02" title="Expertise">전문 기술.</SectionHeading>
        <div className="expertise-grid">
          <article className="expertise-item"><span>01</span><h3>검색 아키텍처와 품질</h3><p>Elasticsearch, OpenSearch 기반 검색 아키텍처를 설계하고 구축했습니다. 키워드 랭킹과 검색 품질을 다루며 검색 경험을 개선합니다.</p></article>
          <article className="expertise-item"><span>02</span><h3>데이터 수집 · 색인</h3><p>Airflow, Spring Batch 기반 데이터 수집·색인 파이프라인 아키텍처를 설계하고 구축했습니다. 검색 서비스와 데이터를 연결합니다.</p></article>
          <article className="expertise-item"><span>03</span><h3>Hybrid 검색 · RAG</h3><p>OpenSearch Vector 검색과 keyword 검색을 조합한 Hybrid 검색을 개발했습니다. LLM을 연동한 RAG 검색 서비스 개발 경험이 있습니다.</p></article>
        </div>
        <details className="skills-inventory"><summary>기술 목록과 숙련도 살펴보기</summary><p className="filter-note">숙련도는 기존 포트폴리오에 기재한 자기 평가입니다.</p>

        <div className="skills-grid">
          {skillCategories.map((category, index) => <div key={index} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{
                    width: `${skill.level}%`
                  }}></div>
                    </div>
                  </div>)}
              </div>
            </div>)}
        </div>

        </details>
        <div className="additional-skills">
          <h3>추가 전문 기술</h3>
          <div className="skill-tags">
            <span className="skill-tag">검색 아키텍처 설계</span>
            <span className="skill-tag">키워드 기반 랭킹 시스템</span>
            <span className="skill-tag">OpenSearch Vector 검색</span>
            <span className="skill-tag">LLM 연계 RAG 서비스 개발</span>
            <span className="skill-tag">데이터 파이프라인 설계 및 구축</span>
          </div>
        </div>
      </div>
    </section>;
};
export default Skills;
