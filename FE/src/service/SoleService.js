import axios from "axios";

// Đường dẫn api
let api = "http://localhost:8080/admin/sole";

// tạo đối tượng để hứng data
let dataSole = [];
const getDataSole = () => {
  return dataSole;
};

// list page Sole
const fetchAllSole = (page) => {
  return axios.get(api + `?page=${page}`);
};

// list all Sole
const listAllSole = () => {
  return axios.get(api +"/list");
};

// get one Sole
const getOneById = (id) => {
  return axios.get(api + "/" + id);
};

// add Sole
const addSole = (Sole) => {
  return axios
    .post(api, {
      name: Sole.name,
      status: Sole.status,
    })
    .then((response) => {
      if (response.status === 200) {
        alert(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const SoleService = {
  getDataSole,
  fetchAllSole,
  listAllSole,
  getOneById,
  addSole,
};
export default SoleService;
