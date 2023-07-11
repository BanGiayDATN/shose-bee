import axios from "axios";

// Đường dẫn api
let api = "http://localhost:8080/admin/color";

let dataColor = [];
const getDataColor = () => {
  return dataColor;
};

const fetchAllColor = (page) => {
  return axios.get(api + `?page=${page}`);
};

const listAllColor = () => {
  return axios.get(api + "/list");
};

const getOneById = (id) => {
  return axios.get(api + "/" + id);
};

const addColor = (color) => {
  return axios
    .post(api, {
      code: color.code,
      name: color.name,
      status: color.status,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data.data.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// update Color
const updateColor = (id, color) => {
  return axios
    .put(api + `/${id}`, {
      code: color.code,
      name: color.name,
      status: color.status,
    })
    .catch((err) => {
        console.log(err);
    });
};

const ColorService = {
  getDataColor,
  fetchAllColor,
  listAllColor,
  getOneById,
  addColor,
  updateColor,
};
export default ColorService;
