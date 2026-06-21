import React, { useState } from "react";
import "./Contact.css";
import { sendMail } from "../apis/mail/mailApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 빈 값 검증
    const emptyFields = [];

    if (!formData.name.trim()) {
      emptyFields.push("이름");
    }
    if (!formData.email.trim()) {
      emptyFields.push("이메일");
    }
    if (!formData.title.trim()) {
      emptyFields.push("제목");
    }
    if (!formData.content.trim()) {
      emptyFields.push("메시지");
    }

    // 빈 값이 있으면 알림 표시
    if (emptyFields.length > 0) {
      alert(`다음 필드를 입력해주세요: ${emptyFields.join(", ")}`);
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 실제 폼 제출 로직을 여기에 구현
    setTimeout(async () => {
      const response = await sendMail(formData);

      if (response.status === "success") {
        alert("메일이 성공적으로 전송되었습니다!");
      } else {
        alert("메일 전송에 실패했습니다.");
      }

      setFormData({ name: "", email: "", title: "", content: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "이메일",
      value: "jean971013568@gmail.com",
      link: "mailto:jean971013568@gmail.com",
    },
    {
      icon: "🐙",
      title: "Github",
      value: "https://github.com/JangMyeongJin",
      link: "https://github.com/JangMyeongJin",
    },
    {
      icon: "🌐",
      title: "Blog",
      value: "https://web-developer1.tistory.com/",
      link: "https://web-developer1.tistory.com/",
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
            <h3>소셜 미디어</h3>
            <p>검색 관련 프로젝트 문의나 기술 협업 제안을 환영합니다!</p>

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
          </div>

          <div className="contact-form">
            <h3>메일 보내기</h3>
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
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">내용 *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="검색엔진 관련 프로젝트나 협업에 대해 메일을 남겨주세요"
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "전송 중..." : "메일 보내기"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
