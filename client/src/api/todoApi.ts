import axiosClient from './axiosClient';

interface todoParam {
  title: string;
  completed: boolean;
}

const todoApi = {
  getAll: (userId: string) => {
    return axiosClient.get(`/users/${userId}/todos`);
  },
  add: (userId: string, todo: todoParam) => {
    return axiosClient.post(`/users/${userId}/todos`, todo);
  },
  delete: (userId: string, id: string) => {
    return axiosClient.delete(`/users/${userId}/todos/${id}`);
  },
  ChangeTodo: (userId: string, id: string, todo: todoParam) => {
    return axiosClient.put(`/users/${userId}/todos/${id}`, todo);
  },
};

export default todoApi;
