import axios from "axios";
import { addAllPost, addSize } from "../redux/sizeSlice";

var api = process.env.REACT_APP_API_KEY; 
var apiPost = api+  `/size/`;
const getAll = async (dispatch) => {
  try {
    // const res = await axios.get(apiPost);
    // dispatch(addAllPost(res.data));
    // console.log(res);
  } catch {
  }
    return 
  };
  
  const create = async (dispatch,data) =>  {
    try {
        // const res = await axios.post(apiPost);
        dispatch(addSize(data));
        // console.log(res);
      } catch {
      }
        return 
  };
  
  
  const SizeService = {
    getAll,
    create
  };
  
  export default SizeService;