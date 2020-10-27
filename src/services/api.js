import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

export const validateUser = async (id) => {
  try {
    const { data } = await axios.post(`${REACT_APP_SERVER_URL}/validate-user`, { id });
    if (!data) {
      throw new Error('Sin respuesta');
    }

    if (!data.success) {
      throw new Error(`Error: ${data.error}`);
    }

    return { data: data.data };
  }
  catch (ex) {
    return { error: ex.message };
  }
}
