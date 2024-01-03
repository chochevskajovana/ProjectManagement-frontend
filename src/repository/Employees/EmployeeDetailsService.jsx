import axios from "../../axios/axios";

const EmployeeDetailsService = {

    getAllEmployeeDetails: () => {
        return axios.get("/employee-details/getAll")
    }
}

export default EmployeeDetailsService;
