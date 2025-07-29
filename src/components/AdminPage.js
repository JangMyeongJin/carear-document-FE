import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { useProjectSearch } from '../apis/useProjectSearch';
import { searchProjects, createProject, updateProject, deleteProject } from '../apis/projectApi';

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    period: "",
    role: "",
    technologies: "",
    features: ""
  });

  // 검색 관련 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 프로젝트 검색 훅 사용
  const { query, setQuery, results, loading: searchLoading, error: searchError, search } = useProjectSearch();

  // 초기 프로젝트 데이터 로드
  useEffect(() => {
    loadProjects();
  }, []);

  // 프로젝트 목록 로드
  const loadProjects = async () => {
    try {
        const params = {
            query: '',
            startDate: '',
            endDate: ''
        }

      const data = await searchProjects(params);
      setProjects(data.data.result);
    } catch (error) {
      console.error('프로젝트 로드 실패:', error);
      // 에러 시 기본 데이터 사용
      const initialProjects = [
        {
          id: 1,
          title: "대용량 검색 플랫폼",
          description: "일일 100만 건 이상의 검색 요청을 처리하는 대용량 검색 플랫폼입니다. Elasticsearch 기반으로 구축되어 높은 성능과 확장성을 제공합니다.",
          period: "2023.03 - 2023.12",
          role: "백엔드 개발",
          stack: "Elasticsearch Java Kafka Redis Docker",
          features: ["대용량 검색 처리", "실시간 인덱싱", "검색 성능 최적화", "모니터링 대시보드"]
        },
        {
          id: 2,
          title: "자체 검색엔진 개발",
          description: "Lucene 기반의 자체 검색엔진을 개발하여 특정 도메인에 최적화된 검색 서비스를 제공합니다.",
          period: "2022.06 - 2023.02",
          role: "검색엔진 개발",
          stack: "Lucene Java Spring MySQL Maven",
          features: ["커스텀 랭킹 알고리즘", "도메인 특화 검색", "검색 품질 평가", "성능 튜닝"]
        }
      ];
      setProjects(initialProjects);
    }
  };

  // 프로젝트 검색
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
        console.log('검색 시작 : ',searchQuery);
      const data = await searchProjects(searchQuery);
      setSearchResults(data);
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectData = {
      title: formData.title,
      description: formData.description,
      period: formData.period,
      role: formData.role,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      features: formData.features.split(',').map(feature => feature.trim())
    };

    try {
      if (editingProject) {
        // 프로젝트 수정
        await updateProject(editingProject.id, projectData);
        setProjects(prev => 
          prev.map(project => 
            project.id === editingProject.id ? { ...project, ...projectData } : project
          )
        );
        setEditingProject(null);
      } else {
        // 새 프로젝트 추가
        const newProject = await createProject(projectData);
        setProjects(prev => [...prev, newProject]);
        setIsAddingProject(false);
      }

      // 폼 초기화
      setFormData({
        title: "",
        description: "",
        period: "",
        role: "",
        technologies: "",
        features: ""
      });
    } catch (error) {
      console.error('프로젝트 저장 실패:', error);
      alert('프로젝트 저장에 실패했습니다.');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      period: project.period,
      role: project.role,
      technologies: project.technologies.join(', '),
      features: project.features.join(', ')
    });
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      try {
        await deleteProject(projectId);
        setProjects(prev => prev.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('프로젝트 삭제 실패:', error);
        alert('프로젝트 삭제에 실패했습니다.');
      }
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsAddingProject(false);
    setFormData({
      title: "",
      description: "",
      period: "",
      role: "",
      technologies: "",
      features: ""
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <h1>프로젝트 관리</h1>
          <button 
            className="add-project-btn"
            onClick={() => setIsAddingProject(true)}
          >
            새 프로젝트 추가
          </button>
        </header>

        {/* 검색 섹션 */}
        <div className="search-section">
          <h2>프로젝트 검색</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="프로젝트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="search-btn"
            >
              {isSearching ? '검색 중...' : '검색'}
            </button>
          </div>
          
          {/* 검색 결과 */}
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>검색 결과</h3>
              <div className="projects-grid">
                {searchResults.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-info">
                      <h3>{project.title}</h3>
                    </div>
                    <div className="project-details">
                      <div className="project-period">{project.period}</div>
                      <div className="project-role">{project.role}</div>
                    </div>
                    <p>{project.description}</p>
                    <div className="project-technologies">
                      {project.technologies?.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 프로젝트 추가/수정 폼 */}
        {(isAddingProject || editingProject) && (
          <div className="project-form-container">
            <h2>{editingProject ? '프로젝트 수정' : '새 프로젝트 추가'}</h2>
            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-group">
                <label>제목:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>설명:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>기간:</label>
                <input
                  type="text"
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  placeholder="2023.03 - 2023.12"
                  required
                />
              </div>

              <div className="form-group">
                <label>참여역할:</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="백엔드 개발"
                  required
                />
              </div>

              <div className="form-group">
                <label>기술 스택 (쉼표로 구분):</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="Java, Spring, MySQL"
                  required
                />
              </div>

              <div className="form-group">
                <label>주요 기능 (쉼표로 구분):</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="기능1, 기능2, 기능3"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingProject ? '수정' : '추가'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  취소
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 프로젝트 목록 */}
        <div className="projects-list">
          <h2>프로젝트 목록</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-buttons">
                  <div className="project-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(project)}
                    >
                      수정
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(project.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                </div>
                <div className="project-details">
                  <div className="project-period">{project.period}</div>
                  <div className="project-role">{project.role}</div>
                </div>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.stack.split(' ')?.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-features">
                  <strong>주요 기능:</strong>
                  <ul>
                    {project.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 