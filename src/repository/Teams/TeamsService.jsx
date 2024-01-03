import axios from "../../axios/axios";

const TeamService = {

    getAllTeams: () => {
        return axios.get("/team/getAll");
    }

}

export default TeamService;
