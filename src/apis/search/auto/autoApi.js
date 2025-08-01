import api from '../../api';

export const searchAuto = async (params) => {
    try {
      console.log('params : ', params);
      const response = await api.post('/search/auto', params);
      console.log(response.data);
  
      return response.data;
    } catch (error) {
      console.error('자동완성 검색 에러:', error);
      throw error;
    }
  };