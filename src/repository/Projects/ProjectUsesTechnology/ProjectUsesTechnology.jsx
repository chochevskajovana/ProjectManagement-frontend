import axios from "../../../axios/axios";

const ProjectUsesTechnology = {
    addProjectUsesTechnology: (projectId, technologyId) => {
        return axios.post("/project-uses-technology/add", {
            projectId,
            technologyId
        })
    }
}

export default ProjectUsesTechnology;
