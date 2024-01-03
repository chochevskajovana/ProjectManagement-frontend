import axios from "../../../axios/axios";

const EmployeeWorksWithTechnologyService = {
    addEmployeeWorksWithTechnology: (employeeId, technologyId) => {
        return axios.post("/employee-works-with-technology/add", {
            employeeId,
            technologyId
        })
    }
}

export default EmployeeWorksWithTechnologyService;
