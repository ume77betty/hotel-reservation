import axios from 'axios';

const headers = {
  AUTHORIZATION: 'Bearer PX0BDbE8DLAFrBGIr1NvKHUjd9AoMCARzRsDtjLjjMO2TzKNz7mSRSYrA1ri',
  'Content-Type': 'application/json',
};

export const getAllRooms = async () => {
  try {
    const res = await axios({
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
      method: 'GET',
      headers
    });
    const data = await res.data;
    return data.items;
  } catch (err) {
    console.log(err);
    return [];
  }
};


export const getRoomById = async (id) => {
  try {
    const res = await axios({
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id,
      method: 'GET',
      headers
    });
    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const bookRoom = async (id, data) => {
  try {
    const res = await axios({
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id,
      method: 'post',
      headers,
      data
    });
    const resData = await res.data;
    return (resData);
  } catch (err) {
    return (err.response.status);
  }
};

export const deleteBooking = async () => {
  const res = await axios({
    url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
    method: 'delete',
    headers,
  });
  const resData = await res.data;
  return resData;
};
