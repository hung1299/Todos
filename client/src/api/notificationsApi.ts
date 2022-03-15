import axiosClient from './axiosClient';

const notificationApi = {
  getAll: (userId: string) => {
    return axiosClient.get(`/users/${userId}/notifications`);
  },
  add: (
    userId: string,
    notification: {
      content: string;
      sender: string;
      seen: boolean;
    }
  ) => {
    return axiosClient.post(`/users/${userId}/notifications`, notification);
  },
  changeSeen: (
    userId: string,
    notification: {
      content: string;
      sender: string;
      seen: boolean;
      id: string;
      userId?: string;
    }
  ) => {
    return axiosClient.put(
      `/users/${userId}/notifications/${notification.id}`,
      notification
    );
  },
};

export default notificationApi;
