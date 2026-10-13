import { useEffect, useState } from "react";
import { searchProjects, searchAggregationProject } from "../apis/search/project/projectApi";
import { searchAuto } from "../apis/search/auto/autoApi";
import SectionHeading from "../components/SectionHeading";
import ProjectEntry from "../components/ProjectEntry";
import Pagination from "./Pagination";
import "./Projects.css";
const initialCriteria = {
  query: "",
  startDate: "",
  endDate: "",
  filter: "",
  sort: "startDate/desc",
  page: 1,
  size: 6
};
const toMonth = value => value.replace("-", "");
export default function Projects() {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stack, setStack] = useState("");
  const [projects, setProjects] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    totalPage: 0,
    totalCount: 0
  });
  const [aggregation, setAggregation] = useState([]);
  const [aggregationError, setAggregationError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [retry, setRetry] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [autoError, setAutoError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError("");
    searchProjects(criteria, {
      signal: controller.signal
    }).then(response => {
      if (!active) return;
      if (response.status !== "success" || !Array.isArray(response.data?.result)) throw new Error("검색 실패");
      setProjects(response.data.result);
      setPageInfo(response.data.page);
    }).catch(() => {
      if (active) setError("프로젝트를 불러오지 못했습니다. 연결을 확인하고 다시 시도해주세요.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
      controller.abort();
    };
  }, [criteria, retry]);
  const {
    query: appliedQuery,
    startDate: appliedStart,
    endDate: appliedEnd,
    filter: appliedFilter
  } = criteria;
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setAggregation([]);
    setAggregationError("");
    searchAggregationProject({
      query: appliedQuery,
      startDate: appliedStart,
      endDate: appliedEnd,
      filter: appliedFilter,
      page: 1,
      size: 30,
      aggrField: "stack"
    }, {
      signal: controller.signal
    }).then(response => {
      if (!active) return;
      if (response.status !== "success" || !Array.isArray(response.data?.result)) throw new Error("집계 실패");
      setAggregation(response.data.result);
    }).catch(() => {
      if (active) setAggregationError("기술 스택 목록을 불러오지 못했습니다.");
    });
    return () => {
      active = false;
      controller.abort();
    };
  }, [appliedQuery, appliedStart, appliedEnd, appliedFilter, retry]);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setSuggestions([]);
    setSelected(-1);
    setAutoError("");
    if (!query.trim()) return () => controller.abort();
    const timer = setTimeout(() => {
      searchAuto({
        query: query.toLowerCase(),
        page: 1,
        size: 5
      }, {
        signal: controller.signal
      }).then(response => {
        if (!active) return;
        if (response.status !== "success") throw new Error("자동완성 실패");
        setSuggestions(response.data?.result || []);
      }).catch(() => {
        if (active) setAutoError("자동완성 연결을 확인할 수 없습니다. 직접 검색할 수 있습니다.");
      });
    }, 220);
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);
  const applySearch = (value = query) => {
    if (startDate && endDate && startDate > endDate) {
      setDateError("종료 월은 시작 월 이후로 선택해주세요.");
      return;
    }
    setDateError("");
    setStack("");
    setShowSuggestions(false);
    setCriteria(previous => ({
      ...previous,
      query: value.trim(),
      startDate: toMonth(startDate),
      endDate: toMonth(endDate),
      page: 1
    }));
  };
  const selectSuggestion = word => {
    setQuery(word);
    setShowSuggestions(false);
    setSelected(-1);
  };
  const reset = () => {
    setQuery("");
    setStartDate("");
    setEndDate("");
    setStack("");
    setDateError("");
    setShowSuggestions(false);
    setCriteria(previous => ({
      ...initialCriteria,
      filter: previous.filter
    }));
  };
  const handleKeys = event => {
    if (event.key === "Escape") {
      setShowSuggestions(false);
      setSelected(-1);
    }
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      setShowSuggestions(true);
      setSelected(index => Math.min(index + 1, suggestions.length - 1));
    }
    if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      setSelected(index => Math.max(index - 1, -1));
    }
    if (event.key === "Enter" && showSuggestions && selected >= 0 && suggestions[selected]) {
      event.preventDefault();
      const word = suggestions[selected].word;
      selectSuggestion(word);
      applySearch(word);
    }
  };
  return <section className="projects" id="projects"><div className="container">
    <SectionHeading number="01" title="Selected work">경험으로 이야기합니다.</SectionHeading>
    <div className="work-intro"><p>검색 서비스부터 데이터 파이프라인까지.<br />참여한 프로젝트의 역할과 구현 경험을 살펴보세요.</p><span className="editorial-serif">A collection of work.</span></div>
    <div className="work-toolbar">
      <fieldset className="project-scope"><legend className="sr-only">프로젝트 범위</legend>{[["Y", "대표 프로젝트"], ["", "전체 프로젝트"]].map(([value, label]) => <label key={label}><input type="radio" name="projectFilter" value={value} checked={criteria.filter === value} onChange={() => setCriteria(previous => ({
              ...previous,
              filter: value,
              page: 1
            }))} />{label}</label>)}</fieldset>
      <form className="project-search" onSubmit={event => {
          event.preventDefault();
          applySearch();
        }}>
        <label className="sr-only" htmlFor="project-query">프로젝트 검색</label>
        <div className="search-combobox" onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setShowSuggestions(false);
          }}>
          <input id="project-query" role="combobox" aria-autocomplete="list" aria-expanded={showSuggestions && suggestions.length > 0} aria-controls="project-suggestions" aria-activedescendant={showSuggestions && selected >= 0 ? "suggestion-" + selected : undefined} placeholder="제목, 역할, 기술로 검색" value={query} onChange={event => {
              setQuery(event.target.value);
              setShowSuggestions(true);
            }} onFocus={() => setShowSuggestions(true)} onKeyDown={handleKeys} autoComplete="off" />
          {showSuggestions && suggestions.length > 0 && <ul id="project-suggestions" role="listbox" aria-label="자동완성 제안" className="suggestions">{suggestions.map((item, index) => <li role="option" id={"suggestion-" + index} aria-selected={selected === index} key={item.word + index} onMouseDown={event => event.preventDefault()} onClick={() => selectSuggestion(item.word)}>{item.word}</li>)}</ul>}
        </div>
        <button type="submit" aria-label="프로젝트 검색 실행">검색 <span aria-hidden="true">↗</span></button>
      </form>
    </div>
    {autoError && <p className="filter-note" role="status">{autoError}</p>}
    <details className="search-options"><summary>기간 · 기술 스택으로 살펴보기</summary><div className="search-options-body">
      <form className="date-filter" onSubmit={event => {
            event.preventDefault();
            applySearch();
          }}><label htmlFor="project-start">시작 월<input id="project-start" type="month" value={startDate} onChange={event => setStartDate(event.target.value)} /></label><label htmlFor="project-end">종료 월<input id="project-end" type="month" value={endDate} onChange={event => setEndDate(event.target.value)} /></label><button className="btn" type="submit">기간 적용</button></form>
      {dateError && <p role="alert" className="status-message error">{dateError}</p>}
      <div className="stack-filters"><button aria-pressed={!stack} onClick={() => {
              setStack("");
              setCriteria(previous => ({
                ...previous,
                query: query.trim(),
                page: 1
              }));
            }}>기술 전체</button>{aggregation.map(item => <button key={item.key} aria-pressed={stack === item.key} onClick={() => {
              setStack(item.key);
              setCriteria(previous => ({
                ...previous,
                query: item.key,
                page: 1
              }));
            }}>{item.key} <span>{item.count}</span></button>)}</div>
      <p className="filter-note">기술 선택은 해당 기술명을 검색어로 사용합니다.</p>{aggregationError && <p role="status" className="filter-note">{aggregationError}</p>}
    </div></details>
    <div className="result-summary"><p aria-live="polite">{loading ? "프로젝트를 불러오는 중" : error ? "프로젝트 연결 확인 필요" : pageInfo.totalCount + "개의 프로젝트"}{criteria.query && " · " + criteria.query}{criteria.startDate && " · " + criteria.startDate + " 이후"}{criteria.endDate && " · " + criteria.endDate + " 이전"}</p><button onClick={reset} className="reset-link">검색 초기화 ↺</button></div>
    <div aria-busy={loading}>
      {error ? <div className="empty-state" role="alert"><h3>잠시 연결이 닿지 않았습니다.</h3><p>{error}</p><button className="btn" onClick={() => setRetry(value => value + 1)}>다시 시도</button></div> : loading ? <p className="status-message" role="status">경험을 불러오고 있습니다…</p> : projects.length ? <div className="project-list">{projects.map((project, index) => <ProjectEntry key={project.id} project={project} number={(criteria.page - 1) * criteria.size + index + 1} />)}</div> : <div className="empty-state"><h3>조건에 맞는 프로젝트가 없습니다.</h3><p>다른 검색어를 입력하거나 검색 조건을 초기화해주세요.</p><button className="text-link" onClick={reset}>조건 초기화</button></div>}
    </div>
    {!error && <Pagination pageInfo={pageInfo} disabled={loading} onPageChange={page => setCriteria(previous => ({
        ...previous,
        page
      }))} />}
  </div></section>;
}
