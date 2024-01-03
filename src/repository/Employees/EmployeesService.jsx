import axios from "../../axios/axios";

const EmployeesService = {

    getAllEmployees: () => {
        return axios.get("/employee/getAll");
    }

}

export default EmployeesService;
