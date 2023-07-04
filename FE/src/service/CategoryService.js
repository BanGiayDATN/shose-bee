import axios from "axios";

// Đường dẫn api
let api = "http://localhost:8080/admin/category";


// tạo đối tượng để hứng data
let dataCategory = [];
const getDataCategory = () => {
  return dataCategory;
};

// list page category
const fetchAllCategory = (page) => {
  return axios.get(api + `?page=${page}`);
};

// list all category
const listAllCategory = () => {
  return axios.get(api +"/list");
};

// get one category
const getOneById = (id) => {
  return axios.get(api + "/" + id);
};

// add category
const addCategory = (category) => {
  return axios
    .post(api, {
      name: category.name,
      status: category.status,
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

// add category
const updateCategory = (id,category) => {
  return axios
    .put(api+`/${id}`, {
      name: category.name,
      status: category.status,
    })
    .catch((err) => {
      console.log(err);
    });
};
const CategoryService = {
  getDataCategory,
  fetchAllCategory,
  listAllCategory,
  getOneById,
  addCategory,
  updateCategory
};
export default CategoryService;
