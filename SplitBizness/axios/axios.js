import axios from 'axios';

const axiosRegister = async (email, password, username, first_name, last_name, phone) => {
  const token = await getTokenAdmin();

  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  const jsonCreateAccount = JSON.stringify({
    email,
    password,
    username,
    first_name,
    last_name,
    phone,
    is_pro: true,
  });
  try {
    const res = await axios.post(
      'http://127.0.0.1:8080/api/users/',
      jsonCreateAccount,
      config,
    );
    console.log(res.status);
    return getToken(username,password);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getToken = async (username, password) => {
    const json = JSON.stringify({
        username,
        password,
      });
      try {
        const res = await axios.post('http://localhost:8080/api/login', json);
        console.log(`Login : ${res.status}`);
        console.log()
        if (!res.data.data.user.is_pro) {
            throw new Error("This user is not a Pro")
        }
        return res.data.data.token;
      } catch (error) {
        console.log(error);
        return null;
      }
}

const getTokenAdmin = async () => {
  const json = JSON.stringify({
    username: 'llecointe.thibault@gmail.com',
    password: 'cacacaca',
  });
  try {
    const res = await axios.post('http://localhost:8080/api/login', json);
    console.log(res.status);
    console.log(res.data.data.token);
    return res.data.data.token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {axiosRegister, getToken};
