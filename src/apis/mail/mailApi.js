import api from '../api';

export const sendMail = async (params) => {
    try {
      const response = await api.post('/mail/send', params);

      return response.data;
    } catch (error) {
      console.error('메일 전송 에러:', error);
      throw error;
    }
};
