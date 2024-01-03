import axios from "../../axios/axios";

const ProjectService = {

    getAllProjects: () => {
        return axios.get("/project/getAll");
    },

    addNewProject: (name, description, dateStarted, dateFinished, isActive, image, clientId) => {
        return axios.post("/project/add", {
            name, description, dateStarted, dateFinished, isActive, image, clientId
        })
    }

}

export default ProjectService;
