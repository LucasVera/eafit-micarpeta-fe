import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

const validateResponse = (data) => {
  if (!data) {
    throw new Error('Sin respuesta del servidor');
  }

  if (!data.success) {
    throw new Error(`Error. ${data.error}`);
  }
}

export const validateUser = async (id) => {
  try {
    const { data } = await axios.post(`${REACT_APP_SERVER_URL}/user/validate`, { id });
    
    validateResponse(data);

    return { data: data.data };
  }
  catch (ex) {
    return { error: ex.message };
  }
}

export const login = async (nationalId, password) => {
  try {
    const { data } = await axios.post(`${REACT_APP_SERVER_URL}/user/login`, {
      nationalId, password
    });
  
    validateResponse(data);

    return { data: data.data };
  }
  catch (ex) {
    return { error: ex.message };
  }
}

export const registerUser = async (name, nationalId, email, password, address) => {
  try {
    const { data } = await axios.post(`${REACT_APP_SERVER_URL}/user/register`, {
      name,
      nationalId,
      email,
      password,
      address
    });

    validateResponse(data);

    return { data: data.data };
  }
  catch (ex) {
    return { error: ex.message };
  }
}

export const uploadFileToServer = async (file, user) => {
  try {
    const { data } = await axios.post(`${REACT_APP_SERVER_URL}/file/upload/${user.nationalId}`, file, {
      
    });

    validateResponse(data);

    return { data: data.data };
  }
  catch (ex) {
    return { error: ex.message };
  }
}
