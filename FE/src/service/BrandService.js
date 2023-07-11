import axios from "axios";

// Đường dẫn api
let api = "http://localhost:8080/admin/brand";

// tạo đối tượng để hứng data
let dataBrand = [];
const getDataBrand = () => {
  return dataBrand;
};

// list page Brand
const fetchAllBrand = (page,name) => {
  return axios.get(api + `?page=${page}&name=${name}`);
};

// list all Brand
const listAllBrand = () => {
  return axios.get(api + "/list");
};

// get one Brand
const getOneById = (id) => {
  return axios.get(api + "/" + id);
};

// add Brand
const addBrand = (brand) => {
  return axios
    .post(api, {
      name: brand.name,
      status: brand.status,
    })
    .then((response) => {
      if (response.status === 201) {
        console.log(response.data.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// update brand
const updateBrand = (id, brand) => {
  return axios
    .put(api + `/${id}`, {
      name: brand.name,
      status: brand.status,
    })
    .catch((err) => {
      console.log(err);
    });
};

const BrandService = {
  getDataBrand,
  fetchAllBrand,
  listAllBrand,
  getOneById,
  addBrand,
  updateBrand,
};
export default BrandService;
