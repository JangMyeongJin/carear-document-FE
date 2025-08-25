import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import { searchProjects, searchAggregationProject } from '../apis/search/project/projectApi';
import { searchAuto } from '../apis/search/auto/autoApi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [aggregation, setAggregation] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 날짜 검색 관련 상태 추가
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  // 기술 스택 필터 온오프 상태 추가
  const [showStackFilter, setShowStackFilter] = useState(false);
  
  // 정렬 관련 상태 추가
  const [sortBy, setSortBy] = useState("startDate"); // "date" 또는 "title"
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" 또는 "desc"
  
  // 자동완성 관련 상태 추가
  const [autoResult, setAutoResult] = useState([]);
  const [showAutoResult, setShowAutoResult] = useState(false);
  const [selectedAutoIndex, setSelectedAutoIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const autoResultRef = useRef(null);

  // 페이징 관련 정보 추가
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 0,
    totalPage: 0,
    totalCount: 0
  });

  const loadProjects = async (page = 1) => {
    try {
      const params = {
        query: '',
        startDate: '',
        endDate: '',
        sort: sortBy + '/' + sortOrder,
        page: page,
        size: 6
      };

      const project = await searchProjects(params);
      setProjects(project.data.result);
      setPageInfo(project.data.page);

    } catch (error) {
      if (error.name === 'AbortError') {
        return; // 중단된 요청은 무시
      }
      console.error('프로젝트 로드 실패:', error);
      // 에러 시 기본 데이터 사용
      const initialProjects = [
        {
          id: 1,
          title: "대용량 검색 플랫폼",
          body: "일일 100만 건 이상의 검색 요청을 처리하는 대용량 검색 플랫폼입니다. Elasticsearch 기반으로 구축되어 높은 성능과 확장성을 제공합니다.",
          startDate: "20230301",  // YYYYMMDD 형식
          endDate: "20231231",    // YYYYMMDD 형식
          role: "백엔드 개발",
          stack: "Elasticsearch Java Kafka Redis Docker",
          features: "대용량 검색 처리|실시간 인덱싱|검색 성능 최적화|모니터링 대시보드"
        },
        {
          id: 2,
          title: "자체 검색엔진 개발",
          body: "Lucene 기반의 자체 검색엔진을 개발하여 특정 도메인에 최적화된 검색 서비스를 제공합니다.",
          startDate: "20220601",  // YYYYMMDD 형식
          endDate: "20230228",    // YYYYMMDD 형식
          role: "검색엔진 개발",
          stack: "Lucene Java Spring MySQL Maven",
          features: "커스텀 랭킹 알고리즘|도메인 특화 검색|검색 품질 평가|성능 튜닝"
        }
      ];
      setProjects(initialProjects);
    }
  };

  const loadAggregation = async () => {
    try {
      const params = {
        query: '',
        startDate: '',
        endDate: '',
        aggrField: 'stack',
        sort: sortBy + '/' + sortOrder,
        page: 1,
        size: 30
      };
  
      const aggregation = await searchAggregationProject(params);
      setAggregation(aggregation.data.result);
    } catch (error) {
      console.error('기술 스택 통계 실패:', error);
    }
  }

  // 초기 프로젝트 데이터 로드
  useEffect(() => {
    const abortController = new AbortController();

    loadProjects(1);
    loadAggregation();

    return () => {
      abortController.abort(); // 컴포넌트 언마운트 시 요청 중단
    };
  }, []);

  // 자동완성 제안 생성 함수
  const generateSuggestions = async (input) => {
    if (!input.trim()) {
      setAutoResult([]);
      return;
    }

    const inputLower = input.toLowerCase();

    const params = {
      query: inputLower,
      size: 5,
      page: 1
    }

    const auto = await searchAuto(params);
    const result = auto.data.result;

    const allAutoResult = [];

    let index = 0;
    result.forEach(result => {
      allAutoResult.push({
        word: result.word,
        index: index
      });
      index++;
    });

    console.log(allAutoResult);

    setAutoResult(allAutoResult);
  };

  // 검색어 변경 시 자동완성 제안 업데이트
  useEffect(() => {
    generateSuggestions(searchTerm);
  }, [searchTerm, projects]);

  // 자동완성 제안 선택 처리
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowAutoResult(false);
    setSelectedAutoIndex(-1);
  };

  // 검색 실행 함수 수정
  const handleSearch = async () => {
    try {
      const params = {
        query: searchTerm,
        startDate: startDate,
        endDate: endDate,
        aggrField: 'stack',
        sort: sortBy + '/' + sortOrder,
        page: 1,
        size: 6
      };

      const project = await searchProjects(params);
      setProjects(project.data.result);
      setPageInfo(project.data.page);

      setActiveFilter("all"); // 검색 시 필터 초기화
    } catch (error) {
      console.error('프로젝트 검색 실패:', error);
    }
  };

  // Enter 키로 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
      setShowAutoResult(false);
      setSelectedAutoIndex(-1);
      return;
    }

    if (!showAutoResult) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedAutoIndex(prev => 
          prev < autoResult.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedAutoIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Escape':
        setShowAutoResult(false);
        setSelectedAutoIndex(-1);
        break;
    }
  };

  // 검색 입력 변경 처리
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowAutoResult(value.length > 0);
    setSelectedAutoIndex(-1);
  };

  // 외부 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target) &&
          autoResultRef.current && !autoResultRef.current.contains(event.target)) {
        setShowAutoResult(false);
        setSelectedAutoIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 날짜 필터 초기화 함수
  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  // 정렬 변경 함수
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // 같은 정렬 기준이면 순서만 변경
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // 다른 정렬 기준이면 기본값으로 설정
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
    // 정렬 변경 시 자동으로 검색 실행
    setTimeout(() => handleSearch(), 0);
  };

  // period를 startDate와 endDate로 변환하는 함수
  const formatPeriod = (startDate, endDate) => {
    
    if (!startDate || !endDate) return '';
    
    const formatDate = (dateString) => {
      // YYYYMMDD 형식 처리
      if (typeof dateString === 'string' && dateString.length === 8) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${year}.${month}.${day}`;
      }
      
      // ISO 형식 처리 (YYYY-MM-DD)
      if (typeof dateString === 'string' && dateString.includes('-')) {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
      }
      
      // Date 객체 처리
      if (dateString instanceof Date) {
        return `${dateString.getFullYear()}.${String(dateString.getMonth() + 1).padStart(2, '0')}`;
      }
      
      return dateString;
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    
    return `${formattedStartDate} ~ ${formattedEndDate}`;
  };

  const stackSearch = async (stack) => {
    try {
      let query = stack;

      if(stack === "all") {
        query = '';
      }

      const params = {
        query: query,
        startDate: startDate,
        endDate: endDate,
        aggrField: 'stack',
        sort: sortBy + '/' + sortOrder,
        page: 1,
        size: 6
      };

      const project = await searchProjects(params);
      setProjects(project.data.result);
      setPageInfo(project.data.page);

    } catch (error) {
      console.error('프로젝트 검색 실패:', error);
    }
    setActiveFilter(stack);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    loadProjects(newPage);
  };

  // 페이지네이션 컴포넌트
  const Pagination = () => {
    const { page, totalPage } = pageInfo;
    
    if (totalPage <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage, endPage;
    
    // 현재 페이지가 앞쪽에 있을 때 (1~3페이지)
    if (page <= 3) {
      startPage = 1;
      endPage = Math.min(maxVisiblePages, totalPage);
    }
    // 현재 페이지가 뒤쪽에 있을 때
    else if (page >= totalPage - 2) {
      startPage = Math.max(1, totalPage - maxVisiblePages + 1);
      endPage = totalPage;
    }
    // 현재 페이지가 중간에 있을 때
    else {
      startPage = page - 2;
      endPage = page + 2;
    }

    // 맨 처음 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 1일 때)
    pages.push(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        className={`page-btn ${page === 1 ? 'disabled' : ''}`}
        disabled={page === 1}
        title="맨 처음"
      >
        처음
      </button>
    );

    // 이전 페이지 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 1일 때)
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        className={`page-btn ${page === 1 ? 'disabled' : ''}`}
        disabled={page === 1}
      >
        이전
      </button>
    );

    // 현재 페이지가 4 이상이고 totalPage가 5 이상일 때 앞에 "..." 추가
    if (page >= 4 && totalPage >= 5) {
      pages.push(
        <span key="dots" className="page-dots">
          ...
        </span>
      );
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-btn ${i === page ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // 현재 페이지가 totalPage-3 이하이고 totalPage가 5 이상일 때 뒤에 "..." 추가
    if (page <= totalPage - 3 && totalPage >= 5) {
      pages.push(
        <span key="dots" className="page-dots">
          ...
        </span>
      );
    }

    // 다음 페이지 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 마지막 페이지일 때)
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        className={`page-btn ${page === totalPage ? 'disabled' : ''}`}
        disabled={page === totalPage}
      >
        다음
      </button>
    );

    // 맨 끝 버튼 (항상 표시, 비활성화 조건: 현재 페이지가 마지막 페이지일 때)
    pages.push(
      <button
        key="last"
        onClick={() => handlePageChange(totalPage)}
        className={`page-btn ${page === totalPage ? 'disabled' : ''}`}
        disabled={page === totalPage}
        title="맨 끝"
      >
        끝
      </button>
    );

    return (
      <div className="pagination">
        {pages}
      </div>
    );
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
          <p>제가 참여한 프로젝트들을 검색하고 확인해보세요</p>
        </div>

        <div className="project-search">
          <div className="search-input-container" ref={searchInputRef}>
            <input
              type="text"
              placeholder="프로젝트 제목, 설명, 역할, 기술 스택으로 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowAutoResult(searchTerm.length > 0)}
              className="search-input"
            />
            
            {/* 검색 버튼 */}
            <button
              className="search-btn"
              onClick={handleSearch}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* 자동완성 */}
            {showAutoResult && autoResult.length > 0 && (
              <div className="search-suggestions" ref={autoResultRef}>
                {autoResult.map((result, index) => (
                  <div
                    key={`${result.word}-${index}`}
                    className={`suggestion-item ${index === selectedAutoIndex ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(result.word)}
                  >
                    <span className="suggestion-text">{result.word}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 검색 버튼들을 한 줄에 배치 */}
          <div className="search-buttons">
            {/* 날짜 필터 토글 버튼 */}
            <div className="tooltip-container">
              <button
                className="date-filter-toggle"
                onClick={() => setShowDateFilter(!showDateFilter)}
              >
                날짜 검색
              </button>
              <div className="tooltip">
                클릭하면 날짜 검색 창이 나타납니다.
              </div>
            </div>

            {/* 기술 스택 필터 토글 버튼 */}
            <div className="tooltip-container">
              <button
                className="stack-filter-toggle"
                onClick={() => setShowStackFilter(!showStackFilter)}
              >
                기술 스택 검색
              </button>
              <div className="tooltip">
                클릭하면 기술 스택 검색 창이 나타납니다.
              </div>
            </div>
          </div>
        </div>

        {/* 날짜 필터 옵션 */}
        {showDateFilter && (
          <div className="date-filter-options">
            <div className="date-input-group">
              <div className="date-input-item">
                <label>시작 날짜</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="date-input-item">
                <label>종료 날짜</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            <div className="date-filter-actions">
              <button
                className="clear-date-btn"
                onClick={clearDateFilter}
              >
                날짜 초기화
              </button>
              <button
                className="apply-date-btn"
                onClick={handleSearch}
              >
                적용
              </button>
            </div>
          </div>
        )}

        {/* 기술 스택 필터 옵션 */}
        {showStackFilter && (
          <div className="stack-filter-options">
            <div className="project-filters">
              <button
                className={`filter-btn ${
                  activeFilter === "all" ? "active" : ""
                }`}
                onClick={() => stackSearch("all")}
              >
                기술 스택 전체
              </button>
              {aggregation.map((filter) => (
                <button
                  key={filter.key}
                  className={`filter-btn ${
                    activeFilter === filter.key ? "active" : ""
                  }`}
                  onClick={() => stackSearch(filter.key)}
                >
                  {filter.key} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 정렬 옵션 */}
        <div className="sort-options">
          <div className="sort-buttons">
            <button
              className={`sort-btn ${sortBy === "startDate" ? "active" : ""}`}
              onClick={() => handleSortChange("startDate")}
            >
              날짜순
              {sortBy === "startDate" && (
                <span className="sort-arrow">
                  {sortOrder === "desc" ? "↓" : "↑"}
                </span>
              )}
            </button>
            <button
              className={`sort-btn ${sortBy === "title" ? "active" : ""}`}
              onClick={() => handleSortChange("title")}
            >
              프로젝트명순
              {sortBy === "title" && (
                <span className="sort-arrow">
                  {sortOrder === "desc" ? "↓" : "↑"}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 검색 결과가 없을 때 메시지 표시 */}
        {projects.length === 0 && (
          <div className="no-results">
            <div className="no-results-content">
              <h3>검색 결과가 없습니다</h3>
              <p>다른 검색어를 입력하거나 필터를 변경해보세요.</p>
            </div>
          </div>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                </div>
                
                <div className="project-info">
                  <span className="project-period">
                    {formatPeriod(project.startDate, project.endDate)}
                  </span>
                  <span className="project-role">{project.role}</span>
                </div>
                
                <div className="project-work-content">
                  <strong>업무내용</strong>
                  <ul>
                    {
                      project.body?.split('|')?.map((content, index) => (  // 파이프라인으로 구분
                        <li key={index}>{content.trim()}</li>
                      ))
                    }
                  </ul>
                </div>
                
                {project.features && project.features.length > 0 && (
                  <div className="project-features">
                    <h4>주요 기능</h4>
                    <ul>
                      {project.features?.split('|')?.map((feature, index) => (  // 파이프라인으로 구분
                        <li key={index}>{feature.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.stack && project.stack.length > 0 && (
                  <div className="project-technologies">
                    {project.stack?.split(' ')?.map((tech, index) => (  // 공백으로 구분
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination 
            pageInfo={pageInfo} 
            onPageChange={handlePageChange} 
          />
      </div>
    </section>
  );
};

export default Projects;
