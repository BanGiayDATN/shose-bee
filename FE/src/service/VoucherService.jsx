import axios from "axios";
import { addAllVoucher, addVoucher } from "../redux/voucherSlice";

var api = "http://localhost:8080/api";
var apiPost = api + `/size`;
const getAll = (dispatch) => {
  try {
    axios.get(apiPost)
      .then(response => {
        dispatch(addAllVoucher(response.data.data));
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
        // dispatch(addProduct(data));
      })
    // const res = await axios.post(apiPost);
   
    // console.log(res);
  } catch {
  }
  return
};


const VoucherService = {
  getAll,
  create
};

export default VoucherService;