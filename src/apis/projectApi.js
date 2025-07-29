import api from './api';

// 프로젝트 검색 API
export const searchProjects = async (params) => {
  try {
    const response = await api.post('/search/query/project', { params });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('프로젝트 검색 에러:', error);
    throw error;
  }
};

// 프로젝트 추가 API
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('프로젝트 추가 에러:', error);
    throw error;
  }
};

// 프로젝트 수정 API
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error('프로젝트 수정 에러:', error);
    throw error;
  }
};

// 프로젝트 삭제 API
export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 삭제 에러:', error);
    throw error;
  }
}; 