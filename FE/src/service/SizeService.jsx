import axios from "axios";
import { addAllPost, addSize } from "../redux/sizeSlice";

var api = process.env.REACT_APP_API_KEY;
var apiPost = api + `/size`;
const getAll = (dispatch) => {
  try {
    axios.get(apiPost)
      .then(response => {
        console.log(response);
        dispatch(addAllPost(response.data.data));
      })
  } catch {
  }
  return
};

const create = (dispatch, data) => {
  try {
    axios.post(apiPost, data)
      .then(response => {
        console.log(response);
        // dispatch(addSize(data));
      })
    // const res = await axios.post(apiPost);
   
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