import axios from "axios";
let api = "http://localhost:8080/admin/employee";

let dataEmployee = [];
const getDataEmployee = () => {
  return dataEmployee;
};

const fetchAllEmployee = (page) => {
  return axios.get(api + `?page=${page}`);
};
const searchEmployee = (searchValue) => {
  const params = {
    fullName: searchValue,
  };
  return axios.get(api + "/search", { params: params });
};
const listAllEmployee = () => {
  return axios.get(api + "/index");
};

const getOneById = (id) => {
  return axios.get(api + "/" + id);
};

const addEmployee = (employee) => {
  return axios
    .post(api, {
      email: employee.email,
      fullName: employee.fullName,
      status: employee.status,
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
const updateEmployee = (id, employee) => {
  return axios
    .put(api + `/${id}`, {
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      fullName: employee.fullName,
      status: employee.status,
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchByDate = (startDate, endDate) => {
  const params = {
    startTime: startDate,
    endTime: endDate,
  };
  return axios.get(api + "/search-date", { params: params });
};

const EmployeeService = {
  getDataEmployee,
  fetchAllEmployee,
  listAllEmployee,
  getOneById,
  addEmployee,
  updateEmployee,
  searchEmployee,
  searchByDate,
};

export default EmployeeService;
