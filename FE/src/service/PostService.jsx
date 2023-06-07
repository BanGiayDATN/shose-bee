import axios from "axios";
import { addAllPost } from "../redux/productSlice";

var api = process.env.REACT_APP_API_KEY; 
var apiPost = api+  `/post/`;
const getAll = async (dispatch) => {
  try {
    const res = await axios.get(apiPost);
    dispatch(addAllPost(res.data));
    console.log(res);
  } catch {
  }
    return 
  };
  
  const get = id => {
    return axios.get(apiPost +`/${id}`);
  };
  
  const create = (data) => {
    return axios.post("http://localhost:8080/api/post/create", data);
  };
  
  const update = (id, data) => {
    return axios.put(apiPost +`/${id}`, data);
  };
  
  const remove = id => {
    return axios.delete(apiPost +`/${id}`);
  };
  
  const removeAll = () => {
    return axios.delete(apiPost +``);
  };
  
  const findByTitle = title => {
    return axios.get(apiPost +`?title=${title}`);
  };
  
  const PostService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
  };
  
  export default PostService;