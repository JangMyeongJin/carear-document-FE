import React from "react";
import "./Education.css";

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "컴퓨터공학 학사",
      school: "서울대학교",
      period: "2015 - 2019",
      description:
        "컴퓨터공학을 전공하며 알고리즘, 자료구조, 데이터베이스, 정보검색 등을 학습했습니다. 검색 알고리즘과 정보 검색 시스템에 대한 깊은 이해를 바탕으로 검색엔진 개발의 기초를 다졌습니다.",
      gpa: "4.2/4.5",
      courses: ["알고리즘", "자료구조", "정보검색", "데이터베이스", "기계학습"],
    },
    {
      id: 2,
      degree: "검색엔진 엔지니어링 과정",
      school: "검색 기술 전문 교육기관",
      period: "2019",
      description:
        "Elasticsearch, Solr, Lucene 등 주요 검색엔진 기술을 심화 학습했습니다. 실제 검색 시스템 구축과 최적화 실습을 통해 실무 역량을 키웠습니다.",
      gpa: "수료",
      courses: [
        "Elasticsearch",
        "Apache Solr",
        "Lucene",
        "검색 알고리즘",
        "성능 최적화",
      ],
    },
    {
      id: 3,
      degree: "정보처리기사",
      school: "한국산업인력공단",
      period: "2018",
      description: "정보처리 관련 국가기술자격증을 취득했습니다.",
      gpa: "합격",
      courses: [
        "소프트웨어 설계",
        "소프트웨어 개발",
        "데이터베이스 구축",
        "프로그래밍 언어 활용",
      ],
    },
  ];

  const certifications = [
    {
      name: "Elasticsearch Certified Engineer",
      issuer: "Elastic",
      date: "2023",
      description: "Elasticsearch 클러스터 설계, 운영, 최적화 능력 인증",
    },
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      description: "AWS 클라우드 아키텍처 설계 및 검색 시스템 배포 능력 인증",
    },
    {
      name: "Apache Solr Certification",
      issuer: "Apache Software Foundation",
      date: "2021",
      description: "Apache Solr 검색엔진 개발 및 운영 능력 인증",
    },
  ];

  return (
    <section className="education" id="education">
      <div className="container">
        <div className="section-header">
          <h2>Education & Certifications</h2>
          <p>제 학력과 검색엔진 관련 자격증을 확인해보세요</p>
        </div>

        <div className="education-content">
          <div className="education-section">
            <h3>학력</h3>
            <div className="education-timeline">
              {education.map((edu, index) => (
                <div key={edu.id} className="education-item">
                  <div className="education-header">
                    <h4>{edu.degree}</h4>
                    <h5>{edu.school}</h5>
                    <span className="period">{edu.period}</span>
                    <span className="gpa">{edu.gpa}</span>
                  </div>

                  <p className="description">{edu.description}</p>

                  <div className="courses">
                    <h6>주요 과목:</h6>
                    <div className="course-tags">
                      {edu.courses.map((course, idx) => (
                        <span key={idx} className="course-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="certifications-section">
            <h3>자격증</h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="cert-header">
                    <h4>{cert.name}</h4>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-description">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
