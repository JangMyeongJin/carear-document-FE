import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { searchProjects, createProject, updateProject, deleteProject } from '../apis/projectApi';

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    role: "",
    stack: "",
    body: "",
    features: ""
  });

  // 초기 프로젝트 데이터 로드
  useEffect(() => {
    const abortController = new AbortController();
    
    const loadProjects = async () => {
      try {
        const params = {
          query: '',
          startDate: '',
          endDate: ''
        };

        const data = await searchProjects(params, abortController.signal);
        setProjects(data.data.result);
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
      startDate: formData.startDate.split('-').join(''),
      endDate: formData.endDate.split('-').join(''),
      role: formData.role,
      stack: formData.stack,
      body: formData.body,
      features: formData.features
    };

    try {
      console.log('projectData : ', projectData);
        // 새 프로젝트 추가
        const newProject = await createProject(projectData);
        setProjects(prev => [...prev, newProject]);
        setIsAddingProject(false);

      // 폼 초기화
      setFormData({
        title: "",
        startDate: "",
        endDate: "",
        role: "",
        stack: "",
        body: "",
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
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      role: project.role,
      stack: Array.isArray(project.stack) ? project.stack.join(' ') : project.stack,
      body: Array.isArray(project.body) ? project.body.join(' | ') : project.body,
      features: Array.isArray(project.features) ? project.features.join(' | ') : project.features  // 파이프라인으로 구분
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
      startDate: "",
      endDate: "",
      role: "",
      stack: "",
      body: "",
      features: ""
    });
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
      
      // 기타 형식은 그대로 반환
      return dateString;
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
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

              <div className="form-row">
                <div className="form-group">
                  <label>시작일:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>종료일:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
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
                <label>기술 스택 (공백으로 구분):</label>
                <input
                  type="text"
                  name="stack"
                  value={formData.stack}
                  onChange={handleInputChange}
                  placeholder="Java Spring MySQL"
                  required
                />
              </div>

              <div className="form-group">
                <label>업무내용 (|로 구분)</label>
                <input
                  type="text"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  placeholder="업무내용1 | 업무내용2 | 업무내용3"
                  required
                />
              </div>

              <div className="form-group">
                <label>성과 (|로 구분)</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="성과1 | 성과2 | 성과3"
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
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 