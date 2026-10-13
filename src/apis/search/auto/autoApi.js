import api from '../../api';

export const searchAuto = async (params, options = {}) => {
    try {
      const response = await api.post('/search/auto', params, options);

      return response.data;
    } catch (error) {
      console.error('자동완성 검색 에러:', error);
      throw error;
    }
  };
