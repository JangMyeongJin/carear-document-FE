import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import { useProjectSearch } from '../apis/search/project/useProjectSearch';
import { searchProjects, searchAggregationProject } from '../apis/search/project/projectApi';
import { searchAuto } from '../apis/search/auto/autoApi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [aggregation, setAggregation] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 자동완성 관련 상태 추가
  const [autoResult, setAutoResult] = useState([]);
  const [showAutoResult, setShowAutoResult] = useState(false);
  const [selectedAutoIndex, setSelectedAutoIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const autoResultRef = useRef(null);

  // 프로젝트 검색 훅 사용
  const { query, setQuery, results, loading: searchLoading, error: searchError, search } = useProjectSearch();

  // 초기 프로젝트 데이터 로드
  useEffect(() => {
    const abortController = new AbortController();
    
    const loadProjects = async () => {
      try {
        const params = {
          query: '',
          startDate: '',
          endDate: '',
          aggrField: 'stack'
        };

        const project = await searchProjects(params);
        setProjects(project.data.result);

        const aggregation = await searchAggregationProject(params);
        setAggregation(aggregation.data.result);
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
            stack: ["Elasticsearch", "Java", "Kafka", "Redis", "Docker"],
            features: ["대용량 검색 처리", "실시간 인덱싱", "검색 성능 최적화", "모니터링 대시보드"]
          },
          {
            id: 2,
            title: "자체 검색엔진 개발",
            body: "Lucene 기반의 자체 검색엔진을 개발하여 특정 도메인에 최적화된 검색 서비스를 제공합니다.",
            startDate: "20220601",  // YYYYMMDD 형식
            endDate: "20230228",    // YYYYMMDD 형식
            role: "검색엔진 개발",
            stack: ["Lucene", "Java", "Spring", "MySQL", "Maven"],
            features: ["커스텀 랭킹 알고리즘", "도메인 특화 검색", "검색 품질 평가", "성능 튜닝"]
          }
        ];
        setProjects(initialProjects);
      }
    };

    loadProjects();

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

  // 검색 실행 함수 추가
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const params = {
        query: searchTerm,
        startDate: '',
        endDate: '',
        aggrField: 'stack'
      };

      const project = await searchProjects(params);
      setProjects(project.data.result);

      const aggregation = await searchAggregationProject(params);
      setAggregation(aggregation.data.result);
      
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
        startDate: '',
        endDate: '',
        aggrField: 'stack'
      };

      const project = await searchProjects(params);
      setProjects(project.data.result);

      const aggregation = await searchAggregationProject(params);
      setAggregation(aggregation.data.result);
    } catch (error) {
      console.error('프로젝트 검색 실패:', error);
    }
    setActiveFilter(stack);
  }

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
          <p>제가 참여한 프로젝트들을 확인해보세요</p>
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
        </div>

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
      </div>
    </section>
  );
};

export default Projects;
