import React, { useState, useEffect } from "react";
import "./Projects.css";
import { useProjectSearch } from '../apis/useProjectSearch';
import { searchProjects, searchAggregationProject } from '../apis/projectApi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [aggregation, setAggregation] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    startDate: "",
    endDate: "",
    role: "",
    technology: ""
  });

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
      
      // 기타 형식은 그대로 반환
      return dateString;
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  // 상세검색 필터링 로직
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // 기간 필터링
    let matchesDate = true;
    if (advancedFilters.startDate || advancedFilters.endDate) {
      const projectDates = formatPeriod(project.startDate, project.endDate);
      
      if (advancedFilters.startDate && projectDates.startDate < advancedFilters.startDate) {
        matchesDate = false;
      }
      if (advancedFilters.endDate && projectDates.endDate > advancedFilters.endDate) {
        matchesDate = false;
      }
    }
    
    const matchesRole = advancedFilters.role === "" || 
      project.role.toLowerCase().includes(advancedFilters.role.toLowerCase());
    
    const matchesTechnology = advancedFilters.technology === "" || 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(advancedFilters.technology.toLowerCase())
      );
    
    return matchesSearch && matchesDate && matchesRole && matchesTechnology;
  });

  const handleAdvancedFilterChange = (field, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      startDate: "",
      endDate: "",
      role: "",
      technology: ""
    });
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
          <input
            type="text"
            placeholder="프로젝트 제목, 설명, 역할, 기술 스택으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          {/* 상세검색 버튼 */}
          <button
            className="advanced-search-btn"
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          >
            {showAdvancedSearch ? "상세검색 닫기" : "상세검색"}
          </button>
        </div>

        {/* 상세검색 옵션들 */}
        {showAdvancedSearch && (
          <div className="advanced-search-options">
            <div className="advanced-search-row">
              <div className="advanced-search-item">
                <label>시작일:</label>
                <input
                  type="date"
                  value={advancedFilters.startDate}
                  onChange={(e) => handleAdvancedFilterChange('startDate', e.target.value)}
                />
              </div>
              
              <div className="advanced-search-item">
                <label>종료일:</label>
                <input
                  type="date"
                  value={advancedFilters.endDate}
                  onChange={(e) => handleAdvancedFilterChange('endDate', e.target.value)}
                />
              </div>
              
              <div className="advanced-search-item">
                <label>역할:</label>
                <input
                  type="text"
                  placeholder="예: 백엔드 개발, 검색엔진 개발"
                  value={advancedFilters.role}
                  onChange={(e) => handleAdvancedFilterChange('role', e.target.value)}
                />
              </div>
              
              <div className="advanced-search-item">
                <label>기술스택:</label>
                <input
                  type="text"
                  placeholder="예: Java, Elasticsearch, Python"
                  value={advancedFilters.technology}
                  onChange={(e) => handleAdvancedFilterChange('technology', e.target.value)}
                />
              </div>
            </div>
            
            <div className="advanced-search-actions">
              <button 
                className="clear-filters-btn"
                onClick={clearAdvancedFilters}
              >
                필터 초기화
              </button>
            </div>
          </div>
        )}

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
              <h3>검색된 프로젝트가 없습니다</h3>
              <p>다른 검색 조건을 시도해보세요.</p>
            </div>
          </div>
        )}

        {/* 검색 결과가 있을 때 프로젝트 그리드 표시 */}
        {projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-info">
                  <h3>{project.title}</h3>
                </div>
                <div className="project-details">
                  <div className="project-period">
                    {formatPeriod(project.startDate, project.endDate)}
                  </div>
                  <div className="project-role">{project.role}</div>
                </div>
                <div className="project-work-content">
                  <strong>업무내용</strong>
                  <ul>
                    {Array.isArray(project.body) ? 
                      project.body.map((content, index) => (
                        <li key={index}>{content}</li>
                      )) : 
                      project.body?.split('|')?.map((content, index) => (  // 파이프라인으로 구분
                        <li key={index}>{content.trim()}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className="project-features">
                  <strong>주요 성과</strong>
                  <ul>
                    {Array.isArray(project.features) ? 
                      project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      )) : 
                      project.features?.split('|')?.map((feature, index) => (  // 파이프라인으로 구분
                        <li key={index}>{feature.trim()}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className="project-technologies">
                  {Array.isArray(project.stack) ? 
                    project.stack.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    )) : 
                    project.stack?.split(' ')?.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
