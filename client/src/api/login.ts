import userApi from './userApi';

interface User {
  id: string;
  username: string;
  password: string;
}

const login = async (username: string, password: string) => {
  try {
    const { data } = await userApi.getAllUser();
    const user: User = data.find((u: User) => u.username === username);

    if (!user) throw Error('Wrong Username');

    if (user.password !== password) throw Error('WrongPassword');

    const userData = {
      username,
      id: user.id,
    };
    localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.log(error);
  }
};

export default login;
