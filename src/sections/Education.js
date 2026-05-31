import React from "react";
import "./Education.css";

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "동국대학교",
      school: "빅데이터분석기반 지능소프트웨어 전문 인재양성과정",
      period: "2021.04 - 2021.10",
      status: "수료",
    },
    {
      id: 2,
      degree: "경민대학교",
      school: "디지털콘텐츠학과",
      period: "2016.03 - 2022.02",
      status: "졸업",
    },
    {
      id: 3,
      degree: "경민IT고등학교",
      school: "디지털미디어학과",
      period: "2013.03 - 2016.02",
      status: "졸업",
    },
  ];

  return (
    <section className="education" id="education">
      <div className="container">
        <div className="section-header">
          <h2>Education</h2>
          <p>제 학력을 확인해보세요</p>
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
        </div>
      </div>
    </section>
  );
};

export default Education;
