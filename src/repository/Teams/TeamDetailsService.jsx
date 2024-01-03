import axios from "../../axios/axios";

const TeamDetailsService = {

    getAllTeamsDetails: () => {
        return axios.get("/team-details/getAll")
    }
}
export default TeamDetailsService;
