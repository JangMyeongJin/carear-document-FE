import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제 폼 제출 로직을 여기에 구현
    setTimeout(() => {
      alert("메시지가 성공적으로 전송되었습니다!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "이메일",
      value: "search.engineer@example.com",
      link: "mailto:search.engineer@example.com",
    },
    {
      icon: "📱",
      title: "전화번호",
      value: "+82 10-1234-5678",
      link: "tel:+821012345678",
    },
    {
      icon: "📍",
      title: "위치",
      value: "서울특별시, 대한민국",
      link: null,
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/search-engineer",
      link: "https://linkedin.com/in/search-engineer",
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact Me</h2>
          <p>검색엔진 프로젝트나 기술 협업에 대해 이야기해보세요</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>연락처 정보</h3>
            <p>
              검색엔진 구축, 성능 최적화, 검색 알고리즘 개발 등 검색 관련
              프로젝트 문의나 기술 협업 제안을 환영합니다!
            </p>

            <div className="contact-items">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h4>소셜 미디어</h4>
              <div className="social-icons">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <span>🐙</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <span>💼</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <span>🐦</span>
                </a>
                <a
                  href="https://medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <span>📝</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>메시지 보내기</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">이름 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">제목 *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">메시지 *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="검색엔진 관련 프로젝트나 협업에 대해 메시지를 남겨주세요"
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "전송 중..." : "메시지 보내기"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
