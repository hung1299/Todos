import axiosClient from './axiosClient';

const userApi = {
  getAllUser: () => {
    return axiosClient.get('/users');
  },
};

export default userApi;
