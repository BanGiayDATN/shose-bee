import axios from "axios";
import { addAllProduct, addProduct } from "../redux/productSlice";

var api = "http://localhost:8080/api";
var apiPost = api + `/product`;
const getAll = (dispatch, page) => {
  if(page == undefined){
    page = 0
  }
  axios
  .get(`http://localhost:8080/admin/product-detail`)
  .then((response) => {
    console.log(response.data.data);
    dispatch(addAllProduct(response.data.data));
  })
  .catch((error) => {});
  return
};

const create = (dispatch, data) => {
  try {
    axios.post(apiPost, data)
      .then(response => {
        console.log(response);
        // dispatch(addProduct(data));
      })
    // const res = await axios.post(apiPost);
   
    // console.log(res);
  } catch {
  }
  return
};


const ProductService = {
  getAll,
  create
};

export default ProductService;