import axios from "axios";
import { addBills, addBill, addAll, addAllDataUsers, addbillWait, addBillDetail, addBillHistory, addStatusPresent } from "../redux/billSlice";

var api = 'http://localhost:8080';
var apiBill = api + `/admin/bill`;
var dataUser = []
var dataEmployess = []

const getDataEmployess = () => {
  return dataEmployess
}
const getDataUser = () => {
  return dataUser
}

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
    axios.get(apiBill + "?startTime="+timeInMillisStartDate+"&endTime="+timeInMillisEndDate+"&status="+fillter.status+"&endDeliveryDate="+timeInMillisEndDeliveryDate+"&startDeliveryDate="+timeInMillisStartDeliveryDate+"&code="+fillter.code+"&employees="+fillter.employees+"&user="+ fillter.user+"&phoneNumber="+fillter.phoneNumber+"&type="+fillter.type+"&page="+fillter.page)
      .then(response => {
        dispatch(addAll(response.data.data));
      })
  } catch {
  }
  return
};

const getAllUser = async() => {
  try {
    await axios.get(apiBill+"/user-bill")
      .then(response => {
        dataUser = response.data.data
        // dispatch(addAllDataUsers(response.data.data));
      })
  } catch {
   
  }
  return 
};

const getAllEmployees = () => {
  try {
    axios.get("http://localhost:8080/account/simple-employess")
      .then(response => {
        dataEmployess = response.data.data
        // dispatch(addAllDataUsers(response.data.data));
      })
  } catch {
  }
  return 
};

const getBillDetail = (dispatch, id) => {
  try {
    axios.get("http://localhost:8080/admin/bill-detail/"+id)
      .then(response => {
        console.log(response.data.data);
        dispatch(addBillDetail(response.data.data));
      })
  } catch {
  }
  return 
};

const getBillHistory = (dispatch, id) => {
  try {
    axios.get("http://localhost:8080/admin/bill-history/"+id)
      .then(response => {
        
        dispatch(addBillHistory(response.data.data));
        dispatch(addStatusPresent(response.data.data[response.data.data.length - 1].statusBill))
      })
  } catch {
  }
  return 
};

const getBill = (dispatch, id) => {
  try {
    axios.get("http://localhost:8080/admin/bill/detail/"+id)
      .then(response => {
        console.log(response.data.data);
        dispatch(addBill(response.data.data));
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

const createBillWait = (dispatch) => {
  try {
    axios.post(apiBill+ "/offline")
      .then(response => {
        console.log(response.data.data);
        dispatch(addbillWait(response.data.data));
      })
  } catch {
  }
  return
}

const changeStatusBill = (dispatch, statusBill) => {
  try {
    axios.put(apiBill+ "/change-status/" + statusBill.idbill + "?actionDescription=" + statusBill.actionDescription)
      .then(response => {
        dispatch(addBillDetail(response.data.data));
      })
      axios.get("http://localhost:8080/admin/bill-history/"+ statusBill.idbill)
      .then(response => {
        
        dispatch(addBillHistory(response.data.data));
        dispatch(addStatusPresent(response.data.data[response.data.data.length - 1].statusBill))
      })
  } catch {
  }
  return
}

const cancelBill = (dispatch, statusBill) => {
  try {
    axios.put(apiBill+ "/cancel-status/" + statusBill.idbill + "?actionDescription=" + statusBill.actionDescription)
      .then(response => {
        dispatch(addBillDetail(response.data.data));
      })
      axios.get("http://localhost:8080/admin/bill-history/"+ statusBill.idbill)
      .then(response => {
        
        dispatch(addBillHistory(response.data.data));
        dispatch(addStatusPresent(response.data.data[response.data.data.length - 1].statusBill))
      })
  } catch {
  }
  return
}

const BillService = {
  getAll,
  create,
  getAllUser,
  getAllEmployees,
  getDataUser,
  getDataEmployess,
  createBillWait,
  getBillDetail,
  getBillHistory,
  getBill,
  changeStatusBill,
  cancelBill
};

export default BillService;