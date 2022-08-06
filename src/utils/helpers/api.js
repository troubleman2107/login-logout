import axios from '../plugins/axios'

export const register = async (data) => {
    try {
        return await axios.post('/signup', data);
    } catch (err) {
        throw err;
    }
};


export const login = async (data) => {
    try {
        return await axios.post('/signin', data);
    } catch (err) {
        throw err;
    }
};

export const logout = async (token) => {
    const config = {
        headers: {
          Authorization: token,
        }
      }
    try {
        return await axios.post('/logout', token, config);
    } catch (err) {
        throw err;
    }
};