import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/';

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
      `${API_URL}api/users/`,
      jsonCreateAccount,
      config,
    );
    console.log(`GetTokenAdmin : ${res.status}`);
    return true;//await getToken(username,password);
  } catch (error) {
    console.log(`AxiosRegister : ${error}`);
    return false;
  }
};

const getToken = async (username, password) => {
    const json = JSON.stringify({
        username,
        password,
      });
      try {
        const res = await axios.post(`${API_URL}api/login`, json);
        console.log(`Login : ${res.status}`);
        if (!res.data.data.user.is_pro) {
            throw new Error("This user is not a Pro")
        }
        return {'token':res.data.data.token, 'id':res.data.data.user.id};
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
    const res = await axios.post(`${API_URL}api/login`, json);
    console.log(`GetTokenAdmin : ${res.status}`);
    return res.data.data.token;
  } catch (error) {
    console.log(`GetTokenAdmin : ${error}`);
    return null;
  }
};

const createMenu = async (name, userid) => {
  const json = JSON.stringify({name:name, user:userid})
  try {
    res = await axios.post(`${API_URL}api/menus/`, json);
    return `${res.data.data.id}`
  } catch (error) {
    console.log(`Create menu : ${error}`)
    return null
  }
}

const getMenuId = async (userid) => {
  let menuid
  try {
    const res = await axios.get(`${API_URL}api/menus/?user=${userid}`);
    if (res.data.data.length < 1) {
      menuid = await createMenu("default", userid)
    } else {
      menuid = res.data.data[0].id
    }
    console.log(menuid)
    return menuid
  } catch (error) {
    console.log(`Get menu : ${error}`)
    return null
  }
}

const getMenuItems = async (userid) => {
  const menuitems = []
  const menuid = await getMenuId(userid)
  if (menuid) {
    try {
      const res = await axios.get(`${API_URL}api/menuitems/?menu=${menuid}`)
      console.log(res.data.data)
      res.data.data.forEach(element => {
        menuitems.push({'id':element.id, 'name':element.name, 'price':element.price})
        console.log(menuitems)
      });
      return menuitems
    } catch (error) {
      return null
    }
  }
}

const addItemsToMenu = async (userid, name, price) => {
  const menuid = await getMenuId(userid)
  const json = JSON.stringify({name:name,price:price,menu:menuid})
  try {
    const res = await axios.post(`${API_URL}api/menuitems/`, json)
    return null
  } catch (error) {
    console.log(`AddElementToMenu : ${error}`)
    return null
  }
}

const deleteItem = async (ItemID) => {
  try {
    const res = await axios.delete(`${API_URL}api/menuitems/${ItemID}`)
  } catch (error) {
    console.log(`DeleteItem : ${error}`)
  }
}

export {axiosRegister, getToken, getMenuId, addItemsToMenu, getMenuItems, deleteItem};
