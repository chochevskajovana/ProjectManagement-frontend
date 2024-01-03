import axios from "../../axios/axios";

const ReportsService = {

    getCountOfEmployeesInTeamsPerProject: () => {

        return axios.get("/count-of-employees-in-teams-per-project/getAll")
    },

    getCountOfTechnologiesOnTypeOfProject: () => {
        return axios.get("/count_of_technologies_on_type_of_project/getAll");
    },

    getCountProjectsAndEmployeesForTechnology: () => {
        return axios.get("/count_projects_and_employees_that_use_technology/getAll");
    },

    getEmployeesThatCurrentlyWorkInTeam: () => {
        return axios.get("/employees_that_currently_work_in_team/getAll");
    }

}

export default ReportsService;
