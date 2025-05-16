import axios from 'axios';

export const getHospedagens = () => {
  return axios
    .get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
    .then(response => response.data.records)
    .catch(error => {
      console.error('Erro ao buscar hospedagens:', error.response?.data || error.message);
      throw error;
    });
};

export const getCaracteristicas = () => {
  return axios
    .get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
    .then(response => response.data.records)
    .catch(error => {
      console.error('Erro ao buscar características:', error.response?.data || error.message);
      throw error;
    });
};
