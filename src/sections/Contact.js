import { useState } from "react";
import { sendMail } from "../apis/mail/mailApi";
import SectionHeading from "../components/SectionHeading";
import "./Contact.css";
const emptyForm = {
  name: "",
  email: "",
  title: "",
  content: ""
};
export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const submit = async event => {
    event.preventDefault();
    if (submitting) return;
    const nextErrors = {};
    Object.entries(form).forEach(([field, value]) => {
      if (!value.trim()) nextErrors[field] = "내용을 입력해주세요.";
    });
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "올바른 이메일 주소를 입력해주세요.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById("contact-" + Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const response = await sendMail(form);
      if (response.status !== "success") throw new Error("전송 실패");
      setStatus({
        success: true,
        message: "메시지를 전송했습니다. 연락 주셔서 감사합니다."
      });
      setForm(emptyForm);
    } catch {
      setStatus({
        success: false,
        message: "메시지를 전송하지 못했습니다. 작성 내용은 보관되어 있습니다. 다시 시도하거나 이메일로 연락해주세요."
      });
    } finally {
      setSubmitting(false);
    }
  };
  return <section className="contact" id="contact"><div className="container">
    <SectionHeading number="04" title="Contact">협업 문의</SectionHeading>
    <div className="contact-content"><div className="contact-info"><p className="editorial-serif">Let's connect.</p><p>검색엔진 프로젝트나 기술 협업에 대해 이야기해보세요.<br />검색 관련 프로젝트 문의와 기술 협업 제안을 환영합니다.</p><div className="contact-links"><a href="mailto:jean971013568@gmail.com">jean971013568@gmail.com <span aria-hidden="true">↗</span></a><a href="https://github.com/JangMyeongJin" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="https://web-developer1.tistory.com/" target="_blank" rel="noopener noreferrer">Blog <span aria-hidden="true">↗</span></a></div></div>
    <form className="contact-form" onSubmit={submit} noValidate aria-busy={submitting}>
      <p className="form-caption">메일 보내기 / 모든 항목은 필수입니다.</p>
      {Object.entries({
            name: "이름",
            email: "이메일",
            title: "제목",
            content: "내용"
          }).map(([field, label]) => <div className="form-group" key={field}><label htmlFor={"contact-" + field}>{label}</label>{field === "content" ? <textarea id={"contact-" + field} name={field} rows="5" required value={form[field]} disabled={submitting} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? field + "-error" : undefined} onChange={event => setForm({
              ...form,
              [field]: event.target.value
            })} placeholder="프로젝트나 협업에 대해 남겨주세요." /> : <input id={"contact-" + field} name={field} type={field === "email" ? "email" : "text"} autoComplete={field === "name" ? "name" : field === "email" ? "email" : undefined} required value={form[field]} disabled={submitting} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? field + "-error" : undefined} onChange={event => setForm({
              ...form,
              [field]: event.target.value
            })} />}{errors[field] && <p className="field-error" id={field + "-error"}>{errors[field]}</p>}</div>)}
      <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? "전송 중…" : "메시지 보내기 ↗"}</button>
      {status && <p role={status.success ? "status" : "alert"} className={status.success ? "status-message" : "status-message error"}>{status.message}</p>}
    </form></div>
  </div></section>;
}
