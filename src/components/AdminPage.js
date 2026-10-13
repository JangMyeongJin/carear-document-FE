import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchProjects, createProject, deleteProject } from "../apis/search/project/projectApi";
import Pagination from "../sections/Pagination";
import "./AdminPage.css";
const emptyForm = {
  id: "",
  title: "",
  startDate: "",
  endDate: "",
  role: "",
  stack: "",
  description: "",
  body: "",
  features: "",
  important: "N"
};
const inputMonth = value => String(value || "").replace(/^(\d{4})(\d{2}).*$/, "$1-$2").slice(0, 7);
const fields = {
  title: "제목",
  startDate: "시작 월",
  endDate: "종료 월",
  role: "참여 역할",
  stack: "기술 스택 (공백으로 구분)",
  description: "프로젝트 개요",
  body: "업무 내용 (|로 구분)",
  features: "성과 (|로 구분)",
  important: "중요도"
};
const items = value => Array.isArray(value) ? value : String(value || "").split("|").map(item => item.trim()).filter(Boolean);
export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    totalPage: 0,
    totalCount: 0
  });
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);
  const [loadError, setLoadError] = useState("");
  const formHeading = useRef(null);
  const mounted = useRef(false);
  const operationLock = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (editing) formHeading.current?.focus();
  }, [editing]);
  const load = useCallback(async signal => {
    setLoading(true);
    setLoadError("");
    try {
      const response = await searchProjects({
        query: "",
        startDate: "",
        endDate: "",
        filter: "",
        page,
        size: 6
      }, {
        signal
      });
      if (signal.aborted) return;
      if (response.status !== "success" || !Array.isArray(response.data?.result)) throw new Error("목록 실패");
      setProjects(response.data.result);
      setPageInfo(response.data.page);
    } catch {
      if (!signal.aborted) setLoadError("프로젝트를 불러오지 못했습니다. 다시 시도해주세요.");
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, [page]);
  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load, retry]);
  const startEdit = project => {
    setForm({
      ...emptyForm,
      ...project,
      id: project.id || "",
      startDate: inputMonth(project.startDate),
      endDate: inputMonth(project.endDate),
      stack: Array.isArray(project.stack) ? project.stack.join(" ") : project.stack || "",
      body: items(project.body).join(" | "),
      features: items(project.features).join(" | "),
      description: project.description || "",
      important: project.important === "Y" ? "Y" : "N"
    });
    setEditing(true);
    setStatus(null);
  };
  const save = async event => {
    event.preventDefault();
    if (operationLock.current) return;
    if (form.startDate > form.endDate) {
      setStatus({
        error: true,
        message: "종료 월은 시작 월 이후로 선택해주세요."
      });
      return;
    }
    operationLock.current = true;
    setBusy(true);
    setStatus(null);
    const payload = Object.fromEntries(Object.keys(emptyForm).map(key => [key, form[key]]));
    payload.startDate = form.startDate.replace("-", "");
    payload.endDate = form.endDate.replace("-", "");
    if (!payload.id) delete payload.id;
    try {
      const response = await createProject(payload);
      if (response.status !== "success") throw new Error("저장 실패");
      if (!mounted.current) return;
      setStatus({
        error: false,
        message: "프로젝트를 저장했습니다."
      });
      setEditing(false);
      setForm(emptyForm);
      setRetry(value => value + 1);
    } catch {
      if (mounted.current) setStatus({
        error: true,
        message: "저장하지 못했습니다. 입력 내용을 유지했습니다. 다시 시도해주세요."
      });
    } finally {
      operationLock.current = false;
      if (mounted.current) setBusy(false);
    }
  };
  const remove = async id => {
    if (operationLock.current || !window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) return;
    operationLock.current = true;
    setBusy(true);
    setStatus(null);
    try {
      const response = await deleteProject(id);
      if (response.status !== "success") throw new Error("삭제 실패");
      if (!mounted.current) return;
      setStatus({
        error: false,
        message: "프로젝트를 삭제했습니다."
      });
      if (projects.length === 1 && page > 1) setPage(page - 1);else setRetry(value => value + 1);
    } catch {
      if (mounted.current) setStatus({
        error: true,
        message: "삭제하지 못했습니다. 프로젝트는 목록에 유지됩니다."
      });
    } finally {
      operationLock.current = false;
      if (mounted.current) setBusy(false);
    }
  };
  return <div className="admin-page"><div className="container">
    <Link to="/" className="text-link">← 포트폴리오로 돌아가기</Link>
    <header className="admin-header"><div><p className="eyebrow">WORKSPACE / PROJECTS</p><h1>프로젝트 관리.</h1></div><button className="btn btn-primary" disabled={busy} onClick={() => {
          setForm(emptyForm);
          setEditing(true);
          setStatus(null);
        }}>새 프로젝트 +</button></header>
    <p role="status" className="admin-note">목록·등록·수정·삭제 / 프로젝트 정보를 관리합니다.</p>
    {status && <p role={status.error ? "alert" : "status"} className={status.error ? "status-message error" : "status-message"}>{status.message}</p>}
    {editing && <section className="admin-form-section"><h2 ref={formHeading} tabIndex="-1">{form.id ? "프로젝트 수정" : "새 프로젝트"}</h2><form className="admin-form" onSubmit={save} aria-busy={busy}>
      {Object.entries(fields).map(([key, label]) => <div className={"form-group " + (["description", "body", "features"].includes(key) ? "full-width" : "")} key={key}><label htmlFor={"admin-" + key}>{label}</label>{key === "important" ? <select id={"admin-" + key} value={form[key]} disabled={busy} onChange={event => setForm({
              ...form,
              [key]: event.target.value
            })}><option value="N">보통</option><option value="Y">중요</option></select> : ["description", "body", "features"].includes(key) ? <textarea id={"admin-" + key} rows="3" required={key === "body"} value={form[key]} disabled={busy} onChange={event => setForm({
              ...form,
              [key]: event.target.value
            })} /> : <input id={"admin-" + key} type={key.includes("Date") ? "month" : "text"} required value={form[key]} disabled={busy} onChange={event => setForm({
              ...form,
              [key]: event.target.value
            })} />}</div>)}
      <div className="admin-form-actions full-width"><button className="btn btn-primary" disabled={busy} type="submit">{busy ? "처리 중…" : "프로젝트 저장 ↗"}</button><button className="btn" disabled={busy} type="button" onClick={() => {
              setEditing(false);
              setForm(emptyForm);
            }}>취소</button></div>
    </form></section>}
    <section className="admin-projects" aria-busy={loading}><div className="admin-list-heading"><h2>프로젝트 목록</h2><span>{pageInfo.totalCount || 0}개</span></div>
      {loadError ? <div role="alert" className="status-message error">{loadError} <button className="btn" onClick={() => setRetry(value => value + 1)}>다시 시도</button></div> : loading ? <p role="status" className="status-message">목록을 불러오는 중…</p> : projects.length ? projects.map(project => <article className="admin-project" key={project.id}><div><p className="eyebrow">{project.important === "Y" ? "SELECTED" : "PROJECT"} · {inputMonth(project.startDate)} — {inputMonth(project.endDate)}</p><h3>{project.title}</h3><p className="admin-role">{project.role}</p><details><summary>내용 살펴보기</summary>{[["개요", "description"], ["업무 내용", "body"], ["주요 성과", "features"]].map(([label, key]) => items(project[key]).length > 0 && <div key={key}><h4>{label}</h4><ul>{items(project[key]).map((item, i) => <li key={i}>{item}</li>)}</ul></div>)}<p>{Array.isArray(project.stack) ? project.stack.join(" · ") : project.stack}</p></details></div><div className="admin-actions"><button className="btn" disabled={busy} aria-label={project.title + " 수정"} onClick={() => startEdit(project)}>수정</button><button className="btn" disabled={busy} aria-label={project.title + " 삭제"} onClick={() => remove(project.id)}>삭제</button></div></article>) : <p className="status-message">등록된 프로젝트가 없습니다.</p>}
      {!loadError && <Pagination pageInfo={pageInfo} disabled={loading || busy} onPageChange={setPage} />}
    </section>
  </div></div>;
}
