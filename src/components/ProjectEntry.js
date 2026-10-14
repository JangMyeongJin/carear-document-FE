const splitItems = value => Array.isArray(value) ? value : String(value || "").split("|").map(item => item.trim()).filter(Boolean);

// Only our backend's exact highlight markers become markup; all source text is escaped.
export function Highlight({
  value = ""
}) {
  const parts = String(value).split(/(<span class=['"]highLight['"]>[^<]*<\/span>)/g);
  return parts.map((part, index) => /^<span class=['"]highLight['"]>/.test(part) ? <mark key={index}>{part.replace(/^<span class=['"]highLight['"]>/, "").replace(/<\/span>$/, "")}</mark> : part);
}
export default function ProjectEntry({
  project,
  number
}) {
  const field = name => <Highlight value={project[name] || ""} />;
  const month = value => String(value || "").replace(/^(\d{4})(\d{2})$/, "$1.$2");
  return <article className={project.important === "Y" ? "project-entry featured" : "project-entry"}>
    <div className="project-index"><span>{String(number).padStart(2, "0")}</span><span>{project.important === "Y" ? "SELECTED WORK" : "PROJECT"}</span></div>
    <div className="project-editorial">
      <p className="project-meta">{month(project.startDate)} — {month(project.endDate)}<span><Highlight value={splitItems(project.role).join("  /  ")} /></span></p>
      <h3>{field("title")}</h3>
      {project.description && <div className="project-deck"><h4>프로젝트 개요</h4><p>{field("description")}</p></div>}
      <details className="project-detail">
        <summary>프로젝트 읽기 <span aria-hidden="true">↗</span></summary>
        <div className="project-detail-body">
          {[["업무 내용", "body"], ["주요 성과", "features"]].map(([label, name]) => splitItems(project[name]).length > 0 && <div className="detail-section" key={name}><h4>{label}</h4><ul>{splitItems(project[name]).map((item, i) => <li key={i}><Highlight value={item} /></li>)}</ul></div>)}
          <div className="detail-section"><h4>사용 기술</h4><p className="project-stack"><Highlight value={(Array.isArray(project.stack) ? project.stack : String(project.stack || "").split(/(?:\s*\|\s*|\s+)(?![^<]*>)/).filter(Boolean)).join("  /  ")} /></p></div>
        </div>
      </details>
    </div>
  </article>;
}
