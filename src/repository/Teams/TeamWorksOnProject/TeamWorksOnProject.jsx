import axios from "../../../axios/axios";

const TeamWorksOnProjectService = {

    addTeamWorksOnProject: (projectId, teamId) => {
        return axios.post("/team-works-on-project/add", {
            projectId,
            teamId
        })
    }
}
export default TeamWorksOnProjectService;
