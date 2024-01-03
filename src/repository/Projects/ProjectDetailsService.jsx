import axios from "../../axios/axios";

const ProjectDetailsService = {

    getAllProjectDetails: () => {
        return axios.get("/project-details/getAll");
    },

    getProjectDetails: () => {
        return axios.get("/project-details/getProject/${name}");
    }


}

export default ProjectDetailsService;
