import api from '../api';

export const sendMail = async (params) => {
    try {
      console.log('params : ', params);
      const response = await api.post('/mail/send', params);
      console.log(response.data);
  
      return response.data; 
    } catch (error) {
      console.error('메일 전송 에러:', error);
      throw error;
    }
};