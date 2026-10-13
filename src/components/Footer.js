import "./Footer.css";
export default function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-top"><a className="footer-brand" href="#hero">장명진<span>.</span></a><p>정확하고 빠른 검색 경험을 제공하는<br />검색엔진 엔지니어 및 검색 개발자입니다.</p><a className="text-link" href="#hero">위로 이동 ↑</a></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Jang Myeong Jin · MY Career</p><nav aria-label="하단 내비게이션"><a href="#experience">Experience</a><a href="#education">Education</a><a href="https://github.com/JangMyeongJin" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://web-developer1.tistory.com/" target="_blank" rel="noopener noreferrer">Blog ↗</a><a href="mailto:jean971013568@gmail.com">Email ↗</a></nav></div>
  </div></footer>;
}
