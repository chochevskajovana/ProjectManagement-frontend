import axios from "../../../axios/axios";

const EmployeeIsPartOfTeamService = {

    addEmployeeToTeam: (employeeId, teamId, dateStarted, dateEnded) => {
        return axios.post("/employee-is-part-of-team/add", {
            employeeId,
            teamId,
            dateStarted,
            dateEnded
        })
    }
}
export default EmployeeIsPartOfTeamService;
