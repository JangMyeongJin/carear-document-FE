import api from '../../api';

// 프로젝트 검색 API
export const searchProjects = async (params) => {
  try {
    console.log('params : ', params);
    const response = await api.post('/search/query/project', params);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('프로젝트 검색 에러:', error);
    throw error;
  }
};

// 프로젝트 검색 API
export const searchAggregationProject = async (params) => {
  try {
    console.log('params : ', params);
    const response = await api.post('/search/aggregation/project', params);
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
    const response = await api.put('/put/project', projectData);
    return response.data;
  } catch (error) {
    console.error('프로젝트 추가 에러:', error);
    throw error;
  }
};

// 프로젝트 삭제 API
export const deleteProject = async (projectId) => {
  try {
    const params = {  
      id: projectId
    }
    
    const response = await api.delete('/delete/project', { params });
    return response.data;
  } catch (error) {
    console.error('프로젝트 삭제 에러:', error);
    throw error;
  }
}; 