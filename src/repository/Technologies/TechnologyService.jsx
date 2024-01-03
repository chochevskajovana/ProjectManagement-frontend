import axios from "../../axios/axios";

const TechnologyService = {

    getAllTechnologies: () => {
        return axios.get("/technology/getAll")
    }

}

export default TechnologyService;
