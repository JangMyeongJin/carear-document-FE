import React from "react";
import "./Education.css";

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "경민대학교",
      school: "디지털콘텐츠학과",
      period: "2016.03 - 2022.02",
      status: "졸업",
    },
    {
      id: 2,
      degree: "검색엔진 엔지니어링 과정",
      school: "검색 기술 전문 교육기관",
      period: "2021.03 - 2021.08",
      status: "수료",
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
          <p>제 학력과 자격증을 확인해보세요</p>
        </div>

        <div className="education-content">
          <div className="education-section">
            <h3>학력</h3>
            <div className="education-timeline">
              {education.map((edu, index) => (
                <div key={edu.id} className="education-item">
                  <div className="education-header">
                    <div className="degree-status-row">
                      <h4>{edu.degree}</h4>
                      <span className="status">{edu.status}</span>
                    </div>
                    <h5>{edu.school}</h5>
                    <span className="period">{edu.period}</span>
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
