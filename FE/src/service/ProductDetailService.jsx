import axios from "axios";
import { addAllProduct, addProduct } from "../redux/productSlice";

var api = "http://localhost:8080/api";
var apiPost = api + `/product`;

const fetchAllProductDetail = (page) => {
  return  axios.get(`http://localhost:8080/admin/product-detail?page=${page}`)
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
  create,
  fetchAllProductDetail
};

export default ProductService;