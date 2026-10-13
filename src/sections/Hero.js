import "./Hero.css";
export default function Hero() {
  return <section className="hero" id="hero"><div className="container">
    <div className="hero-kicker"><span>장명진 · 검색엔진 엔지니어 & 검색 개발자</span><span>INDEPENDENT PERSPECTIVE / 01</span></div>
    <h1><span className="hero-emphasis">검색 경험</span>을 설계하고,<br /><span className="hero-emphasis">데이터</span>를 연결합니다.</h1>
    <div className="hero-bottom"><div className="hero-intro"><p className="editorial-serif">Search & Data Pipeline</p><p>검색 서비스와 데이터 색인 파이프라인을 구축하는<br className="desktop-break" /> 검색 엔지니어 겸 백엔드 개발자 장명진입니다.</p><div className="hero-links"><a className="btn btn-primary" href="#projects">프로젝트 보기 <span aria-hidden="true">↗</span></a><a className="text-link" href="#contact">연락하기 <span aria-hidden="true">↗</span></a></div></div>
      <figure className="hero-portrait">
        <img src={process.env.PUBLIC_URL + "/장명진.png"} alt="검색엔진 엔지니어 장명진" width="240" height="280" fetchPriority="high" />
        <figcaption>JANG MYEONG JIN<br />SEARCH & BACKEND DEVELOPER</figcaption>
      </figure>
    </div>
    <div className="hero-footer"><span>Elasticsearch · OpenSearch · Data pipeline</span><a href="#projects">경험을 살펴보세요 <span aria-hidden="true">↓</span></a></div>
  </div></section>;
}
