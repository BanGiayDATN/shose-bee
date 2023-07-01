import axios from "axios";
import { addBills, addBill } from "../redux/billSlice";

var api = 'http://localhost:8080';
var apiBill = api + `/admin/bill`;
const getAll = (dispatch, fillter) => {
  var startDate = new Date(Date.parse(fillter.startTime));
  var timeInMillisStartDate = startDate.getTime() ;
  if (fillter.startTime == '') {
    timeInMillisStartDate = 0;
  }
  var endDate = new Date(Date.parse(fillter.endTime));
  var timeInMillisEndDate = endDate.getTime() ;
  if (fillter.endTime == '') {
    timeInMillisEndDate = 0;
  }
  var endDeliveryDate = new Date(Date.parse(fillter.endDeliveryDate));
  var timeInMillisEndDeliveryDate = endDeliveryDate.getTime() ;
  if (fillter.endDeliveryDate == '') {
    timeInMillisEndDeliveryDate = 0;
  }
  var startDeliveryDate = new Date(Date.parse(fillter.startDeliveryDate));
  var timeInMillisStartDeliveryDate = startDeliveryDate.getTime() ;
  if (fillter.startDeliveryDate == '') {
    timeInMillisStartDeliveryDate = 0;
  }
  try {
    axios.get(apiBill + "?startTime="+timeInMillisStartDate+"&endTime="+timeInMillisEndDate+"&status="+fillter.status+"&endDeliveryDate="+timeInMillisEndDeliveryDate+"&startDeliveryDate="+timeInMillisStartDeliveryDate+"&code="+fillter.code+"&employees="+fillter.employees+"&user="+ fillter.user+"&phoneNumber="+fillter.phoneNumber+"&type="+fillter.type)
      .then(response => {
        console.log(response);
        dispatch(addBills(response.data.data));
      })
  } catch {
  }
  return
};

const create = (dispatch, data) => {
  try {
    axios.post(apiBill, data)
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


const BillService = {
  getAll,
  create
};

export default BillService;